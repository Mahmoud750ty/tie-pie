"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import type { MenuItem } from "@/lib/types"
import { useCart } from "@/lib/contexts/CartContext"

interface OrderItemCardProps {
  item: MenuItem
}

export default function OrderItemCard({ item }: OrderItemCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      nameAR: item.nameAR,
      price: item.price,
      quantity,
      imageUrl: item.imageUrl,
    })
    setQuantity(1) // Reset quantity after adding
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=256&width=384&query=Egyptian food dish"}
          alt={item.nameAR}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-burgundy mb-2">{item.nameAR}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{item.descriptionAR}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary-green">{item.price} جنيه</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.category}</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  )
}
