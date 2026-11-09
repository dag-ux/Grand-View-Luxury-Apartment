import { useState, useEffect } from 'react';
import { getAllApartments } from '../../api/apartment.api';
import { getAllInquiries } from '../../api/inquiry.api';
import { Building2, Users, Banknote, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminOverview() {
  const [apartments, setApartments] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    getAllApartments().then(setApartments).catch(console.error);
    getAllInquiries().then(setInquiries).catch(console.error);
  }, []);

  const totalValue = apartments.reduce((sum, a) => sum + a.price, 0);
  const availableUnits = apartments.filter(a => a.status === 'AVAILABLE').length;
  const newInquiries = inquiries.filter(i => i.status === 'NEW').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-decorative font-bold text-black dark:text-white">Dashboard Overview</h1>
        <p className="text-gold-base mt-1 font-medium">Welcome back, {user.name} <span className="text-gray-400 text-sm">({user.role})</span></p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Units</h3>
              <p className="text-3xl font-bold text-black dark:text-white mt-2">{apartments.length}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><Building2 size={24} /></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Available</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-500 mt-2">{availableUnits}</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400"><Users size={24} /></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Value</h3>
              <p className="text-2xl font-bold text-gold-base mt-2">{totalValue.toLocaleString()} ETB</p>
            </div>
            <div className="p-3 bg-gold-base/10 rounded-lg text-gold-base"><Banknote size={24} /></div>
          </div>
        </div>

        <Link to="/dashboard/inquiries" className="bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-gold-base/50 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">New Inquiries</h3>
              <p className="text-3xl font-bold text-black dark:text-white mt-2">{newInquiries}</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400"><MessageSquare size={24} /></div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2"><TrendingUp size={20} className="text-gold-base"/> Recent Inquiries</h3>
            <Link to="/dashboard/inquiries" className="text-sm text-gold-base hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {inquiries.slice(0, 3).map(inq => (
              <div key={inq.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-black/30 rounded-lg">
                <div>
                  <p className="font-bold text-black dark:text-white text-sm">{inq.name}</p>
                  <p className="text-xs text-gray-500 truncate w-48">{inq.message}</p>
                </div>
                <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${inq.status === 'NEW' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>{inq.status}</span>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-gray-500 text-sm">No recent inquiries.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}