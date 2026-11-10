import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApartmentById } from '../api/apartment.api';
import { 
  Bed, Bath, Maximize, CheckCircle2, ArrowLeft, PlayCircle, 
  ChevronLeft, ChevronRight, X, MapPin, Car 
} from 'lucide-react';

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Gallery State
  const [processedImages, setProcessedImages] = useState<{url: string, category: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredImages, setFilteredImages] = useState<{url: string, category: string}[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const fetchApartment = async () => {
      if (!id) return;
      try {
        const data = await getApartmentById(id);
        setApartment(data);

        // Handle the JSON format for images
        let formattedImages: {url: string, category: string}[] = [];
        if (Array.isArray(data.images)) {
           formattedImages = data.images.map((img: any) => 
            typeof img === 'string' ? { url: img, category: 'General' } : img
          );
        }
        setProcessedImages(formattedImages);
        setFilteredImages(formattedImages);
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchApartment();
  }, [id]);

  // Auto-slide effect (pauses when user manually clicks an arrow)
  useEffect(() => {
    if (filteredImages.length <= 1) return; 
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Slower, more luxurious slide (5 seconds)
    return () => clearInterval(interval);
  }, [filteredImages]);

  const nextSlide = () => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  // Handle Category Filter Change
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredImages(processedImages);
    } else {
      setFilteredImages(processedImages.filter(img => img.category === category));
    }
    setCurrentImageIndex(0); 
  };

  // Prevent scrolling when video modal is open
  useEffect(() => {
    document.body.style.overflow = isVideoModalOpen ? 'hidden' : 'unset';
  }, [isVideoModalOpen]);

  const getMediaUrl = (url: string) => {
    if (url && url.startsWith('/uploads')) return `http://localhost:5000${url}`;
    return url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
  };

  const getVideoEmbed = (url: string) => {
    if (!url) return null;
    if (url.startsWith('/uploads') || url.endsWith('.mp4')) return <video src={getMediaUrl(url)} controls autoPlay className="w-full h-full object-contain" />;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} className="w-full h-full" allowFullScreen />;
    }
    if (url.includes('tiktok.com')) {
      const videoIdMatch = url.match(/\/video\/(\d+)/);
      if (videoIdMatch) return <iframe src={`https://www.tiktok.com/player/v1/${videoIdMatch[1]}?autoplay=1`} className="w-full h-full" allowFullScreen />;
    }
    if (url.includes('instagram.com')) {
      const cleanUrl = url.split('?')[0].replace(/\/$/, ''); 
      return <iframe src={`${cleanUrl}/embed/`} className="w-full h-full" allowFullScreen />;
    }
    return null;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-luxury-white dark:bg-luxury-black text-gold-base font-sans font-bold uppercase tracking-widest">Loading...</div>;
  if (!apartment) return <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-white dark:bg-luxury-black pt-20"><h2 className="text-2xl font-sans font-bold text-black dark:text-white mb-4">Not found</h2><Link to="/apartments" className="text-gold-base font-sans text-sm hover:underline">Back to listings</Link></div>;

  // Extract unique categories for the filter buttons
  const categories = ['All', ...Array.from(new Set(processedImages.map((img: any) => img.category)))];

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-28 pb-24 px-4 transition-colors duration-300 relative">
      
      {/* VIDEO MODAL */}
      {isVideoModalOpen && apartment.videoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-6 right-6 text-white hover:text-gold-base bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50"><X size={24} /></button>
          <div className="w-full max-w-5xl h-[80vh] md:h-[90vh] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {getVideoEmbed(apartment.videoUrl)}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <Link to="/apartments" className="flex items-center gap-2 text-gold-base mb-6 hover:text-gold-light font-sans font-bold text-xs uppercase tracking-wider w-fit"><ArrowLeft size={16} /> Back to Apartments</Link>
        
        <div className="bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gold-base/20 shadow-2xl">
          
          {/* IMAGE SLIDER WITH CATEGORIES */}
          <div className="relative w-full bg-gray-100 dark:bg-black pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full group overflow-hidden">
              
              {filteredImages.length > 0 ? (
                <img 
                  src={getMediaUrl(filteredImages[currentImageIndex]?.url)} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-opacity duration-500" 
                />
              ) : (
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Fallback" className="w-full h-full object-cover" />
              )}
              
              {/* Top Left Badges */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-col gap-2 items-start z-10">
                <div className={`font-sans font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-[10px] sm:text-xs uppercase tracking-widest shadow-lg backdrop-blur-md ${apartment.listingType === 'SALE' ? 'bg-white/90 text-black' : 'bg-gold-base/90 text-black'}`}>
                  For {apartment.listingType === 'SALE' ? 'Sale' : 'Rent'}
                </div>
                {filteredImages.length > 0 && (
                  <div className="bg-black/60 backdrop-blur-md text-white font-sans text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 rounded-md border border-white/20 shadow-lg uppercase tracking-widest">
                    {filteredImages[currentImageIndex]?.category}
                  </div>
                )}
              </div>

              {/* Slider Arrows (Visible on Hover on Desktop, always visible on mobile) */}
              {filteredImages.length > 1 && (
                <>
                  <button onClick={prevSlide} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gold-base text-white hover:text-black p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10 md:opacity-0 group-hover:opacity-100">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextSlide} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gold-base text-white hover:text-black p-2 sm:p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10 md:opacity-0 group-hover:opacity-100">
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white font-sans text-xs px-3 py-1 rounded-full border border-white/20 z-10">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center px-4 mt-4">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full font-sans font-bold uppercase tracking-widest text-[9px] sm:text-[10px] transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-gold-base text-black shadow-md' 
                      : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="p-5 sm:p-8 md:p-12 relative z-10">
            
            {/* Title & Buttons */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-10 gap-6 border-b border-gray-100 dark:border-gray-800 pb-6 sm:pb-8">
              <div>
                <h1 className="font-decorative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-2 sm:mb-3 leading-tight">{apartment.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-sans text-xs sm:text-sm font-medium">
                  <span className="flex items-center gap-1"><MapPin size={16} className="text-gold-base" /> Bole Rwanda, Addis Ababa</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {apartment.videoUrl && (
                  <button onClick={() => setIsVideoModalOpen(true)} className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white hover:border-gold-base hover:text-gold-base font-sans font-bold uppercase tracking-widest py-3 px-6 rounded-md transition-all duration-300 text-[10px] sm:text-xs w-full sm:w-auto">
                    <PlayCircle size={18} /> Watch Video
                  </button>
                )}
                <Link to={`/contact?intent=${apartment.listingType === 'SALE' ? 'Buy' : 'Rent'}&title=${encodeURIComponent(apartment.title)}&id=${apartment.id}`} className="bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-sans font-bold uppercase tracking-widest py-3.5 px-6 sm:px-8 rounded-md transition-all duration-300 shadow-lg hover:-translate-y-1 text-[10px] sm:text-xs shine-button w-full sm:w-auto text-center">
                  Inquire Now
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Left Column: Overview & Details */}
              <div className="lg:col-span-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4">Property Overview</h2>
                {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 and font-normal */}
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-sm sm:text-base font-sans font-normal mb-8 whitespace-pre-line">
                  {apartment.description}
                </p>
                
                <h3 className="font-serif text-lg sm:text-xl font-bold text-black dark:text-white mb-4 mt-8">Property Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                   <div>
                     <p className="text-[9px] sm:text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Price</p>
                     <p className="text-gold-base text-sm sm:text-lg font-sans font-bold">{apartment.price.toLocaleString()} ETB {apartment.listingType === 'RENT' && '/ mo'}</p>
                   </div>
                   <div>
                     <p className="text-[9px] sm:text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Property Type</p>
                     <p className="text-black dark:text-white text-xs sm:text-sm font-sans font-medium">Apartment</p>
                   </div>
                   <div>
                     <p className="text-[9px] sm:text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Status</p>
                     <p className="text-black dark:text-white text-xs sm:text-sm font-sans font-medium">{apartment.status}</p>
                   </div>
                   <div>
                     <p className="text-[9px] sm:text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Listing ID</p>
                     <p className="text-black dark:text-white text-xs sm:text-sm font-sans font-medium">#GV-{apartment.id.slice(0,4).toUpperCase()}</p>
                   </div>
                </div>
              </div>

              {/* Right Column: Features Sidebar */}
              <div className="bg-gray-50 dark:bg-black/30 p-6 rounded-xl border border-gray-100 dark:border-white/5 h-fit mt-6 lg:mt-0">
                <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-5 border-b border-gray-200 dark:border-gray-800 pb-2">Features</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 bg-gold-base/10 text-gold-base rounded-lg"><Bed size={20} className="sm:w-6 sm:h-6" /></div>
                    <div>
                      <p className="text-lg sm:text-xl font-sans font-bold text-black dark:text-white">{apartment.bedrooms}</p>
                      <p className="text-[9px] sm:text-[10px] font-sans text-gray-500 uppercase tracking-widest">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 bg-gold-base/10 text-gold-base rounded-lg"><Bath size={20} className="sm:w-6 sm:h-6" /></div>
                    <div>
                      <p className="text-lg sm:text-xl font-sans font-bold text-black dark:text-white">{apartment.bathrooms}</p>
                      <p className="text-[9px] sm:text-[10px] font-sans text-gray-500 uppercase tracking-widest">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 bg-gold-base/10 text-gold-base rounded-lg"><Maximize size={20} className="sm:w-6 sm:h-6" /></div>
                    <div>
                      <p className="text-lg sm:text-xl font-sans font-bold text-black dark:text-white">{apartment.sizeSqm}</p>
                      <p className="text-[9px] sm:text-[10px] font-sans text-gray-500 uppercase tracking-widest">Sqm Area</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 bg-gold-base/10 text-gold-base rounded-lg"><Car size={20} className="sm:w-6 sm:h-6" /></div>
                    <div>
                      <p className="text-lg sm:text-xl font-sans font-bold text-black dark:text-white">1</p>
                      <p className="text-[9px] sm:text-[10px] font-sans text-gray-500 uppercase tracking-widest">Parking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
               <h2 className="font-serif text-xl sm:text-2xl font-bold text-black dark:text-white mb-5 sm:mb-6">Included Amenities</h2>
               {/* FIXED TEXT CONTRAST: Changed to text-gray-800 dark:text-gray-300 */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8">
                  <span className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-xs sm:text-sm font-sans font-medium"><CheckCircle2 size={16} className="text-gold-base shrink-0"/> Infinity Pool</span>
                  <span className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-xs sm:text-sm font-sans font-medium"><CheckCircle2 size={16} className="text-gold-base shrink-0"/> Private Gym</span>
                  <span className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-xs sm:text-sm font-sans font-medium"><CheckCircle2 size={16} className="text-gold-base shrink-0"/> 24/7 Security</span>
                  <span className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-xs sm:text-sm font-sans font-medium"><CheckCircle2 size={16} className="text-gold-base shrink-0"/> Backup Generator</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}