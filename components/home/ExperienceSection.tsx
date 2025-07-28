import Link from "next/link"
import Image from "next/image"
import img from "@/assets/red-logo.png"

export default function ExperienceSection() {
  return (
    <section className="py-16 bg-accent-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-burgundy mb-6">تجربة تليق بك</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              في "تاي باي"، الأجواء الدافئة والخدمة الاستثنائية هما جزء لا يتجزأ من وصفتنا. لقد صممنا كل ركن في مطعمنا
              ليكون مكانًا مثاليًا لصنع الذكريات.
            </p>
            <Link
              href="/story"
              className="inline-block bg-primary-burgundy text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300"
            >
              اكتشف أجواءنا
            </Link>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image src={img} alt="أجواء مطعم تاي باي" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
