"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase/config"
import type { MenuItem } from "@/lib/types"
import ProtectedRoute from "@/components/admin/ProtectedRoute"
import AdminLayout from "@/components/admin/AdminLayout"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { useForm } from "react-hook-form"
import Image from "next/image"

interface MenuItemForm {
  nameAR: string
  descriptionAR: string
  price: number
  category: string
  isAvailable: boolean
  featured: boolean
}

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MenuItemForm>()

  const categories = ["فطائر حادقة", "فطائر حلوة", "بيتزا", "ساندويتشات", "أطباق جانبية", "مشروبات"]

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "menuItems"))
      const items: MenuItem[] = []
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem)
      })
      setMenuItems(items)
    } catch (error) {
      console.error("Error fetching menu items:", error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `menu_images/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  }

  const onSubmit = async (data: MenuItemForm) => {
    setUploading(true)
    try {
      let imageUrl = editingItem?.imageUrl || ""

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const itemData = {
        ...data,
        price: Number(data.price),
        imageUrl,
      }

      if (editingItem) {
        await updateDoc(doc(db, "menuItems", editingItem.id), itemData)
        setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? { ...item, ...itemData } : item)))
      } else {
        const docRef = await addDoc(collection(db, "menuItems"), itemData)
        setMenuItems([...menuItems, { id: docRef.id, ...itemData } as MenuItem])
      }

      setShowModal(false)
      setEditingItem(null)
      setImageFile(null)
      reset()
    } catch (error) {
      console.error("Error saving menu item:", error)
      alert("حدث خطأ في حفظ العنصر")
    } finally {
      setUploading(false)
    }
  }

  const deleteItem = async (item: MenuItem) => {
    if (!confirm("هل أنت متأكد من حذف هذا العنصر؟")) return

    try {
      await deleteDoc(doc(db, "menuItems", item.id))

      // Delete image from storage if exists
      if (item.imageUrl) {
        try {
          const imageRef = ref(storage, item.imageUrl)
          await deleteObject(imageRef)
        } catch (error) {
          console.log("Error deleting image:", error)
        }
      }

      setMenuItems(menuItems.filter((menuItem) => menuItem.id !== item.id))
    } catch (error) {
      console.error("Error deleting menu item:", error)
      alert("حدث خطأ في حذف العنصر")
    }
  }

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item)
    setValue("nameAR", item.nameAR)
    setValue("descriptionAR", item.descriptionAR)
    setValue("price", item.price)
    setValue("category", item.category)
    setValue("isAvailable", item.isAvailable)
    setValue("featured", item.featured || false)
    setShowModal(true)
  }

  const openAddModal = () => {
    setEditingItem(null)
    reset()
    setImageFile(null)
    setShowModal(true)
  }

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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-burgundy">إدارة القائمة</h1>
            <button
              onClick={openAddModal}
              className="bg-primary-burgundy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              إضافة عنصر جديد
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl || "/placeholder.svg?height=192&width=384"}
                    alt={item.nameAR}
                    fill
                    className="object-cover"
                  />
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">غير متوفر</span>
                    </div>
                  )}
                  {item.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">مميز</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary-burgundy mb-2">{item.nameAR}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.descriptionAR}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-primary-green">{item.price} جنيه</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      تعديل
                    </button>
                    <button
                      onClick={() => deleteItem(item)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {menuItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">لا توجد عناصر في القائمة</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-primary-burgundy">
                  {editingItem ? "تعديل العنصر" : "إضافة عنصر جديد"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم بالعربية *</label>
                  <input
                    type="text"
                    {...register("nameAR", { required: "الاسم مطلوب" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                  />
                  {errors.nameAR && <p className="text-red-500 text-sm mt-1">{errors.nameAR.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف *</label>
                  <textarea
                    {...register("descriptionAR", { required: "الوصف مطلوب" })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                  />
                  {errors.descriptionAR && <p className="text-red-500 text-sm mt-1">{errors.descriptionAR.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">السعر *</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { required: "السعر مطلوب", min: 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الفئة *</label>
                    <select
                      {...register("category", { required: "الفئة مطلوبة" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صورة العنصر</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-burgundy focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("isAvailable")}
                      className="rounded border-gray-300 text-primary-burgundy focus:ring-primary-burgundy"
                    />
                    <span className="mr-2 text-sm text-gray-700">متوفر</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("featured")}
                      className="rounded border-gray-300 text-primary-burgundy focus:ring-primary-burgundy"
                    />
                    <span className="mr-2 text-sm text-gray-700">مميز</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-primary-burgundy text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {uploading ? "جاري الحفظ..." : editingItem ? "تحديث" : "إضافة"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  )
}
