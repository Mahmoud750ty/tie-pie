import Link from "next/link"
import Image from "next/image"
import HeroImg from "@/assets/image.png"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="تاي باي - أجواء المطعم"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">تاي باي: كل قضمة... حكاية</h1>
        <p className="text-xl md:text-2xl mb-8 text-accent-beige leading-relaxed">
          تجربة تمتد لأكثر من 60 عامًا من الأصالة، نقدمها لك اليوم بنكهة عصرية تليق بك
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="bg-white text-primary-burgundy px-8 py-4 rounded-lg font-semibold hover:bg-accent-beige transition-colors duration-300 text-lg"
          >
            احجز طاولتك الآن
          </Link>
          <Link
            href="/menu"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-burgundy transition-colors duration-300 text-lg"
          >
            اكتشف قائمة الطعام
          </Link>
        </div>
      </div>
    </section>
  )
}
