"use client"

import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Order, Booking } from "@/lib/types"
import ProtectedRoute from "@/components/admin/ProtectedRoute"
import AdminLayout from "@/components/admin/AdminLayout"
import { ShoppingBag, Calendar, DollarSign, Users } from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    newOrdersToday: 0,
    newBookingsToday: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Fetch orders
        const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(5))
        const ordersSnapshot = await getDocs(ordersQuery)
        const orders: Order[] = []
        let newOrdersToday = 0
        let totalRevenue = 0

        ordersSnapshot.forEach((doc) => {
          const order = { id: doc.id, ...doc.data() } as Order
          orders.push(order)
          totalRevenue += order.totalPrice

          const orderDate = order.createdAt.toDate()
          if (orderDate >= today) {
            newOrdersToday++
          }
        })

        // Fetch bookings
        const bookingsQuery = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5))
        const bookingsSnapshot = await getDocs(bookingsQuery)
        const bookings: Booking[] = []
        let newBookingsToday = 0

        bookingsSnapshot.forEach((doc) => {
          const booking = { id: doc.id, ...doc.data() } as Booking
          bookings.push(booking)

          const bookingDate = booking.createdAt.toDate()
          if (bookingDate >= today) {
            newBookingsToday++
          }
        })

        setStats({
          newOrdersToday,
          newBookingsToday,
          totalRevenue,
          totalCustomers: ordersSnapshot.size + bookingsSnapshot.size,
        })
        setRecentOrders(orders)
        setRecentBookings(bookings)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-burgundy"></div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-primary-burgundy">لوحة التحكم</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">طلبات اليوم</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.newOrdersToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">حجوزات اليوم</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.newBookingsToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} جنيه</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders and Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">أحدث الطلبات</h2>
              </div>
              <div className="p-6">
                {recentOrders.length === 0 ? (
                  <p className="text-gray-500 text-center">لا توجد طلبات</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{order.customerDetails.name}</p>
                          <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-primary-green">{order.totalPrice} جنيه</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "confirmed"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "out_for_delivery"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status === "pending"
                              ? "في الانتظار"
                              : order.status === "confirmed"
                                ? "مؤكد"
                                : order.status === "out_for_delivery"
                                  ? "في الطريق"
                                  : "مكتمل"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">أحدث الحجوزات</h2>
              </div>
              <div className="p-6">
                {recentBookings.length === 0 ? (
                  <p className="text-gray-500 text-center">لا توجد حجوزات</p>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.phone}</p>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">{booking.numberOfGuests} أشخاص</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status === "pending"
                              ? "في الانتظار"
                              : booking.status === "confirmed"
                                ? "مؤكد"
                                : "ملغي"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
