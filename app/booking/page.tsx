"use client"

import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useForm } from "react-hook-form"

interface BookingForm {
  customerName: string
  phone: string
  numberOfGuests: number
  bookingDate: string
  bookingTime: string
}

export default function BookingPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingForm>()

  const onSubmit = async (data: BookingForm) => {
    setLoading(true)
    try {
      const bookingDateTime = new Date(`${data.bookingDate}T${data.bookingTime}`)

      const bookingData = {
        customerName: data.customerName,
        phone: data.phone,
        numberOfGuests: data.numberOfGuests,
        bookingDate: bookingDateTime,
        status: "pending",
        createdAt: new Date(),
      }

      await addDoc(collection(db, "bookings"), bookingData)
      setSuccess(true)
      reset()
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("حدث خطأ أثناء إرسال الحجز. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-primary-burgundy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">احجز طاولتك</h1>
            <p className="text-xl text-accent-beige">استمتع بتجربة طعام لا تُنسى في أجواء دافئة ومميزة</p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            {success ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">تم تأكيد حجزكم بنجاح!</h2>
                <p className="text-lg mb-4">نتطلع لرؤيتكم قريبًا.</p>
                <p className="text-sm">سنتواصل معكم قريبًا لتأكيد تفاصيل الحجز.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 bg-primary-burgundy text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  حجز آخر
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary-burgundy mb-8 text-center">تفاصيل الحجز</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                    <input
                      type="text"
                      {...register("customerName", { required: "الاسم مطلوب" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                    />
                    {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
                    <input
                      type="tel"
                      {...register("phone", { required: "رقم الهاتف مطلوب" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                      placeholder="أدخل رقم هاتفك"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأشخاص *</label>
                    <select
                      {...register("numberOfGuests", { required: "عدد الأشخاص مطلوب" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                    >
                      <option value="">اختر عدد الأشخاص</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "شخص" : "أشخاص"}
                        </option>
                      ))}
                    </select>
                    {errors.numberOfGuests && (
                      <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ *</label>
                      <input
                        type="date"
                        {...register("bookingDate", { required: "التاريخ مطلوب" })}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                      />
                      {errors.bookingDate && <p className="text-red-500 text-sm mt-1">{errors.bookingDate.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الوقت *</label>
                      <select
                        {...register("bookingTime", { required: "الوقت مطلوب" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                      >
                        <option value="">اختر الوقت</option>
                        <option value="12:00">12:00 ظهرًا</option>
                        <option value="12:30">12:30 ظهرًا</option>
                        <option value="13:00">1:00 ظهرًا</option>
                        <option value="13:30">1:30 ظهرًا</option>
                        <option value="14:00">2:00 ظهرًا</option>
                        <option value="14:30">2:30 ظهرًا</option>
                        <option value="15:00">3:00 عصرًا</option>
                        <option value="15:30">3:30 عصرًا</option>
                        <option value="16:00">4:00 عصرًا</option>
                        <option value="16:30">4:30 عصرًا</option>
                        <option value="17:00">5:00 مساءً</option>
                        <option value="17:30">5:30 مساءً</option>
                        <option value="18:00">6:00 مساءً</option>
                        <option value="18:30">6:30 مساءً</option>
                        <option value="19:00">7:00 مساءً</option>
                        <option value="19:30">7:30 مساءً</option>
                        <option value="20:00">8:00 مساءً</option>
                        <option value="20:30">8:30 مساءً</option>
                        <option value="21:00">9:00 مساءً</option>
                        <option value="21:30">9:30 مساءً</option>
                        <option value="22:00">10:00 مساءً</option>
                      </select>
                      {errors.bookingTime && <p className="text-red-500 text-sm mt-1">{errors.bookingTime.message}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-burgundy text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "جاري إرسال الحجز..." : "تأكيد الحجز"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
