import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllApartments } from '../api/apartment.api';
import { Bed, Maximize, Bath, Search } from 'lucide-react';

interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  images: any[]; 
  listingType: string;
  status: string;
}

export default function Apartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getAllApartments();
        setApartments(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, []);

  const getFirstImage = (images: any[]) => {
    if (!images || images.length === 0) return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
    const img = images[0];
    const url = typeof img === 'string' ? img : img.url;
    return url.startsWith('/uploads') ? `http://localhost:5000${url}` : url;
  };

  const filteredApartments = apartments.filter(apt => {
    if (filter === 'ALL') return true;
    return apt.listingType === filter;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gold-base font-sans font-bold uppercase tracking-widest">Loading...</div>;

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-3 block">The Collection</span>
          <h1 className="font-decorative text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Our <span className="text-gold-gradient italic">Residences</span>
          </h1>
          {/* FIXED TEXT CONTRAST HERE */}
          <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto font-sans text-sm md:text-base font-normal">
            Discover our collection of premium apartments in Bole Rwanda. Whether you are looking to rent or purchase, find your perfect home here.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button onClick={() => setFilter('ALL')} className={`px-6 py-2 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${filter === 'ALL' ? 'bg-gold-base text-black shadow-lg' : 'bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10'}`}>All</button>
          <button onClick={() => setFilter('RENT')} className={`px-6 py-2 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${filter === 'RENT' ? 'bg-gold-base text-black shadow-lg' : 'bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10'}`}>For Rent</button>
          <button onClick={() => setFilter('SALE')} className={`px-6 py-2 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${filter === 'SALE' ? 'bg-white text-black shadow-lg' : 'bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10'}`}>For Sale</button>
        </div>

        {filteredApartments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
            <Search size={40} className="mx-auto text-gray-400 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-sans font-bold text-black dark:text-white mb-2">No Properties Found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApartments.map((apt) => (
              <div key={apt.id} className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-gold-base/50 transition-all duration-300 group shadow-lg dark:shadow-none shine-card flex flex-col">
                <div className="relative h-56 overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800">
                  <img src={getFirstImage(apt.images)} alt={apt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10">
                    <div className={`font-sans font-bold px-2.5 py-1 rounded text-[9px] uppercase tracking-widest shadow-md backdrop-blur-md ${apt.listingType === 'SALE' ? 'bg-white/90 text-black' : 'bg-gold-base/90 text-black'}`}>
                      For {apt.listingType === 'SALE' ? 'Sale' : 'Rent'}
                    </div>
                    <div className="bg-black/80 backdrop-blur-md text-gold-base font-sans font-bold px-2.5 py-1 rounded text-xs border border-gold-base/30 shadow-md">
                      {apt.price.toLocaleString()} ETB {apt.listingType === 'RENT' && '/ mo'}
                    </div>
                  </div>
                </div>
                <div className="p-5 relative z-10 flex flex-col flex-grow">
                  <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-1.5">{apt.title}</h3>
                  {/* FIXED CARD TEXT CONTRAST HERE */}
                  <p className="text-gray-700 dark:text-gray-400 text-xs mb-4 line-clamp-2 flex-grow font-sans font-normal">{apt.description}</p>
                  <div className="flex justify-between text-xs text-gray-800 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-3 mb-4 font-sans font-medium">
                    <span className="flex items-center gap-1"><Bed size={14} className="text-gold-base"/> {apt.bedrooms} Beds</span>
                    <span className="flex items-center gap-1"><Bath size={14} className="text-gold-base"/> {apt.bathrooms} Baths</span>
                    <span className="flex items-center gap-1"><Maximize size={14} className="text-gold-base"/> {apt.sizeSqm} sqm</span>
                  </div>
                  <Link to={`/apartments/${apt.id}`} className="block text-center w-full bg-transparent border border-gold-base text-gold-base hover:bg-gold-base hover:text-black font-sans font-bold uppercase tracking-widest py-2.5 rounded transition-all duration-300 text-[10px] mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}