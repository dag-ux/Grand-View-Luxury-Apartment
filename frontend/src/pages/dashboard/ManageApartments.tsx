import { useState, useEffect } from 'react';
import { getAllApartments, createApartment, updateApartment, deleteApartment } from '../../api/apartment.api';
import { Plus, Edit, Trash2, X, Video, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

const CATEGORIES = ['Living Room', 'Bedroom', 'Bathroom', 'Kitchen', 'Closet', 'Balcony', 'Exterior', 'General'];

export default function ManageApartments() {
  const [apartments, setApartments] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '', price: '', bedrooms: '', bathrooms: '2', sizeSqm: '150', description: '', listingType: 'RENT', videoUrl: ''
  });
  
  // Categorized Image State
  const [existingImages, setExistingImages] = useState<{url: string, category: string}[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<{file: File, category: string}[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const fetchApartments = async () => {
    try { setApartments(await getAllApartments()); } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchApartments(); }, []);

  const handleOpenForm = (apt?: any) => {
    if (apt) {
      setEditingId(apt.id);
      setFormData({
        title: apt.title, price: apt.price, bedrooms: apt.bedrooms, bathrooms: apt.bathrooms, 
        sizeSqm: apt.sizeSqm, description: apt.description, listingType: apt.listingType, videoUrl: apt.videoUrl || ''
      });
      // Ensure we handle the JSON array structure
      setExistingImages(Array.isArray(apt.images) ? apt.images : []);
    } else {
      setEditingId(null);
      setFormData({ title: '', price: '', bedrooms: '', bathrooms: '2', sizeSqm: '150', description: '', listingType: 'RENT', videoUrl: '' });
      setExistingImages([]);
    }
    setNewImageFiles([]);
    setVideoFile(null);
    setIsFormOpen(true);
  };

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({ file, category: 'Living Room' }));
      setNewImageFiles([...newImageFiles, ...filesArray]);
    }
  };

  const handleCategoryChange = (index: number, newCategory: string, isExisting: boolean) => {
    if (isExisting) {
      const updated = [...existingImages];
      updated[index].category = newCategory;
      setExistingImages(updated);
    } else {
      const updated = [...newImageFiles];
      updated[index].category = newCategory;
      setNewImageFiles(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    
    data.append('existingImages', JSON.stringify(existingImages));
    data.append('imageCategories', JSON.stringify(newImageFiles.map(img => img.category)));
    newImageFiles.forEach(img => data.append('images', img.file));
    
    if (videoFile) data.append('video', videoFile);

    try {
      if (editingId) await updateApartment(editingId, data);
      else await createApartment(data);
      setIsFormOpen(false);
      fetchApartments();
    } catch (error) { alert('Failed to save apartment'); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this property?')) {
      try { await deleteApartment(id); fetchApartments(); } catch (error) { alert('Failed to delete'); }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-decorative font-bold text-black dark:text-white">Properties</h1>
          <p className="text-gray-500 mt-1">Manage your real estate portfolio.</p>
        </div>
        <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-gold-base hover:bg-gold-light text-black px-5 py-2.5 rounded-lg font-bold transition-colors text-sm uppercase tracking-wider shadow-lg">
          <Plus size={18}/> Add Property
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-[#111] w-full max-w-4xl rounded-2xl border border-gray-200 dark:border-gold-base/30 shadow-2xl relative my-8">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-10"><X size={24}/></button>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
              <h2 className="text-2xl font-serif font-bold text-black dark:text-white mb-6">
                {editingId ? 'Edit Property' : 'Add New Property'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Price (ETB)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Bedrooms</label>
                  <input type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Bathrooms</label>
                  <input type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white mt-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Size (sqm)</label>
                  <input type="number" value={formData.sizeSqm} onChange={e => setFormData({...formData, sizeSqm: e.target.value})} required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white mt-1" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white mt-1 h-24" />
                </div>

                {/* --- CATEGORIZED IMAGE UPLOAD --- */}
                <div className="md:col-span-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-2"><ImageIcon size={14}/> Upload Images & Categorize</label>
                  <input type="file" multiple accept="image/*" onChange={handleAddFiles} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-2 rounded-lg text-black dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gold-base file:text-black" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {existingImages.map((img, i) => (
                      <div key={`existing-${i}`} className="relative bg-gray-100 dark:bg-black/50 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                        <img src={img.url.startsWith('/uploads') ? `http://localhost:5000${img.url}` : img.url} className="w-full h-24 object-cover rounded mb-2" />
                        <select value={img.category} onChange={(e) => handleCategoryChange(i, e.target.value, true)} className="w-full text-xs bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded p-1">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button type="button" onClick={() => setExistingImages(existingImages.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={12}/></button>
                      </div>
                    ))}
                    {newImageFiles.map((img, i) => (
                      <div key={`new-${i}`} className="relative bg-gray-100 dark:bg-black/50 p-2 rounded-lg border border-gold-base/30">
                        <img src={URL.createObjectURL(img.file)} className="w-full h-24 object-cover rounded mb-2" />
                        <select value={img.category} onChange={(e) => handleCategoryChange(i, e.target.value, false)} className="w-full text-xs bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded p-1">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button type="button" onClick={() => setNewImageFiles(newImageFiles.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={12}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Upload */}
                <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-800 pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1"><Video size={14}/> Upload Video</label>
                    <input type="file" accept="video/mp4,video/*" onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-2 rounded-lg text-black dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-200 file:text-black" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1"><LinkIcon size={14}/> Or Video URL</label>
                    <input type="url" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 p-3 rounded-lg text-black dark:text-white" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-gradient-to-r from-gold-dark to-gold-light text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:opacity-90">
                {editingId ? 'Update Property' : 'Save Property'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-800 dark:text-gray-300 min-w-[600px]">
            <thead className="bg-gray-50 dark:bg-black text-gold-base border-b border-gray-200 dark:border-gray-800 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="p-5">Property</th>
                <th className="p-5">Type</th>
                <th className="p-5">Price</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt) => {
                // Safely get the first image URL from the new JSON format
                let firstImg = 'https://via.placeholder.com/150';
                if (Array.isArray(apt.images) && apt.images.length > 0) {
                  const img = apt.images[0];
                  firstImg = typeof img === 'string' ? img : img.url;
                }
                
                return (
                  <tr key={apt.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="p-5 flex items-center gap-4">
                      <img src={firstImg.startsWith('/uploads') ? `http://localhost:5000${firstImg}` : firstImg} alt="thumbnail" className="w-12 h-12 rounded object-cover border border-gray-200 dark:border-gray-700" />
                      <div>
                        <p className="font-semibold text-black dark:text-white">{apt.title}</p>
                        <p className="text-xs text-gray-500">{apt.bedrooms} Beds • {apt.sizeSqm} sqm</p>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${apt.listingType === 'SALE' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-gold-base/20 text-gold-dark dark:text-gold-base'}`}>
                        {apt.listingType}
                      </span>
                    </td>
                    <td className="p-5 text-gold-base font-medium">{apt.price.toLocaleString()} ETB</td>
                    <td className="p-5">
                      <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">{apt.status}</span>
                    </td>
                    <td className="p-5 text-right space-x-2">
                      <button onClick={() => handleOpenForm(apt)} className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gold-base hover:text-black rounded"><Edit size={16}/></button>
                      <button onClick={() => handleDelete(apt.id)} className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white rounded"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}