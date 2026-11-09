import { Waves, Dumbbell, ShieldCheck, TreePine, Landmark, Sun, Car, Zap } from 'lucide-react';
import GoldIcon from '../components/GoldIcon';

export default function Amenities() {
  const amenities = [
    { icon: <Waves />, title: "Infinity Pool & Hot Tub", desc: "Relax in our heated outdoor pool and hot tub with panoramic views of the city skyline." },
    { icon: <Dumbbell />, title: "Wellness Club", desc: "Fully equipped gym, sauna, and steam room designed to rejuvenate your body and mind." },
    { icon: <Landmark />, title: "The Piazza & Retail", desc: "A vibrant public realm split-level retail offering centered around a beautifully hardscaped piazza." },
    { icon: <TreePine />, title: "Landscaped Terraces", desc: "Soft and hardscaped zones, including a river floodplain edge and pedestrian interfaces between towers." },
    { icon: <ShieldCheck />, title: "24/7 Security", desc: "Gated complex with round-the-clock reception, CCTV, and secure access control." },
    { icon: <Zap />, title: "Uninterrupted Power", desc: "Automatic double-backup generators ensure you never experience a power outage." },
    { icon: <Car />, title: "Underground Parking", desc: "Secure, private underground parking ensuring your vehicles are protected at all times." },
    { icon: <Sun />, title: "Modern Aesthetics", desc: "Concrete finishes, timber composite, aluminium louvres for shade, and expansive glazed curtain walls." }
  ];

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-gold-base tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">The Grandview Lifestyle</span>
          <h1 className="font-decorative text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            World-Class <span className="text-gold-gradient italic">Amenities</span>
          </h1>
          <p className="text-gray-800 dark:text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Every detail at Grandview Addis is meticulously curated to offer an unmatched living experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((item, index) => (
            <div key={index} className="bg-white dark:bg-[#111] p-10 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-gold-base/50 relative shine-card card-glow text-left group overflow-hidden">
              <div className="mb-8 w-16 h-16 rounded-2xl bg-gold-base/10 flex items-center justify-center group-hover:bg-gold-base/20 transition-all duration-500 relative z-10">
                <GoldIcon icon={item.icon} size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-black dark:text-white mb-3 relative z-10">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-light leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}