import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApartmentById } from '../api/apartment.api';
import { Bed, Bath, Maximize, CheckCircle2, ArrowLeft, PlayCircle } from 'lucide-react';

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchApartment = async () => {
      if (!id) return;
      try {
        const data = await getApartmentById(id);
        setApartment(data);
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchApartment();
  }, [id]);

  const getMediaUrl = (url: string) => {
    if (url && url.startsWith('/uploads')) return `http://localhost:5000${url}`;
    return url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
  };

  const getVideoEmbed = (url: string) => {
    if (!url) return null;
    
    // 1. Local MP4 Video
    if (url.startsWith('/uploads') || url.endsWith('.mp4')) {
      return <video src={getMediaUrl(url)} controls className="w-full h-full object-contain rounded-xl bg-black" />;
    }
    
    // 2. YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return <iframe src={`https://www.youtube.com/embed/${videoId}`} className="w-full h-full rounded-xl" allowFullScreen />;
    }
    
    // 3. TikTok (Handles Full URLs only)
    if (url.includes('tiktok.com')) {
      // Extract the video ID from the full URL
      const videoIdMatch = url.match(/\/video\/(\d+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      
      if (videoId) {
        // Use TikTok's official player embed format
        return (
          <iframe 
            src={`https://www.tiktok.com/player/v1/${videoId}?&music_info=1&description=1`} 
            className="w-full h-full rounded-xl" 
            allowFullScreen 
          />
        );
      } else {
        return <div className="text-white p-4 text-center">Invalid TikTok link. Please use the full URL containing "/video/ID".</div>;
      }
    }
    
    // 4. Instagram Reels/Posts
    if (url.includes('instagram.com')) {
      const cleanUrl = url.split('?')[0].replace(/\/$/, ''); 
      return <iframe src={`${cleanUrl}/embed/`} className="w-full h-full rounded-xl" allowFullScreen />;
    }

    // Fallback for direct video links
    return <video src={url} controls className="w-full h-full object-contain rounded-xl bg-black" />;
  };

  if (loading) return <div className="min-h-screen bg-luxury-white dark:bg-luxury-black flex items-center justify-center text-gold-base text-2xl font-decorative">Loading...</div>;
  if (!apartment) return <div className="min-h-screen bg-luxury-white dark:bg-luxury-black flex flex-col items-center justify-center pt-20"><h2 className="text-3xl font-bold text-black dark:text-white mb-4">Not found</h2><Link to="/apartments" className="text-gold-base hover:underline">Back to listings</Link></div>;

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Link to="/apartments" className="flex items-center gap-2 text-gold-base mb-6 hover:text-gold-light font-semibold text-sm"><ArrowLeft size={16} /> Back to Apartments</Link>
        
        <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gold-base/30 shadow-2xl shine-card">
          
          <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
            <div className="md:col-span-2 h-[300px] md:h-full relative bg-gray-200 dark:bg-black">
              <img src={getMediaUrl(apartment.images[activeImage] || apartment.images[0])} alt="Gallery" className="w-full h-full object-cover" />
              <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                <div className={`font-bold px-4 py-1.5 rounded-md text-sm uppercase tracking-widest shadow-lg ${apartment.listingType === 'SALE' ? 'bg-white text-black' : 'bg-gold-base text-black'}`}>
                  For {apartment.listingType === 'SALE' ? 'Sale' : 'Rent'}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col gap-2 p-2 bg-gray-50 dark:bg-black/20 overflow-y-auto">
              {apartment.images.map((img: string, idx: number) => (
                <img key={idx} src={getMediaUrl(img)} onClick={() => setActiveImage(idx)} className={`w-full h-24 object-cover rounded cursor-pointer transition-all ${activeImage === idx ? 'border-2 border-gold-base opacity-100' : 'opacity-60 hover:opacity-100'}`} />
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              <div>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-black dark:text-white mb-2">{apartment.title}</h1>
                <p className="text-gold-base text-2xl font-bold">{apartment.price.toLocaleString()} ETB {apartment.listingType === 'RENT' && '/ mo'}</p>
              </div>
              <Link to={`/contact?intent=${apartment.listingType === 'SALE' ? 'Buy' : 'Rent'}&title=${encodeURIComponent(apartment.title)}&id=${apartment.id}`} className="bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-bold uppercase tracking-widest py-4 px-10 rounded-md transition-all duration-300 shadow-lg hover:-translate-y-1 text-sm shine-button w-full md:w-auto text-center">
                Inquire Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10 text-center border-y border-gray-200 dark:border-gray-800 py-8">
              <div><Bed className="mx-auto text-gold-base mb-2" /><p className="text-sm text-gray-500 uppercase tracking-widest">Beds</p><p className="text-xl font-bold text-black dark:text-white">{apartment.bedrooms}</p></div>
              <div><Bath className="mx-auto text-gold-base mb-2" /><p className="text-sm text-gray-500 uppercase tracking-widest">Baths</p><p className="text-xl font-bold text-black dark:text-white">{apartment.bathrooms}</p></div>
              <div><Maximize className="mx-auto text-gold-base mb-2" /><p className="text-sm text-gray-500 uppercase tracking-widest">Size</p><p className="text-xl font-bold text-black dark:text-white">{apartment.sizeSqm} sqm</p></div>
            </div>

            <div className="mb-10">
              <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-4">Description</h3>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-lg font-light">{apartment.description}</p>
            </div>

            {apartment.videoUrl && (
              <div className="mb-10 border-t border-gray-200 dark:border-gray-800 pt-10">
                <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <PlayCircle className="text-gold-base"/> Property Video Tour
                </h3>
                <div className="w-full h-[400px] md:h-[500px] bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                  {getVideoEmbed(apartment.videoUrl)}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
               <h4 className="font-bold text-black dark:text-white mb-4 uppercase tracking-wider text-sm">Included Amenities</h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium"><CheckCircle2 size={16} className="text-gold-base"/> Infinity Pool</span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium"><CheckCircle2 size={16} className="text-gold-base"/> Private Gym</span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium"><CheckCircle2 size={16} className="text-gold-base"/> 24/7 Security</span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium"><CheckCircle2 size={16} className="text-gold-base"/> Backup Generator</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}