import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Here you can add your API call for newsletter subscription
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left - Branding & Newsletter */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-red-600 mb-4">MacFlix</h3>
          <p className="mb-6 max-w-sm text-gray-400">
            Your ultimate movie companion — discover, watch, and share your
            favorite films.
          </p>

          {/* Newsletter Subscription */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row max-w-md gap-3"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="flex-grow rounded-md outline-1 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Subscribe to our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 transition-colors rounded-md px-5 py-2 font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-green-400">Thank you for subscribing!</p>
          )}
        </div>

        {/* Middle - Quick Links */}
        <nav className="flex-1 flex flex-col space-y-3 md:space-y-4">
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-red-600 transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-red-600 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-600 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-red-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Right - Social Media */}
        <div className="flex-1">
          <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-6 text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-6 h-6 hover:text-red-600 transition-colors" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Facebook
              </span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6 hover:text-red-600 transition-colors" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Twitter
              </span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6 hover:text-red-600 transition-colors" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Instagram
              </span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6 hover:text-red-600 transition-colors" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                YouTube
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MacFlix. All rights reserved.
      </div>
    </footer>
  );
}
