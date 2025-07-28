"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { useCart } from "@/lib/contexts/CartContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useForm } from "react-hook-form"

interface CheckoutForm {
  name: string
  phone: string
  address: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>()

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true)
    try {
      const orderData = {
        customerDetails: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
        items: items.map((item) => ({
          itemId: item.id,
          nameAR: item.nameAR,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: getTotalPrice(),
        status: "pending",
        createdAt: new Date(),
      }

      await addDoc(collection(db, "orders"), orderData)
      clearCart()
      setSuccess(true)
    } catch (error) {
      console.error("Error creating order:", error)
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-primary-burgundy mb-6">السلة فارغة</h1>
            <p className="text-gray-600 mb-8">يرجى إضافة بعض العناصر إلى سلتك قبل المتابعة للدفع</p>
            <button
              onClick={() => router.push("/order")}
              className="bg-primary-burgundy text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              تصفح القائمة
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg mb-8">
              <h1 className="text-3xl font-bold mb-4">تم تأكيد طلبكم بنجاح!</h1>
              <p className="text-lg">شكرًا لكم على طلبكم. سنتواصل معكم قريبًا لتأكيد التفاصيل.</p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="bg-primary-burgundy text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-burgundy mb-8 text-center">إتمام الطلب</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary-burgundy mb-6">ملخص الطلب</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-medium">{item.nameAR}</h3>
                      <p className="text-gray-600">الكمية: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-primary-green">{item.price * item.quantity} جنيه</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-primary-burgundy">{getTotalPrice()} جنيه</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-primary-burgundy mb-6">بيانات التوصيل</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                  <input
                    type="text"
                    {...register("name", { required: "الاسم مطلوب" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">العنوان *</label>
                  <textarea
                    {...register("address", { required: "العنوان مطلوب" })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                    placeholder="أدخل عنوانك بالتفصيل"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-burgundy text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
