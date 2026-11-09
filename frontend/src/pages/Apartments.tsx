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
  images: string[];
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

  const getMediaUrl = (url: string) => {
    if (url && url.startsWith('/uploads')) {
      return `http://localhost:5000${url}`;
    }
    return url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'; 
  };

  const filteredApartments = apartments.filter(apt => {
    if (filter === 'ALL') return true;
    return apt.listingType === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-white dark:bg-luxury-black flex items-center justify-center transition-colors duration-300">
        <div className="text-gold-base animate-pulse text-3xl font-decorative">Loading Residences...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-gold-base tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">The Collection</span>
          <h1 className="font-decorative text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Our <span className="text-gold-gradient italic">Residences</span>
          </h1>
          <p className="text-gray-800 dark:text-gray-400 max-w-2xl mx-auto font-light text-lg">
            Discover our collection of premium apartments in Bole Rwanda. Whether you are looking to rent or purchase, find your perfect home here.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setFilter('ALL')} className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${filter === 'ALL' ? 'bg-gold-base text-black shadow-lg shadow-gold-base/30' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}>All Properties</button>
          <button onClick={() => setFilter('RENT')} className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${filter === 'RENT' ? 'bg-gold-base text-black shadow-lg shadow-gold-base/30' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}>For Rent</button>
          <button onClick={() => setFilter('SALE')} className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${filter === 'SALE' ? 'bg-white text-black shadow-lg shadow-white/20' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}>For Sale</button>
        </div>

        {filteredApartments.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
            <Search size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">No Properties Found</h3>
            <p className="text-gray-500">We currently don't have any properties matching this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apt) => (
              <div key={apt.id} className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-gold-base/50 transition-all duration-300 group shadow-xl dark:shadow-none shine-card flex flex-col">
                
                <div className="relative h-64 overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800">
                  <img src={getMediaUrl(apt.images[0])} alt={apt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
                    <div className={`font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-widest shadow-lg backdrop-blur-md ${apt.listingType === 'SALE' ? 'bg-white/90 text-black border border-white' : 'bg-gold-base/90 text-black'}`}>
                      For {apt.listingType === 'SALE' ? 'Sale' : 'Rent'}
                    </div>
                    <div className="bg-black/80 backdrop-blur-md text-gold-base font-bold px-3 py-1 rounded-md text-sm border border-gold-base/30 shadow-lg">
                      {apt.price.toLocaleString()} ETB {apt.listingType === 'RENT' && '/ mo'}
                    </div>
                  </div>
                </div>

                <div className="p-6 relative z-10 flex flex-col flex-grow">
                  <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-2">{apt.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">{apt.description}</p>
                  
                  <div className="flex justify-between text-sm text-gray-800 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 pt-4 mb-6 font-medium">
                    <span className="flex items-center gap-1.5"><Bed size={16} className="text-gold-base"/> {apt.bedrooms} Beds</span>
                    <span className="flex items-center gap-1.5"><Bath size={16} className="text-gold-base"/> {apt.bathrooms} Baths</span>
                    <span className="flex items-center gap-1.5"><Maximize size={16} className="text-gold-base"/> {apt.sizeSqm} sqm</span>
                  </div>
                  
                  <Link to={`/apartments/${apt.id}`} className="block text-center w-full bg-transparent border-2 border-gold-base text-gold-base hover:bg-gold-base hover:text-black font-bold uppercase tracking-wider py-3 rounded transition-all duration-300 text-xs mt-auto">
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