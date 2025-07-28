"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, Tag } from "lucide-react";

// Data from the image
const menuData = {
  singleOffers: [
    {
      name: "عرض فطيرة تشكن رانش",
      price: 205,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيرة تيستي",
      price: 185,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيرة تشكن باربيكيو",
      price: 200,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيرة حواوشي",
      price: 180,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيرة سدق كيري",
      price: 205,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيرة بسطرمة كيري",
      price: 205,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيره مشكل لحوم",
      price: 205,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
    {
      name: "عرض فطيره مشكل فراخ",
      price: 210,
      includes: "فطيرة حسب اختيارك + فرايز + كولا",
    },
  ],
  doubleOffers: [
    {
      name: "فطيرة مشكل لحم + فطيرة مشكل فراخ",
      price: 340,
      includes: "فطيرتين سينجل (S) + فرايز + صوص",
    },
    {
      name: "فطيرة سدق كيري + فطيرة بسطرمة كيري",
      price: 330,
      includes: "فطيرتين سينجل (S) + فرايز + صوص",
    },
    {
      name: "فطيرة تشكن رانش + فطيرة تشكن باربيكيو",
      price: 320,
      includes: "فطيرتين سينجل (S) + فرايز + صوص",
    },
    {
      name: "فطيرة تيستي + فطيرة حواوشي",
      price: 310,
      includes: "فطيرتين سينجل (S) + فرايز + صوص",
    },
  ],
};

// Restaurant Information
const restaurantInfo = {
  name: "تاي باي",
  location: "مجمع مطاعم حديقة الخالدين أمام مسجد القائد إبراهيم",
  phone: "01222440794",
};

// Mock special offers (example of how you might use the data)
const mockSpecialOffers = [
  {
    id: "1",
    name: menuData.singleOffers[0].name, // Use the name from the singleOffers array
    description: menuData.singleOffers[0].includes, // Use the includes from the singleOffers array
    price: `${menuData.singleOffers[0].price} ج.م`, // Use the price from the singleOffers array
    originalPrice: `${menuData.singleOffers[0].price + 50} ج.م`, // Example calculation
    discount: "15%", // Example discount
    image: "/placeholder.jpg",
  },
  {
    id: "2",
    name: menuData.singleOffers[1].name, // Use the name from the singleOffers array
    description: menuData.singleOffers[1].includes, // Use the includes from the singleOffers array
    price: `${menuData.singleOffers[1].price} ج.م`, // Use the price from the singleOffers array
    originalPrice: `${menuData.singleOffers[1].price + 40} ج.م`, // Example calculation
    discount: "20%", // Example discount
    image: "/placeholder.jpg",
  },
  {
    id: "3",
    name: menuData.doubleOffers[0].name, // Use the name from the doubleOffers array
    description: menuData.doubleOffers[0].includes, // Use the includes from the doubleOffers array
    price: `${menuData.doubleOffers[0].price} ج.م`, // Use the price from the doubleOffers array
    originalPrice: `${menuData.doubleOffers[0].price + 60} ج.م`, // Example calculation
    discount: "25%", // Example discount
    image: "/placeholder.jpg",
  },
];

export default function SpecialOffersSection() {
  const [specialOffers, setSpecialOffers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from database
    const timer = setTimeout(() => {
      setSpecialOffers(mockSpecialOffers);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const nextOffer = () => {
    setCurrentIndex((prev) => (prev + 1) % specialOffers.length);
  };

  const prevOffer = () => {
    setCurrentIndex((prev) => (prev - 1 + specialOffers.length) % specialOffers.length);
  };

  if (loading || specialOffers.length === 0) {
    return (
      <section className="py-16 bg-primary-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">العروض الخاصة</h2>
            <p className="text-white/80 text-lg">اكتشف عروضنا اليومية المميزة</p>
          </div>
          <div className="animate-pulse">
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <div className="h-48 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentOffer = specialOffers[currentIndex];

  return (
    <section className="py-16 bg-primary-green">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">العروض الخاصة</h2>
          <p className="text-white/80 text-lg">اكتشف عروضنا اليومية المميزة</p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Tag className="h-5 w-5 text-red-500" />
                <span className="text-red-500 font-bold text-lg">{currentOffer.discount} خصم</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse"></div>
            </div>

            <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
              <img
                src={currentOffer.image}
                alt={currentOffer.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">{currentOffer.name}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{currentOffer.description}</p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-gray-400 line-through text-lg">{currentOffer.originalPrice}</span>
                <span className="text-2xl font-bold text-primary-burgundy">{currentOffer.price}</span>
              </div>
            </div>

            <button className="w-full bg-primary-burgundy text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-burgundy/90 transition-colors">
              اطلب الآن
            </button>
          </div>

          {specialOffers.length > 1 && (
            <>
              <button
                onClick={prevOffer}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-primary-burgundy" />
              </button>
              <button
                onClick={nextOffer}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-primary-burgundy" />
              </button>
            </>
          )}
        </div>

        {specialOffers.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {specialOffers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}