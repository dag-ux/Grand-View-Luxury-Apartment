import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllApartments, createApartment } from '../api/apartment.api';
import { LogOut, Plus } from 'lucide-react';

interface Apartment {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  status: string;
  listingType: string;
}

export default function Dashboard() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [description, setDescription] = useState('');
  const [listingType, setListingType] = useState('RENT'); // NEW
  const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchApartments();
  }, [navigate]);

  const fetchApartments = async () => {
    try {
      const data = await getAllApartments();
      setApartments(data);
    } catch (error) {
      console.error('Error fetching apartments', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApartment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createApartment({
        title,
        description,
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: 2,
        sizeSqm: 150,
        listingType, // Send the Rent/Sale type
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"]
      });

      alert('Apartment added successfully!');
      setIsAdding(false);
      fetchApartments(); 
      
      // Clear form
      setTitle(''); setPrice(''); setBedrooms(''); setDescription(''); setListingType('RENT');
    } catch (error: any) {
      console.error('Error adding apartment', error);
      alert(`Failed to add apartment: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] pt-32 pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-10 border-b border-gray-300 dark:border-gold-base/30 pb-6">
          <div>
            <h1 className="text-3xl font-decorative font-bold text-black dark:text-white">Admin Dashboard</h1>
            <p className="text-gold-base mt-1 font-medium">Welcome back, {user.name || 'Admin'}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 transition-colors font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Units</h3>
            <p className="text-4xl font-bold text-black dark:text-white mt-2">{apartments.length}</p>
          </div>
          <div className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Available</h3>
            <p className="text-4xl font-bold text-green-600 dark:text-green-500 mt-2">{apartments.filter(a => a.status === 'AVAILABLE').length}</p>
          </div>
          <div className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Rent Value</h3>
            <p className="text-4xl font-bold text-gold-base mt-2">{apartments.reduce((sum, a) => sum + a.price, 0).toLocaleString()} ETB</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-black dark:text-white">Manage Apartments</h2>
          <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-gold-base hover:bg-gold-light text-black px-4 py-2 rounded-md font-bold transition-colors text-sm uppercase tracking-wider shine-button">
            {isAdding ? 'Cancel' : <><Plus size={16}/> Add New</>}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddApartment} className="bg-white dark:bg-[#111] p-6 rounded-lg border border-gray-200 dark:border-gold-base/30 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-xl">
            <input type="text" placeholder="Title (e.g., Luxury 2-Bedroom)" value={title} onChange={e => setTitle(e.target.value)} required className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded text-black dark:text-white focus:border-gold-base focus:outline-none" />
            
            <input type="number" placeholder="Price (ETB)" value={price} onChange={e => setPrice(e.target.value)} required className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded text-black dark:text-white focus:border-gold-base focus:outline-none" />
            
            <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={e => setBedrooms(e.target.value)} required className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded text-black dark:text-white focus:border-gold-base focus:outline-none" />
            
            {/* NEW: Listing Type Dropdown */}
            <select 
              value={listingType} 
              onChange={e => setListingType(e.target.value)} 
              className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded text-black dark:text-white focus:border-gold-base focus:outline-none"
            >
              <option value="RENT">For Rent</option>
              <option value="SALE">For Sale</option>
            </select>

            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="md:col-span-2 bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded text-black dark:text-white focus:border-gold-base focus:outline-none" />
            
            <button type="submit" className="md:col-span-2 bg-gradient-to-r from-gold-dark to-gold-light text-black font-bold uppercase tracking-widest py-3 rounded hover:opacity-90 transition-opacity">Save Apartment</button>
          </form>
        )}

        {loading ? (
          <p className="text-gold-base animate-pulse">Loading data...</p>
        ) : (
          <div className="bg-white dark:bg-[#111] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <table className="w-full text-left text-gray-800 dark:text-gray-300">
              <thead className="bg-gray-100 dark:bg-black text-gold-base border-b border-gray-200 dark:border-gray-800 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Bedrooms</th>
                  <th className="p-4">Price (ETB)</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-black dark:text-white">{apt.title}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${apt.listingType === 'SALE' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-gold-base/20 text-gold-dark dark:text-gold-base'}`}>
                        {apt.listingType}
                      </span>
                    </td>
                    <td className="p-4">{apt.bedrooms}</td>
                    <td className="p-4 text-gold-base font-medium">{apt.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {apartments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">No apartments found. Add one above!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}