import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logoix.png'; // Make sure this path is correct for your project

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
          
          {/* Branding & Slogan */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src={Logo} alt="IntervuX Logo" className="h-9" />
              <span className="text-xl font-bold text-white">IntervuX</span>
            </Link>
            <p className="max-w-xs mx-auto md:mx-0">
              Your AI-powered coach to help you ace every interview.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-white uppercase mb-4">Product</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/features" className="hover:text-white transition">Features</Link>
                <Link to="/faq" className="hover:text-white transition">FAQ</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold text-white uppercase mb-4">Company</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/about" className="hover:text-white transition">About Us</Link>
                <Link to="/contact" className="hover:text-white transition">Contact</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold text-white uppercase mb-4">Legal</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            &copy; {currentYear} IntervuX. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;