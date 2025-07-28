import Link from "next/link"
import { Phone, MapPin, Clock, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-burgundy text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">تاي باي</h3>
            <p className="text-accent-beige mb-4">
              تجربة تمتد لأكثر من 60 عامًا من الأصالة، نقدمها لك اليوم بنكهة عصرية تليق بك.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-accent-beige hover:text-white transition-colors">
                فيسبوك
              </a>
              <a href="#" className="text-accent-beige hover:text-white transition-colors">
                إنستغرام
              </a>
              <a href="#" className="text-accent-beige hover:text-white transition-colors">
                تويتر
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-accent-beige hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-accent-beige hover:text-white transition-colors">
                  قصتنا
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-accent-beige hover:text-white transition-colors">
                  قائمة الطعام
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-accent-beige hover:text-white transition-colors">
                  احجز طاولتك
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-accent-beige" />
                <span className="text-accent-beige">+20 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-accent-beige" />
                <span className="text-accent-beige">الاسكندرية، مصر</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Clock className="h-5 w-5 text-accent-beige" />
                <span className="text-accent-beige">يوميًا: 10 ص - 12 م</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-accent-beige" />
                <span className="text-accent-beige">info@tiepie.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-green mt-8 pt-8 text-center">
          <p className="text-accent-beige">© 2024 تاي باي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
