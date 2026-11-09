import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllApartments, createApartment } from '../api/apartment.api';

interface Apartment {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  status: string;
}

export default function Dashboard() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [description, setDescription] = useState('');
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
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"]
      });

      alert('Apartment added successfully!');
      setIsAdding(false);
      fetchApartments(); // Refresh list
      
      // Clear form
      setTitle(''); setPrice(''); setBedrooms(''); setDescription('');
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
    <div className="min-h-screen bg-luxury-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-gold/30 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gold mt-1">Welcome back, {user.name || 'Admin'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#111] p-6 rounded-lg border border-gold/20">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total Units</h3>
            <p className="text-4xl font-bold text-white mt-2">{apartments.length}</p>
          </div>
          <div className="bg-[#111] p-6 rounded-lg border border-gold/20">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Available</h3>
            <p className="text-4xl font-bold text-green-500 mt-2">
              {apartments.filter(a => a.status === 'AVAILABLE').length}
            </p>
          </div>
          <div className="bg-[#111] p-6 rounded-lg border border-gold/20">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total Rent Value</h3>
            <p className="text-4xl font-bold text-gold mt-2">
              {apartments.reduce((sum, a) => sum + a.price, 0).toLocaleString()} ETB
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage Apartments</h2>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-gold hover:bg-gold-light text-luxury-black px-4 py-2 rounded-md font-bold transition-colors"
          >
            {isAdding ? 'Cancel' : '+ Add New Apartment'}
          </button>
        </div>

        {/* Add Form */}
        {isAdding && (
          <form onSubmit={handleAddApartment} className="bg-[#111] p-6 rounded-lg border border-gold/30 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Title (e.g., Luxury 2-Bedroom)" value={title} onChange={e => setTitle(e.target.value)} required className="bg-black border border-gray-700 p-3 rounded text-white focus:border-gold" />
            <input type="number" placeholder="Price (ETB)" value={price} onChange={e => setPrice(e.target.value)} required className="bg-black border border-gray-700 p-3 rounded text-white focus:border-gold" />
            <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={e => setBedrooms(e.target.value)} required className="bg-black border border-gray-700 p-3 rounded text-white focus:border-gold" />
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="bg-black border border-gray-700 p-3 rounded text-white focus:border-gold" />
            <button type="submit" className="md:col-span-2 bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-colors">Save Apartment</button>
          </form>
        )}

        {/* Table */}
        {loading ? (
          <p className="text-gold animate-pulse">Loading data...</p>
        ) : (
          <div className="bg-[#111] rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-black text-gold border-b border-gray-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Bedrooms</th>
                  <th className="p-4">Price (ETB)</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{apt.title}</td>
                    <td className="p-4">{apt.bedrooms}</td>
                    <td className="p-4 text-gold">{apt.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {apartments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No apartments found. Add one above!</td>
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