"use client"

import { useEffect, useState } from "react"
import type { MenuItem } from "@/lib/types"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import OrderItemCard from "@/components/order/OrderItemCard"

const categories = ["الكل", "فطائر حادقة", "فطائر حلوة", "بيتزا", "ساندويتشات", "أطباق جانبية", "مشروبات"]

// Menu data with relevant image URLs
const menuItemsFromPDF: MenuItem[] = [
  // Savory Feteer (فطائر حادقة)
  {
    id: "feteer-1",
    nameAR: "فطيرة روي سادة بالبيض",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، بيض طازج",
    price: 120,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?egyptian,pie,egg",
    isAvailable: true,
    featured: true,
  },
  {
    id: "feteer-2",
    nameAR: "فطيرة مشروم",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، مشروم، خضار مشكل، زيتون أسود",
    price: 130,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?mushroom,pie",
    isAvailable: true,
  },
  {
    id: "feteer-3",
    nameAR: "فطيرة مشكل جبن",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، فلفل ألوان، طماطم، زيتون أسود، ثلاثة أنواع من الجبن الخاص",
    price: 160,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?cheese,pie",
    isAvailable: true,
  },
  {
    id: "feteer-4",
    nameAR: "فطيرة مشكل لحوم",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، فلفل ألوان، طماطم، زيتون، سجق، لحمة، بسطرمة",
    price: 190,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?meat,pie",
    isAvailable: true,
  },
  {
    id: "feteer-5",
    nameAR: "فطيرة مشكل فراخ",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، فلفل ألوان، طماطم، زيتون، ستربس الدجاج، دجاج مشوي",
    price: 190,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?chicken,pie",
    isAvailable: true,
  },
  {
    id: "feteer-6",
    nameAR: "فطيرة بسطرمة كيري",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، فلفل ألوان، طماطم، زيتون، بسطرمة، الجبن الكيري",
    price: 180,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?pastrami,pie",
    isAvailable: true,
  },
  {
    id: "feteer-7",
    nameAR: "فطيرة تيستي",
    descriptionAR: "جبنة رومي، موتزاريلا، فلفل ألوان، طماطم، زيتون، بصل قطع، لحم مفروم، صوص التيستي",
    price: 170,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?savory,pie",
    isAvailable: true,
  },
  {
    id: "feteer-8",
    nameAR: "فطيرة حواوشي",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، فلفل ألوان، طماطم، زيتون، بصل قطع، لحم مفروم، تتبيلة الحواوشي",
    price: 160,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?hawawshi,pie",
    isAvailable: true,
  },
  {
    id: "feteer-9",
    nameAR: "فطيرة فراخ رانش",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، خضار مشكل، صدور فراخ مشوية، صوص الرانش",
    price: 175,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?chicken,ranch,pie",
    isAvailable: true,
  },
  {
    id: "feteer-10",
    nameAR: "فطيرة فراخ باربيكيو",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، خضار مشكل، صدور فراخ مشوية، صوص باربيكيو",
    price: 170,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?bbq,chicken,pie",
    isAvailable: true,
  },
  {
    id: "feteer-11",
    nameAR: "فطيرة فراخ مكسيكان",
    descriptionAR: "جبنة رومي، موتزاريلا، فلفل ألوان، صدور فراخ مشوية، ذرة حلوة، بصل قطع، صوص سيراتشا حار",
    price: 195,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?mexican,chicken,pie",
    isAvailable: true,
  },
  {
    id: "feteer-12",
    nameAR: "فطيرة سوسيس مكسيكان",
    descriptionAR: "جبنة رومي، موتزاريلا، فلفل ألوان، خضار مشكل، ذرة حلوة، بصل قطع، صوص سيراتشا حار",
    price: 170,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?sausage,pie",
    isAvailable: true,
  },
  {
    id: "feteer-18",
    nameAR: "فطيرة سي فود",
    descriptionAR: "جبنة رومي، موتزاريلا طبيعية، فلفل ألوان، طماطم، زيتون آسود، جمبري طازج، سبيط وكابوريا",
    price: 190,
    category: "فطائر حادقة",
    imageUrl: "https://source.unsplash.com/384x256/?seafood,pie",
    isAvailable: true,
  },

  // Sweet Feteer (فطائر حلوة)
  {
    id: "feteer-sweet-1",
    nameAR: "فطيرة بغاشة سادة",
    descriptionAR: "كريمة، سمنه، عسل، سكر بودرة، جوز هند، حليب",
    price: 60,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?sweet,pie,honey",
    isAvailable: true,
    featured: true,
  },
  {
    id: "feteer-sweet-2",
    nameAR: "فطيرة بغاشة",
    descriptionAR: "كريمة، سمنه، عسل، سكر بودرة، جوز هند، حليب، عين جمل، بندق",
    price: 100,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?sweet,pie,nuts",
    isAvailable: true,
  },
  {
    id: "feteer-sweet-5",
    nameAR: "فطيرة الشوكولاتة",
    descriptionAR: "كريمة، شوكولاتة، مكسرات متنوعة، حليب، سمنه",
    price: 140,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?chocolate,pie",
    isAvailable: true,
  },
  {
    id: "feteer-sweet-6",
    nameAR: "فطيرة اللوتس",
    descriptionAR: "كريمة، لوتس سبريد، مكسرات، حليب، سمنة",
    price: 140,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?lotus,biscoff,pie",
    isAvailable: true,
  },
  {
    id: "feteer-sweet-7",
    nameAR: "فطيرة الكيندر",
    descriptionAR: "كريمة، سمنه، مكسرات، عسل، صوص الكيندر",
    price: 210,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?kinder,chocolate,pie",
    isAvailable: true,
  },
  {
    id: "feteer-sweet-8",
    nameAR: "فطيرة فواكه",
    descriptionAR: "كريمة، سمنه، عسل، سكر، فواكه مشكلة طبيعية، بندق، عين جمل، لوز",
    price: 120,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?fruit,pie",
    isAvailable: true,
  },
  {
    id: "feteer-sweet-11",
    nameAR: "فطيرة سينابون",
    descriptionAR: "كريمة، سمنه، مكسرات، سكر، قرفة، صوص الكيندر",
    price: 185,
    category: "فطائر حلوة",
    imageUrl: "https://source.unsplash.com/384x256/?cinnabon,pie",
    isAvailable: true,
  },

  // Pizza
  {
    id: "pizza-1",
    nameAR: "بيتزا مارينارا",
    descriptionAR: "صوص المارينارا",
    price: 114,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?marinara,pizza",
    isAvailable: true,
    featured: true,
  },
  {
    id: "pizza-2",
    nameAR: "بيتزا مارجريتا",
    descriptionAR: "صوص مارينارا، جبنة موتزاريلا طبيعية وزعتر طازج",
    price: 120,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?margherita,pizza",
    isAvailable: true,
  },
  {
    id: "pizza-3",
    nameAR: "بيتزا فيجترين",
    descriptionAR: "صوص مارينارا، جبنة موتزاريلا طبيعية، مشروم طازج، بصل أحمر، فلفل ألوان وزيتون أسود",
    price: 130,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?vegetarian,pizza",
    isAvailable: true,
  },
  {
    id: "pizza-4",
    nameAR: "بيتزا مشكل جبن",
    descriptionAR: "صوص مارينارا، جبنة موتزاريلا طبيعية، جبنة ريكفورد، صوص شيدر، بصل أحمر وفلفل ألوان",
    price: 150,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?cheese,pizza",
    isAvailable: true,
  },
  {
    id: "pizza-5",
    nameAR: "بيتزا سجق",
    descriptionAR: "صوص مارينارا، جبنة موتزاريلا طبيعية، جبنة رومي، سجق، فلفل ألوان، بصل أحمر وزيتون أسود",
    price: 170,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?sausage,pizza",
    isAvailable: true,
  },
  {
    id: "pizza-8",
    nameAR: "بيتزا بيبروني",
    descriptionAR: "صوص مارينارا، جبنة موتزاريلا طبيعية وبيبروني",
    price: 170,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?pepperoni,pizza",
    isAvailable: true,
  },
  {
    id: "pizza-10",
    nameAR: "بيتزا دجاج أوريجينال",
    descriptionAR: "صوص مارينارا، جبنة موتزاريلا طبيعية، صدور دجاج مشوية، بصل أحمر وزيتون أسود",
    price: 190,
    category: "بيتزا",
    imageUrl: "https://source.unsplash.com/384x256/?chicken,pizza",
    isAvailable: true,
  },

  // Sandwiches
  {
    id: "sandwich-1",
    nameAR: "ساندوتش مشكل جبن",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، جبنة مطبوخة، خضار مشكل، زيتون أسود، سمنة",
    price: 150,
    category: "ساندويتشات",
    imageUrl: "https://source.unsplash.com/384x256/?cheese,sandwich",
    isAvailable: true,
    featured: true,
  },
  {
    id: "sandwich-2",
    nameAR: "مشكل فراخ",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، صدور دجاج مشوية، دجاج استربس، خضار مشكل، زيتون أسود، سمنة",
    price: 180,
    category: "ساندويتشات",
    imageUrl: "https://source.unsplash.com/384x256/?chicken,sandwich",
    isAvailable: true,
  },
  {
    id: "sandwich-3",
    nameAR: "مشكل لحوم",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، سجق، بسطرمة، لحمة، خضار مشكل، زيتون أسود، سمنة",
    price: 175,
    category: "ساندويتشات",
    imageUrl: "https://source.unsplash.com/384x256/?meat,sandwich",
    isAvailable: true,
  },
  {
    id: "sandwich-8",
    nameAR: "فراخ باربيكيو",
    descriptionAR: "جبنة رومي، جبنة موتزاريلا، صدور دجاج مشوية، صوص باربيكيو، خضار مشكل، زيتون أسود",
    price: 170,
    category: "ساندويتشات",
    imageUrl: "https://source.unsplash.com/384x256/?bbq,chicken,sandwich",
    isAvailable: true,
  },

  // Side Dishes
  {
    id: "side-1",
    nameAR: "بطاطس",
    descriptionAR: "بطاطس مقلية ذهبية",
    price: 40,
    category: "أطباق جانبية",
    imageUrl: "https://source.unsplash.com/384x256/?fries",
    isAvailable: true,
    featured: true,
  },
  {
    id: "side-3",
    nameAR: "بطاطس بالجبنة",
    descriptionAR: "بطاطس مقلية مع جبنة ذائبة",
    price: 70,
    category: "أطباق جانبية",
    imageUrl: "https://source.unsplash.com/384x256/?cheese,fries",
    isAvailable: true,
  },
  {
    id: "side-4",
    nameAR: "ستربس",
    descriptionAR: "قطع دجاج ستربس مقرمشة",
    price: 110,
    category: "أطباق جانبية",
    imageUrl: "https://source.unsplash.com/384x256/?chicken,strips",
    isAvailable: true,
  },

  // Drinks
  {
    id: "drink-1",
    nameAR: "شاي",
    descriptionAR: "كوب من الشاي الساخن",
    price: 30,
    category: "مشروبات",
    imageUrl: "https://source.unsplash.com/384x256/?tea,cup",
    isAvailable: true,
    featured: true,
  },
  {
    id: "drink-2",
    nameAR: "قهوة تركي",
    descriptionAR: "قهوة تركية أصيلة",
    price: 40,
    category: "مشروبات",
    imageUrl: "https://source.unsplash.com/384x256/?turkish,coffee",
    isAvailable: true,
  },
  {
    id: "drink-3",
    nameAR: "عصير ليمون",
    descriptionAR: "عصير ليمون طازج ومنعش",
    price: 60,
    category: "مشروبات",
    imageUrl: "https://source.unsplash.com/384x256/?lemonade",
    isAvailable: true,
  },
  {
    id: "drink-5",
    nameAR: "مياه معدنية",
    descriptionAR: "مياه معدنية نقية",
    price: 15,
    category: "مشروبات",
    imageUrl: "https://source.unsplash.com/384x256/?water,bottle",
    isAvailable: true,
  },
  {
    id: "drink-6",
    nameAR: "سموزي مانجو",
    descriptionAR: "سموزي مانجو طازج",
    price: 65,
    category: "مشروبات",
    imageUrl: "https://source.unsplash.com/384x256/?mango,smoothie",
    isAvailable: true,
  },
]


export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This now uses the local menu data instead of fetching from Firebase
    const timer = setTimeout(() => {
      try {
        // Only show available items for ordering
        const availableItems = menuItemsFromPDF.filter((item) => item.isAvailable)
        setMenuItems(availableItems)
        setFilteredItems(availableItems)
      } catch (error) {
        console.error("Error processing menu items:", error)
      } finally {
        setLoading(false)
      }
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selectedCategory === "الكل") {
      setFilteredItems(menuItems)
    } else {
      setFilteredItems(menuItems.filter((item) => item.category === selectedCategory))
    }
  }, [selectedCategory, menuItems])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-primary-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">اطلب أونلاين</h1>
            <p className="text-xl text-accent-beige">اختر من قائمة أطباقنا الشهية واستمتع بالتوصيل السريع</p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${selectedCategory === category
                      ? "bg-primary-green text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">لا توجد عناصر متاحة في هذه الفئة</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <OrderItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}