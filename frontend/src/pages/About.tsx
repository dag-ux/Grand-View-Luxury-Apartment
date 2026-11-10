import { Building2, Landmark, Users, MapPin, CheckCircle2 } from 'lucide-react';
import images1 from '../assets/images1.jpg'; // Using your local images
import images3 from '../assets/images3.jpg';

export default function About() {
  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header (Only H1 uses decorative font) */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-[10px] sm:text-xs font-bold font-sans mb-3 sm:mb-4 block">
            Our Story
          </span>
          <h1 className="font-decorative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
            About <span className="text-gold-gradient italic">Grandview Addis</span>
          </h1>
          {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 */}
          <p className="text-gray-800 dark:text-gray-300 max-w-3xl mx-auto font-sans text-sm sm:text-base md:text-lg font-normal">
            A visionary collaboration bringing a world-class, mixed-use landmark to the heart of Bole, Addis Ababa.
          </p>
        </div>

        {/* The Vision Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-16 sm:mb-24">
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">The Grandview Vision</h2>
            {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 */}
            <p className="text-gray-800 dark:text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-4 font-normal">
              Grandview Addis is a differentiator in the market, designed to provide something never seen before in the city. Situated on a steep, thoughtfully terraced site along Rwanda Street, this development masterfully blends commercial vitality with residential serenity.
            </p>
            <p className="text-gray-800 dark:text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-6 font-normal">
              The design responds directly to the topography, featuring a sculptural, wavy office tower at the highest point, framing a vibrant public piazza and softening into the geometric elegance of three residential towers.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start sm:items-center gap-3 font-sans text-sm text-gray-800 dark:text-gray-300 font-normal">
                <CheckCircle2 size={18} className="text-gold-base shrink-0 mt-0.5 sm:mt-0" /> 
                <span>700 sqm of vibrant retail space</span>
              </li>
              <li className="flex items-start sm:items-center gap-3 font-sans text-sm text-gray-800 dark:text-gray-300 font-normal">
                <CheckCircle2 size={18} className="text-gold-base shrink-0 mt-0.5 sm:mt-0" /> 
                <span>5,000 sqm of premium office space</span>
              </li>
              <li className="flex items-start sm:items-center gap-3 font-sans text-sm text-gray-800 dark:text-gray-300 font-normal">
                <CheckCircle2 size={18} className="text-gold-base shrink-0 mt-0.5 sm:mt-0" /> 
                <span>182 exclusive residential apartments</span>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
             <div className="absolute inset-0 border-2 border-gold-base/20 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-xl pointer-events-none"></div>
             <img 
               src={images3} 
               alt="Grandview Exterior" 
               className="relative z-10 w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-xl shadow-2xl border border-gray-200 dark:border-gold-base/20" 
             />
          </div>
        </div>

        {/* Development Team */}
        <div className="bg-white dark:bg-[#111] p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl mb-16 sm:mb-24 shine-card">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8 sm:mb-10 text-center">The Development Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="text-center p-6 sm:p-8 bg-gray-50 dark:bg-black/30 rounded-xl border border-gray-100 dark:border-gray-800 card-glow group">
              <div className="w-16 h-16 mx-auto bg-gold-base/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Building2 className="text-gold-base" size={32} />
              </div>
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 font-sans font-bold mb-2">Developer / Builder</h3>
              <p className="text-black dark:text-white font-serif font-bold text-base sm:text-lg">Golden Art Real Estate and Construction</p>
            </div>
            
            {/* Card 2 */}
            <div className="text-center p-6 sm:p-8 bg-gray-50 dark:bg-black/30 rounded-xl border border-gray-100 dark:border-gray-800 card-glow group">
              <div className="w-16 h-16 mx-auto bg-gold-base/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Landmark className="text-gold-base" size={32} />
              </div>
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 font-sans font-bold mb-2">Architectural Firm</h3>
              <p className="text-black dark:text-white font-serif font-bold text-base sm:text-lg">Bentel Associates International</p>
            </div>
            
            {/* Card 3 */}
            <div className="text-center p-6 sm:p-8 bg-gray-50 dark:bg-black/30 rounded-xl border border-gray-100 dark:border-gray-800 card-glow group">
              <div className="w-16 h-16 mx-auto bg-gold-base/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Users className="text-gold-base" size={32} />
              </div>
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 font-sans font-bold mb-2">Client / Stakeholder</h3>
              <p className="text-black dark:text-white font-serif font-bold text-base sm:text-lg">MDM Developers</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
             <div className="absolute inset-0 border-2 border-gold-base/20 -translate-x-3 translate-y-3 sm:-translate-x-4 sm:translate-y-4 rounded-xl pointer-events-none"></div>
             <img 
               src={images1} 
               alt="Grandview Pool" 
               className="relative z-10 w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-xl shadow-2xl border border-gray-200 dark:border-gold-base/20" 
             />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">An Unrivaled Location</h2>
            {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 */}
            <p className="text-gray-800 dark:text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-normal">
              Located just 1.5km from the Bole International Airport entrance, Grandview Addis sits in a neighborhood rich with international embassies, commercial hubs, and high-end residential activity. 
            </p>
            <div className="flex items-center gap-4 bg-gold-base/10 p-5 rounded-xl border border-gold-base/20 shadow-sm">
              <div className="p-3 bg-gold-base text-black rounded-full shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-sans font-bold text-black dark:text-white text-base sm:text-lg">Rwanda Street, Bole</p>
                <p className="font-sans text-xs sm:text-sm text-gray-700 dark:text-gray-400 font-medium">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}