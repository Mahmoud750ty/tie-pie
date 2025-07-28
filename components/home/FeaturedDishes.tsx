"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";

// Data from the image (same as before)
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

// Combine single and double offers for featured items
const allOffers = [...menuData.singleOffers, ...menuData.doubleOffers];

// Mock featured items using the combined offers
const mockFeaturedItems: MenuItem[] = allOffers.slice(0, 3).map((offer, index) => ({
  id: String(index + 1), // Create a unique ID
  nameAR: offer.name, // Use the name from the offer
  descriptionAR: offer.includes || "عرض مميز من تاي باي", // Use includes as description, or a default
  price: offer.price, // Use the price from the offer
  category: "عرض خاص", // Default category
  imageUrl: "/placeholder.svg?height=256&width=384", // Placeholder image
  isAvailable: true,
  featured: true,
}));

export default function FeaturedDishes() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from database
    const timer = setTimeout(() => {
      setFeaturedItems(mockFeaturedItems);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-burgundy mb-4">
              أطباق صنعت بحب لتليق بذوقك
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-burgundy mb-4">
            أطباق صنعت بحب لتليق بذوقك
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.nameAR} fill className="object-cover" />
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
          ))}
        </div>
      </div>
    </section>
  );
}