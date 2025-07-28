import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import FeaturedDishes from "@/components/home/FeaturedDishes"
import ExperienceSection from "@/components/home/ExperienceSection"
import SpecialOffersSection from "@/components/home/TestimonialsSection"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedDishes />
        <ExperienceSection />
        <SpecialOffersSection />
      </main>
      <Footer />
    </div>
  )
}
