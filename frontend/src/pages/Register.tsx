import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth.api';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerUser({ name, email, password, role: 'TENANT' });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-luxury-black transition-colors duration-500">
      <div className="w-full flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img src={logo} alt="GrandView Logo" className="h-20 w-20 mx-auto rounded-full mb-6 shadow-xl border border-gold-base/30" />
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2 tracking-tight">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join Grandview Addis</p>
          </div>
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 p-4 mb-6 text-sm flex items-center gap-3">
              <ShieldCheck size={20} className="shrink-0" />{error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-5">
             <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><User size={18} /></div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Mail size={18} /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Lock size={18} /></div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light hover:opacity-90 text-black font-bold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 mt-6">
              {loading ? 'Creating...' : 'Register'}{!loading && <ArrowRight size={20} />}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-gold-base font-semibold hover:text-gold-light transition-colors">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}