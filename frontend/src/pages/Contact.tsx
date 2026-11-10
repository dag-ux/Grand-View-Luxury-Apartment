import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import api from '../api/axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/inquiries', formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-white dark:bg-luxury-black pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-gold-dark dark:text-gold-base tracking-[0.3em] uppercase text-[10px] sm:text-xs font-bold font-sans mb-3 sm:mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-decorative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 sm:mb-6">
            Schedule a <span className="text-gold-gradient italic">Tour</span>
          </h1>
          {/* FIXED TEXT CONTRAST */}
          <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto font-sans text-sm sm:text-base font-normal">
            Contact our sales team to learn more about Grandview Addis or to arrange a private viewing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Contact Info Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="flex items-start gap-4 p-4 sm:p-6 bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-gold-base/30 transition-colors">
              <div className="w-12 h-12 bg-gold-base/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-gold-base" size={24} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-1">Location</h3>
                <p className="text-gray-800 dark:text-gray-300 font-sans text-sm font-normal">Rwanda Street, Bole<br />Addis Ababa, Ethiopia</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 sm:p-6 bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-gold-base/30 transition-colors">
              <div className="w-12 h-12 bg-gold-base/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-gold-base" size={24} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-1">Phone</h3>
                <p className="text-gray-800 dark:text-gray-300 font-sans text-sm font-normal">+251 900 000 000</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 sm:p-6 bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:border-gold-base/30 transition-colors">
              <div className="w-12 h-12 bg-gold-base/10 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-gold-base" size={24} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-black dark:text-white mb-1">Email</h3>
                <p className="text-gray-800 dark:text-gray-300 font-sans text-sm font-normal">info@grandviewaddis.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white dark:bg-[#111] p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl shine-card order-1 lg:order-2">
            {status === 'success' ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2 font-serif">Message Sent!</h3>
                <p className="text-gray-800 dark:text-gray-300 font-sans">Thank you for your interest. Our team will contact you shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-gold-base font-sans font-bold hover:text-gold-dark dark:hover:text-gold-light transition-colors uppercase tracking-widest text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-wider">Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-3.5 text-black dark:text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base transition-colors font-sans" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-wider">Email Address</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-3.5 text-black dark:text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base transition-colors font-sans" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-3.5 text-black dark:text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base transition-colors font-sans" placeholder="+251 900 000 000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-wider">Message</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg p-3.5 text-black dark:text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base transition-colors font-sans resize-none" placeholder="I am interested in a 3-bedroom apartment..."></textarea>
                </div>
                {status === 'error' && <p className="text-red-500 text-sm font-sans font-bold">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-sans font-bold uppercase tracking-widest py-4 rounded-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 shine-button mt-4">
                  {status === 'loading' ? 'Sending...' : 'Send Message'} <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}