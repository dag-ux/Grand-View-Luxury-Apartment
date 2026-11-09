import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.jpg';
import { Home, Building2, Sparkles, Phone, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={14} /> },
    { name: 'Apartments', path: '/apartments', icon: <Building2 size={14} /> },
    { name: 'Amenities', path: '/amenities', icon: <Sparkles size={14} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={14} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 dark:bg-luxury-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gold-base/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-4 group">
              <img src={logo} alt="GrandView Addis Logo" className="h-14 w-14 rounded-full border border-gold-base/50 object-cover group-hover:border-gold-base transition-colors shadow-lg" />
              <div className="flex flex-col">
                <span className="font-serif text-black dark:text-white font-bold text-2xl tracking-widest uppercase leading-none">
                  Grand<span className="text-gold-gradient">View</span>
                </span>
                <span className="text-[9px] text-gold-base tracking-[0.3em] uppercase font-sans font-semibold mt-1">
                  Luxury Apartments
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative flex items-center gap-2 py-2 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive(link.path) ? 'text-gold-base' : 'text-gray-600 dark:text-gray-400 hover:text-gold-base'
                }`}
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold-base transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isActive(link.path) ? 'scale-x-100' : ''}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/login" className="group flex items-center gap-2 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] hover:-translate-y-0.5">
              <User size={16} className="group-hover:scale-110 transition-transform" /> Login
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 hover:text-gold-base transition-colors">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-24 left-0 w-full bg-white dark:bg-luxury-black border-b border-gray-200 dark:border-gold-base/20 transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 px-4 py-4 rounded-md text-sm font-semibold uppercase tracking-widest transition-colors ${isActive(link.path) ? 'bg-gold-base/10 text-gold-base border-l-4 border-gold-base' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 border-l-4 border-transparent'}`}>
              {link.icon} {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black px-6 py-4 rounded-full font-bold text-sm uppercase tracking-widest">
              <User size={18} /> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}