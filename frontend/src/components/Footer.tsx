import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#020202] border-t border-gray-300 dark:border-[#D4AF37]/20 py-16 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
          <img src={logo} alt="GrandView Logo" className="h-16 w-16 rounded-full mb-4 border border-gold-base/30" />
          <h3 className="text-gold-gradient font-bold text-2xl mb-4 uppercase tracking-widest">GrandView Addis</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm">
            Experience unparalleled luxury in the heart of Bole Rwanda, Addis Ababa. Modern design, world-class amenities, and breathtaking views.
          </p>
        </div>

        <div>
          <h4 className="text-black dark:text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <li><a href="/" className="hover:text-gold-base transition-colors">Home</a></li>
            <li><a href="/apartments" className="hover:text-gold-base transition-colors">Apartments</a></li>
            <li><a href="/amenities" className="hover:text-gold-base transition-colors">Amenities</a></li>
            <li><a href="/login" className="hover:text-gold-base transition-colors">Tenant Login</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-black dark:text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <li>Rwanda Street, Bole</li>
            <li>Addis Ababa, Ethiopia</li>
            <li>+251 900 000 000</li>
            <li>info@grandviewaddis.com</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-300 dark:border-gray-800 text-center text-gray-500 text-xs tracking-wider">
        &copy; {new Date().getFullYear()} GRANDVIEW ADDIS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}