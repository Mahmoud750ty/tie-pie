import type React from "react"
import type { Metadata } from "next"
import { Amiri } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { CartProvider } from "@/lib/contexts/CartContext"

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "تاي باي - مطعم مصري فاخر",
  description: "تجربة تمتد لأكثر من 60 عامًا من الأصالة، نقدمها لك اليوم بنكهة عصرية تليق بك",
  keywords: "مطعم مصري، فطائر، بيتزا، طعام مصري، تاي باي",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={amiri.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
