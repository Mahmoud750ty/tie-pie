export interface MenuItem {
  id: string
  nameAR: string
  descriptionAR: string
  price: number
  category: "فطائر حادقة" | "فطائر حلوة" | "بيتزا" | "ساندويتشات" | "أطباق جانبية" | "مشروبات"
  imageUrl: string
  isAvailable: boolean
  featured?: boolean
}

export interface Booking {
  id: string
  customerName: string
  phone: string
  numberOfGuests: number
  bookingDate: Date
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}

export interface Order {
  id: string
  customerDetails: {
    name: string
    phone: string
    address: string
  }
  items: Array<{
    itemId: string
    nameAR: string
    quantity: number
    price: number
  }>
  totalPrice: number
  status: "pending" | "confirmed" | "out_for_delivery" | "completed"
  createdAt: Date
}

export interface Testimonial {
  id: string
  author: string
  quoteAR: string
  isVisible: boolean
}

export interface CartItem {
  id: string
  nameAR: string
  price: number
  quantity: number
  imageUrl: string
}
