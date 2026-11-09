import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllApartments } from '../api/apartment.api';
import { Bed, Maximize, Bath } from 'lucide-react';

interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  images: string[];
}

export default function Apartments() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="min-h-screen bg-luxury-white dark:bg-luxury-black text-gold-base flex items-center justify-center text-2xl font-decorative">Loading Residences...</div>;

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-gold-base tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">The Collection</span>
          <h1 className="font-decorative text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Available <span className="text-gold-gradient italic">Apartments</span>
          </h1>
          <p className="text-gray-800 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Discover our collection of premium apartments in Bole Rwanda. Each unit is designed for ultimate comfort and style.
          </p>
        </div>

        {apartments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No apartments available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((apt) => (
              <div key={apt.id} className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-gold-base/50 transition-all duration-300 group shadow-lg dark:shadow-none">
                <div className="relative h-64 overflow-hidden">
                  <img src={apt.images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'} alt={apt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-gold-base text-black font-bold px-3 py-1 rounded-md text-sm shadow-lg">
                    {apt.price.toLocaleString()} ETB / mo
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-2">{apt.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-sm mb-4 line-clamp-2">{apt.description}</p>
                  <div className="flex justify-between text-sm text-gray-800 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 pt-4 mb-6 font-medium">
                    <span className="flex items-center gap-1"><Bed size={16} className="text-gold-base"/> {apt.bedrooms} Beds</span>
                    <span className="flex items-center gap-1"><Bath size={16} className="text-gold-base"/> {apt.bathrooms} Baths</span>
                    <span className="flex items-center gap-1"><Maximize size={16} className="text-gold-base"/> {apt.sizeSqm} sqm</span>
                  </div>
                  <Link to={`/apartments/${apt.id}`} className="block text-center w-full bg-transparent border border-gold-base text-gold-base hover:bg-gold-base hover:text-black font-bold uppercase tracking-wider py-3 rounded transition-colors text-xs">
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