import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth.api';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // NEW
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
    // FIXED: removed h-screen and overflow-hidden. Using min-h-screen and pt-24
    <div className="min-h-screen w-full flex bg-white dark:bg-luxury-black transition-colors duration-500 pt-20 md:pt-24">
      
      {/* LEFT SIDE: Cinematic Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-luxury-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-end p-12 lg:p-16 w-full">
          <span className="text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-3 block">Grandview Addis Portal</span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Join the <br/>
            <span className="text-gold-gradient italic">Grandview Community.</span>
          </h2>
          <p className="text-gray-300 text-sm lg:text-base max-w-md font-sans font-normal">
            Create your account to manage your lease, view invoices, and submit maintenance requests seamlessly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md py-8">
          
          <div className="text-center mb-6">
            <Link to="/">
              <img src={logo} alt="GrandView Logo" className="h-14 w-14 sm:h-16 sm:w-16 mx-auto rounded-full mb-3 shadow-xl border border-gold-base/30 hover:border-gold-base transition-colors" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-black dark:text-white mb-2 tracking-tight">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400 font-sans text-xs sm:text-sm">Join Grandview Addis</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 p-3 sm:p-4 mb-4 text-xs sm:text-sm flex items-center gap-3 font-sans font-medium">
              <ShieldCheck size={18} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5">
            
            <div>
              <label className="block text-[11px] font-bold text-gray-800 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all font-sans text-sm" 
                  placeholder="John Doe" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-800 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all font-sans text-sm" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-800 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all font-sans text-sm" 
                  placeholder="••••••••" 
                />
                {/* SHOW PASSWORD TOGGLE */}
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gold-base transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-sans font-bold uppercase tracking-widest text-xs sm:text-sm py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 mt-5 shine-button"
            >
              {loading ? 'Creating Account...' : 'Register'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-dark dark:text-gold-base font-bold hover:text-gold-base dark:hover:text-gold-light transition-colors uppercase tracking-wider text-[11px]">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}