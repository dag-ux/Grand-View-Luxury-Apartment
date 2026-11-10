import { 
  Waves, Dumbbell, ShieldCheck, TreePine, Landmark, 
  Sun, Car, Zap, Wifi, Coffee, HeartPulse, Sparkles
} from 'lucide-react';
import GoldIcon from '../components/GoldIcon';

export default function Amenities() {
  const amenityCategories = [
    {
      title: "Wellness & Leisure",
      description: "Rejuvenate your body and mind with our world-class wellness facilities.",
      items: [
        { icon: <Waves />, title: "Infinity Pool & Hot Tub", desc: "Relax in our heated outdoor pool and hot tub with panoramic views of the city skyline." },
        { icon: <Dumbbell />, title: "Fully Equipped Gym", desc: "State-of-the-art fitness center to keep you active and energized." },
        { icon: <HeartPulse />, title: "Sauna & Steam Room", desc: "Detoxify and unwind in our premium spa facilities." },
        { icon: <TreePine />, title: "Landscaped Gardens", desc: "Soft and hardscaped zones, including a river floodplain edge for peaceful walks." }
      ]
    },
    {
      title: "Lifestyle & Community",
      description: "Spaces designed for connection, entertainment, and everyday convenience.",
      items: [
        { icon: <Landmark />, title: "The Piazza & Retail", desc: "A vibrant public realm split-level retail offering centered around a beautifully hardscaped piazza." },
        { icon: <Coffee />, title: "Exclusive Clubhouse", desc: "A private space for residents and their guests to relax and socialize." },
        { icon: <Sun />, title: "Modern Aesthetics", desc: "Concrete finishes, timber composite, and aluminium louvres for natural shade." },
        { icon: <Wifi />, title: "High-Speed Connectivity", desc: "Fiber-optic internet infrastructure ensuring seamless work and streaming." }
      ]
    },
    {
      title: "Security & Convenience",
      description: "Uninterrupted peace of mind with top-tier safety and utility infrastructure.",
      items: [
        { icon: <ShieldCheck />, title: "24/7 Gated Security", desc: "Round-the-clock reception, CCTV, and secure biometric access control." },
        { icon: <Zap />, title: "Double-Backup Generators", desc: "Automatic power switching ensures you never experience an outage." },
        { icon: <Car />, title: "Underground Parking", desc: "Secure, private underground parking ensuring your vehicles are protected." },
        { icon: <Sparkles />, title: "Daily Maintenance", desc: "Dedicated staff for cleaning, waste management, and common area upkeep." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header (ONLY H1 uses font-decorative) */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-[10px] sm:text-xs font-bold font-sans mb-3 sm:mb-4 block">
            The Grandview Lifestyle
          </span>
          <h1 className="font-decorative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
            World-Class <span className="text-gold-gradient italic">Amenities</span>
          </h1>
          {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 */}
          <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto font-sans text-sm sm:text-base md:text-lg font-normal">
            Every detail at Grandview Addis is meticulously curated to offer an unmatched living experience for you and your family.
          </p>
        </div>

        {/* Amenities Categories */}
        <div className="space-y-16 sm:space-y-20">
          {amenityCategories.map((category, index) => (
            <div key={index}>
              {/* Category Header (Uses Elegant Serif) */}
              <div className="mb-6 sm:mb-10 border-b border-gray-300 dark:border-gold-base/20 pb-4 sm:pb-6">
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
                  {category.title}
                </h2>
                {/* FIXED TEXT CONTRAST: Changed to text-gray-700 dark:text-gray-400 */}
                <p className="text-gray-700 dark:text-gray-400 font-sans text-sm md:text-base font-normal">
                  {category.description}
                </p>
              </div>

              {/* Grid for items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {category.items.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#111] p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-white/5 hover:border-gold-base/50 relative shine-card card-glow text-left group">
                    <div className="mb-5 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gold-base/10 flex items-center justify-center group-hover:bg-gold-base/20 transition-all duration-500">
                      <GoldIcon icon={item.icon} size={24} className="sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-black dark:text-white mb-2 relative z-10">
                      {item.title}
                    </h3>
                    {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 */}
                    <p className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm font-sans leading-relaxed relative z-10 font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}