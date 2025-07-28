import Image from "next/image"
import type { MenuItem } from "@/lib/types"

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=256&width=384&query=Egyptian food dish"}
          alt={item.nameAR}
          fill
          className="object-cover"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">غير متوفر حاليًا</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-burgundy mb-2">{item.nameAR}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{item.descriptionAR}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary-green">{item.price} جنيه</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.category}</span>
        </div>
      </div>
    </div>
  )
}
