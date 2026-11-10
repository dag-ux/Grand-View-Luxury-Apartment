import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth.api';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIXED: h-screen and overflow-hidden keeps the page locked to the viewport
    <div className="h-screen w-full flex bg-white dark:bg-luxury-black transition-colors duration-500 overflow-hidden pt-20 lg:pt-0">
      
      {/* LEFT SIDE: Cinematic Image (Hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-luxury-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent"></div>
        
        {/* Text over image */}
        <div className="relative z-10 flex flex-col justify-end p-16 w-full">
          <span className="text-gold-base tracking-[0.3em] uppercase text-xs font-bold font-sans mb-3 block">Grandview Addis ERP</span>
          <h2 className="text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Manage Your <br/>
            <span className="text-gold-gradient italic">Luxury Portfolio.</span>
          </h2>
          <p className="text-gray-300 text-base max-w-md font-sans font-normal">
            Access your dashboard to manage premium listings, track tenant inquiries, and oversee property operations seamlessly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      {/* FIXED: overflow-y-auto allows scrolling ONLY inside the form area if screen is too small */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="w-full max-w-md my-auto">
          
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logo} alt="GrandView Logo" className="h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-full mb-5 shadow-xl border border-gold-base/30 hover:border-gold-base transition-colors" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">Sign in to your GrandView account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 p-3 sm:p-4 mb-6 text-sm flex items-center gap-3 font-sans font-medium">
              <ShieldCheck size={20} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all font-sans text-sm"
                  placeholder="admin@grandview.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px] sm:text-xs font-bold text-gold-dark dark:text-gold-base hover:text-gold-base dark:hover:text-gold-light transition-colors uppercase tracking-wider">Forgot Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-black dark:text-white transition-all font-sans text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-black font-sans font-bold uppercase tracking-widest text-sm py-3.5 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 mt-6 shine-button"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 font-sans">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-dark dark:text-gold-base font-bold hover:text-gold-base dark:hover:text-gold-light transition-colors uppercase tracking-wider text-xs">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}