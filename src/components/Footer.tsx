import { InstagramIcon } from "lucide-react";
import React from "react";
import logo from "../assets/logo.jpeg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="AppThrift Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold">AppThrift</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Premium subscriptions made simple. One platform for all your
              digital needs.
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href="https://www.instagram.com/app_thrifts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
              >
                <InstagramIcon size={22} />
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive offers and updates straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 rounded-md transition text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AppThrift. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
