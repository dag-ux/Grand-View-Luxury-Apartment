import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApartmentById } from '../api/apartment.api';
import { Bed, Bath, Maximize, CheckCircle2 } from 'lucide-react';

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      if (!id) return;
      try {
        const data = await getApartmentById(id);
        setApartment(data);
      } catch (error) {
        console.error("Error fetching apartment:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApartment();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-luxury-white dark:bg-luxury-black text-gold-base flex items-center justify-center text-2xl font-decorative pt-20">Loading...</div>;
  if (!apartment) return <div className="min-h-screen bg-luxury-white dark:bg-luxury-black text-black dark:text-white flex flex-col items-center justify-center pt-20"><h2 className="text-3xl font-bold mb-4">Apartment not found.</h2><Link to="/apartments" className="text-gold-base hover:underline">Back to listings</Link></div>;

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <Link to="/apartments" className="text-gold-base mb-6 inline-block hover:text-gold-light font-semibold text-sm transition-colors">&larr; Back to Apartments</Link>
        
        <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gold-base/30 shadow-2xl">
          <div className="h-[400px] md:h-[500px] w-full relative">
            <img src={apartment.images[0]} alt={apartment.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 right-6 bg-gold-base text-black font-bold px-6 py-2 rounded-md text-lg shadow-lg">
              {apartment.price.toLocaleString()} ETB / month
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              <div>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-black dark:text-white mb-2">{apartment.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Bole Rwanda, Addis Ababa</p>
              </div>
              <button className="bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-bold uppercase tracking-widest py-4 px-8 rounded-md transition-all duration-300 w-full md:w-auto shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 text-sm">
                Schedule a Tour
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10 text-center border-y border-gray-200 dark:border-gray-800 py-8 bg-gray-50 dark:bg-black/30 rounded-lg">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><Bed size={16}/> Bedrooms</p>
                <p className="text-black dark:text-white text-2xl font-bold">{apartment.bedrooms}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><Bath size={16}/> Bathrooms</p>
                <p className="text-black dark:text-white text-2xl font-bold">{apartment.bathrooms}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider mb-1 flex items-center justify-center gap-2"><Maximize size={16}/> Size</p>
                <p className="text-black dark:text-white text-2xl font-bold">{apartment.sizeSqm} sqm</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-4">About this Residence</h3>
              <p className="text-gray-800 dark:text-gray-400 leading-relaxed text-lg font-light mb-8">{apartment.description}</p>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
               <h4 className="font-bold text-black dark:text-white mb-4 uppercase tracking-wider text-sm">Included Amenities</h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"><CheckCircle2 size={16} className="text-gold-base"/> Infinity Pool</span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"><CheckCircle2 size={16} className="text-gold-base"/> Private Gym</span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"><CheckCircle2 size={16} className="text-gold-base"/> 24/7 Security</span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"><CheckCircle2 size={16} className="text-gold-base"/> Underground Parking</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}