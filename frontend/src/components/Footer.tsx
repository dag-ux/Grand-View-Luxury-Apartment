import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#020202] border-t border-gray-200 dark:border-gold-base/20 py-10 md:py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
          <img src={logo} alt="GrandView Logo" className="h-12 w-12 rounded-full mb-3 border border-gold-base/30" />
          <h3 className="text-gold-gradient font-bold text-xl mb-2 uppercase tracking-widest font-serif">GrandView Addis</h3>
          <p className="text-gray-700 dark:text-gray-400 text-sm max-w-sm font-sans font-normal leading-relaxed">
            Experience unparalleled luxury in the heart of Bole Rwanda, Addis Ababa. Modern design, world-class amenities, and breathtaking views.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-black dark:text-white font-bold mb-4 uppercase tracking-wider text-sm font-sans">Quick Links</h4>
          <ul className="space-y-2.5 text-gray-700 dark:text-gray-400 text-sm font-medium font-sans">
            <li><Link to="/" className="hover:text-gold-base transition-colors">Home</Link></li>
            <li><Link to="/apartments" className="hover:text-gold-base transition-colors">Apartments</Link></li>
            <li><Link to="/amenities" className="hover:text-gold-base transition-colors">Amenities</Link></li>
            <li><Link to="/login" className="hover:text-gold-base transition-colors">Tenant Login</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-black dark:text-white font-bold mb-4 uppercase tracking-wider text-sm font-sans">Contact Us</h4>
          <ul className="space-y-2.5 text-gray-700 dark:text-gray-400 text-sm font-medium font-sans">
            <li>Rwanda Street, Bole</li>
            <li>Addis Ababa, Ethiopia</li>
            <li>+251 900 000 000</li>
            <li>info@grandviewaddis.com</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-500 text-xs tracking-wider font-sans font-medium">
        &copy; {new Date().getFullYear()} GRANDVIEW ADDIS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}