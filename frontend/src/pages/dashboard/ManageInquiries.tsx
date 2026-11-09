import { useState, useEffect } from 'react';
import { getAllInquiries, updateInquiryStatus } from '../../api/inquiry.api';
import { Mail, Phone, Calendar, CheckCircle2, MoreVertical } from 'lucide-react';

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try { setInquiries(await getAllInquiries()); } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    } catch (error) { alert('Failed to update'); }
  };

  const getStatusColor = (status: string) => {
    if (status === 'NEW') return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
    if (status === 'CONTACTED') return 'bg-gold-base/10 text-gold-dark dark:text-gold-base border-gold-base/30';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
  };

  if (loading) return <div className="text-gold-base animate-pulse text-xl">Loading Inbox...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-decorative font-bold text-black dark:text-white">Inbox</h1>
        <p className="text-gray-500 mt-1">Manage customer leads and website inquiries.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-gold-base/30 transition-colors overflow-hidden">
            
            {/* Card Header */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-black/20">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white">{inq.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Mail size={14} /> {inq.email}</span>
                  <span className="flex items-center gap-1"><Phone size={14} /> {inq.phone}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(inq.status)}`}>{inq.status}</span>
                <select 
                  value={inq.status} 
                  onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                  className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-sm rounded-lg p-2 text-black dark:text-white focus:outline-none focus:border-gold-base"
                >
                  <option value="NEW">Mark as New</option>
                  <option value="CONTACTED">Mark as Contacted</option>
                  <option value="CLOSED">Mark as Closed</option>
                </select>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                "{inq.message}"
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(inq.createdAt).toLocaleString()}</span>
                <span className="bg-gold-base/10 text-gold-base px-2 py-1 rounded">Intent: {inq.intent}</span>
                {inq.apartment && (
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle2 size={14}/> Interested in: {inq.apartment.title}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="bg-white dark:bg-[#111] p-16 rounded-xl text-center border border-gray-200 dark:border-gray-800">
            <Mail size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">Your inbox is clear</h3>
            <p className="text-gray-500">New inquiries from the website will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}