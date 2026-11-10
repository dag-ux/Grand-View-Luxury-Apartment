import { Link } from 'react-router-dom';
import { 
  Building2, Store, Briefcase, MapPin, Waves, Dumbbell, 
  ShieldCheck, TreePine, Star, 
  Bed, Maximize, Landmark, Sun
} from 'lucide-react';
import GoldIcon from '../components/GoldIcon';
import { useEffect, useRef } from 'react';

import images1 from '../assets/images1.jpg';
import images3 from '../assets/images3.jpg';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; 
    }
  }, []);

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black transition-colors duration-300">
      
      {/* HERO SECTION */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-black/60 dark:bg-black/70 transition-colors duration-300"></div>

        <div className="relative z-20 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-gray-200 font-sans tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block drop-shadow-md">
            A Landmark Mixed-Use Development
          </span>

          <h1 className="font-decorative text-white leading-[1.1] tracking-tight drop-shadow-2xl flex flex-col items-center mb-8">
            <span className="text-4xl md:text-6xl lg:text-7xl font-normal">Experience</span>
            <span className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold text-gold-gradient py-2">Unrivaled</span>
            <span className="text-4xl md:text-6xl lg:text-7xl font-normal">Luxury</span>
          </h1>

          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="text-gold-base font-sans tracking-[0.3em] uppercase text-xs font-semibold drop-shadow-md">
              Rwanda Street • Bole • Addis Ababa
            </span>
            <span className="text-gray-200 font-sans tracking-widest uppercase text-[10px]">
              182 Exclusive Residences • Retail • Office
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <Link to="/apartments" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-sans font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg hover:-translate-y-1 text-center shine-button">
              View Residences
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white hover:bg-white hover:text-black font-sans font-bold uppercase tracking-widest text-xs transition-all duration-300 backdrop-blur-sm text-center">
              Schedule a Tour
            </Link>
          </div>
        </div>
      </div>

      {/* THE VISION - FIXED TEXT CONTRAST */}
      <div className="py-24 px-4 bg-white dark:bg-luxury-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-4 block">The Grandview Vision</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-black dark:text-white mb-6 leading-tight">
              A New Landmark in <br/><span className="text-gold-gradient italic">Addis Ababa</span>
            </h2>
            {/* Changed to text-gray-800 and font-normal for high contrast in light mode */}
            <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed mb-4 font-sans font-normal">
              Grandview Addis is a differentiator in the market, designed to provide something never seen before in the city. Situated on a steep, thoughtfully terraced site along Rwanda Street, this development masterfully blends commercial vitality with residential serenity.
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed mb-8 font-sans font-normal">
              The design responds directly to the topography, featuring a sculptural, wavy office tower at the highest point, framing a vibrant public piazza and softening into the geometric elegance of three residential towers.
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-800 pt-8">
              <div>
                <Store className="text-gold-base mb-2" size={24} />
                <p className="text-2xl font-sans font-bold text-black dark:text-white">700 <span className="text-sm font-normal text-gray-500">sqm</span></p>
                <p className="text-xs font-sans uppercase tracking-wider text-gray-600 dark:text-gray-500">Retail</p>
              </div>
              <div>
                <Briefcase className="text-gold-base mb-2" size={24} />
                <p className="text-2xl font-sans font-bold text-black dark:text-white">5,000 <span className="text-sm font-normal text-gray-500">sqm</span></p>
                <p className="text-xs font-sans uppercase tracking-wider text-gray-600 dark:text-gray-500">Office</p>
              </div>
              <div>
                <Building2 className="text-gold-base mb-2" size={24} />
                <p className="text-2xl font-sans font-bold text-black dark:text-white">182</p>
                <p className="text-xs font-sans uppercase tracking-wider text-gray-600 dark:text-gray-500">Apartments</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 border-2 border-gold-base/30 translate-x-4 translate-y-4 rounded-lg pointer-events-none"></div>
            <img 
              src={images3} 
              alt="Grandview Aerial Pool View" 
              className="relative z-10 w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* THE RESIDENCES */}
      <div className="py-24 px-4 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gold-base/10">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-4 block">The Collection</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            182 Curated <span className="text-gold-gradient italic">Residences</span>
          </h2>
          <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto mb-12 font-sans text-sm md:text-base font-normal">
            Spanning three distinct yet intrinsically linked towers (13–16 storeys), our homes feature large overhangs for natural shade, modern aesthetics, and premium finishes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gold-base/30 hover:border-gold-base transition-colors relative shine-card card-glow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark to-gold-light"></div>
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <Bed className="text-gold-base" size={24} />
                  <span className="text-black dark:text-white font-sans font-bold text-xs bg-gold-gradient px-3 py-1 rounded-full">71 Units</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-black dark:text-white mb-2">Studios & 1-Bed</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm font-sans font-normal">24 Studios & 47 One-Bedroom apartments designed for modern professionals.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gold-base/30 hover:border-gold-base transition-colors relative shine-card card-glow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark to-gold-light"></div>
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <Bed className="text-gold-base" size={24} />
                  <span className="text-black dark:text-white font-sans font-bold text-xs bg-gold-gradient px-3 py-1 rounded-full">50 Units</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-black dark:text-white mb-2">2-Bedroom</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm font-sans font-normal">Spacious layouts with premium finishes and views of the landscaped terraces.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gold-base/30 hover:border-gold-base transition-colors relative shine-card card-glow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark to-gold-light"></div>
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <Maximize className="text-gold-base" size={24} />
                  <span className="text-black dark:text-white font-sans font-bold text-xs bg-gold-gradient px-3 py-1 rounded-full">56 Units</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-black dark:text-white mb-2">3-Bedroom</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm font-sans font-normal">Generous family homes located adjacent to the exclusive communal clubhouse and pool.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gold-base/30 hover:border-gold-base transition-colors relative shine-card card-glow">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark to-gold-light"></div>
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <Landmark className="text-gold-base" size={24} />
                  <span className="text-black dark:text-white font-sans font-bold text-xs bg-gold-gradient px-3 py-1 rounded-full">5 Units</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-black dark:text-white mb-2">Penthouses</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm font-sans font-normal">The pinnacle of luxury. Unrivaled panoramic views and exclusive access.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AMENITIES - FIXED TEXT CONTRAST */}
      <div className="py-24 px-4 bg-white dark:bg-luxury-black">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-4 block">The Grandview Lifestyle</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black dark:text-white mb-12">
            A World Apart, <span className="text-gold-gradient italic">Within the City</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 relative shine-card card-glow">
              <div className="mb-4"><GoldIcon icon={<Landmark />} size={32} /></div>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-2">The Piazza & Retail</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-sans leading-relaxed font-normal">A vibrant public realm split-level retail offering centered around a beautifully hardscaped piazza.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 relative shine-card card-glow">
              <div className="mb-4"><GoldIcon icon={<Waves />} size={32} /></div>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-2">Communal Pool</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-sans leading-relaxed font-normal">An oasis located perfectly between the 2-bed and 3-bed buildings for residents to unwind.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 relative shine-card card-glow">
              <div className="mb-4"><GoldIcon icon={<TreePine />} size={32} /></div>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-2">Landscaped Terraces</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-sans leading-relaxed font-normal">Soft and hardscaped zones, including a river floodplain edge and pedestrian interfaces between towers.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 relative shine-card card-glow">
              <div className="mb-4"><GoldIcon icon={<Dumbbell />} size={32} /></div>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-2">Clubhouse & Gym</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-sans leading-relaxed font-normal">Fully equipped fitness center and exclusive clubhouse for residents and their guests.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 relative shine-card card-glow">
              <div className="mb-4"><GoldIcon icon={<Sun />} size={32} /></div>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-2">Modern Aesthetics</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-sans leading-relaxed font-normal">Concrete finishes, timber composite, aluminium louvres for shade, and expansive glazed curtain walls.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 relative shine-card card-glow">
              <div className="mb-4"><GoldIcon icon={<ShieldCheck />} size={32} /></div>
              <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-2">Secure & Powered</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm font-sans leading-relaxed font-normal">24/7 gated security, underground parking, and automatic double-backup generators.</p>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATION - FIXED TEXT CONTRAST */}
      <div className="py-24 px-4 bg-gray-50 dark:bg-[#080808] border-t border-gray-200 dark:border-gold-base/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
             <img src={images1} alt="Grandview Poolside" className="w-full h-[400px] object-cover rounded-lg shadow-2xl border border-gold-base/20" />
            <div className="absolute -bottom-6 -right-6 bg-gold-base text-black p-6 rounded-lg shadow-xl hidden md:block border border-white/50">
              <MapPin size={32} className="mb-2" />
              <p className="font-sans font-bold text-lg text-black">Rwanda Street</p>
              <p className="font-sans text-sm font-semibold">1.5km from Airport</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-4 block">Prime Location</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-black dark:text-white mb-6 leading-tight">
              The Heart of <br/><span className="text-gold-gradient italic">Bole, Addis Ababa</span>
            </h2>
            <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed mb-6 font-sans font-normal">
              Located just 1.5km from the airport entrance, Grandview Addis sits in a neighborhood rich with embassies, commercial hubs, and residential activity. 
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-800 dark:text-gray-300 font-sans text-sm font-normal"><Star size={16} className="text-gold-base shrink-0" /><span>Direct access from Rwanda Street (two-way with central median)</span></li>
              <li className="flex items-center gap-3 text-gray-800 dark:text-gray-300 font-sans text-sm font-normal"><Star size={16} className="text-gold-base shrink-0" /><span>Minutes from Bole International Airport and commercial strip</span></li>
              <li className="flex items-center gap-3 text-gray-800 dark:text-gray-300 font-sans text-sm font-normal"><Star size={16} className="text-gold-base shrink-0" /><span>Surrounded by international embassies and top-tier amenities</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-24 px-4 bg-luxury-black overflow-hidden border-t border-gold-base/20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Building2 size={40} className="text-gold-base mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Secure Your <span className="text-gold-gradient italic">Legacy</span></h2>
          <p className="text-gray-300 text-base font-sans mb-8 max-w-2xl mx-auto font-normal">With only 182 exclusive residences available, Grandview Addis is set to become the most sought-after address in the city. Contact our team today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-sans font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg hover:-translate-y-1 shine-button">
              Contact Us Today
            </Link>
            <Link to="/apartments" className="w-full sm:w-auto px-8 py-3.5 border border-gold-base text-gold-base hover:bg-gold-base hover:text-black font-sans font-bold uppercase tracking-widest text-xs transition-all duration-300">
              Browse Availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}