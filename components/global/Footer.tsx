import Link from "next/link";
import {
  Facebook,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Logo from "./Logo";
import { motion } from "framer-motion";

export default function MyFooter() {
  return (
    <div className="bg-yellow-400">
      <motion.footer
        className="bg-zinc-900 px-4 py-12 text-white md:px-8"
        whileInView={{ y: [99, 0] }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Left Column - Logo and Contact */}
            <div>
              <Logo />
              <p className="mb-6 text-gray-300">
                Experience the authentic taste of sushi in Bristol.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-yellow-400 p-2">
                    <Phone size={18} className="text-white" />
                  </div>
                  <span>07585 870888</span>
                </div>
                {/* <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-yellow-400 p-2">
                    <Mail size={18} className="text-white" />
                  </div>
                  <span>@gmail.com</span>
                </div> */}
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-yellow-400 p-2">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <span>365 Filton Ave, Horfield, Bristol BS7 0BD</span>
                </div>
              </div>
            </div>

            {/* Middle Column - Opening Hours */}
            <div>
              <h3 className="mb-6 text-xl font-medium">Opening Hours</h3>
              <div className="mb-6 w-24 border-t border-gray-600"></div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <strong>Sunday:</strong> 12–10 pm
                </li>
                <li>
                  <strong>Monday:</strong> 4–10 pm
                </li>
                <li>
                  <strong>Tuesday:</strong> Closed
                </li>
                <li>
                  <strong>Wednesday:</strong> 4–10 pm
                </li>
                <li>
                  <strong>Thursday:</strong> 4–10 pm
                </li>
                <li>
                  <strong>Friday:</strong> 12–10 pm
                </li>
                <li>
                  <strong>Saturday:</strong> 12–10 pm
                </li>
              </ul>
            </div>

            {/* Right Column - Quick Links and Social */}
            <div>
              <h3 className="mb-6 text-xl font-medium">Quick Links</h3>
              <div className="mb-6 w-24 border-t border-gray-600"></div>
              <nav className="mb-6 space-y-3">
                <Link
                  href="/"
                  className="block transition-colors hover:text-yellow-400"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block transition-colors hover:text-yellow-400"
                >
                  About Us
                </Link>
                <Link
                  href="/menu"
                  className="block transition-colors hover:text-yellow-400"
                >
                  Our Menu
                </Link>
                <Link
                  href="/testimonials"
                  className="block transition-colors hover:text-yellow-400"
                >
                  Testimonials
                </Link>
                <Link
                  href="/blog"
                  className="block transition-colors hover:text-yellow-400"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="block transition-colors hover:text-yellow-400"
                >
                  Contact
                </Link>
              </nav>

              <h3 className="mb-4 text-xl font-medium">Social Media:</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="transition-colors hover:text-yellow-400"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="#"
                  className="transition-colors hover:text-yellow-400"
                >
                  <Twitter size={24} />
                </Link>
                <Link
                  href="#"
                  className="transition-colors hover:text-yellow-400"
                >
                  <Instagram size={24} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>© 2025 Shim-solution. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
