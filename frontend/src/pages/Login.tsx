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
    <div className="min-h-screen flex bg-white dark:bg-luxury-black transition-colors duration-500">
      
      {/* LEFT SIDE: Cinematic Image & Quote (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-luxury-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent"></div>
        
        {/* Text over image */}
        <div className="relative z-10 flex flex-col justify-end p-16 w-full">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Manage Your <br/>
            <span className="text-gold-gradient">Luxury Portfolio.</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-md">
            Access your dashboard to manage premium listings, track tenant inquiries, and oversee property operations seamlessly.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-md">
          
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <img src={logo} alt="GrandView Logo" className="h-20 w-20 mx-auto rounded-full mb-6 shadow-xl border border-gold-base/30" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your GrandView account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 p-4 mb-6 text-sm flex items-center gap-3">
              <ShieldCheck size={20} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-gray-900 dark:text-white transition-all"
                  placeholder="admin@grandview.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                <a href="#" className="text-xs font-semibold text-gold-base hover:text-gold-light transition-colors">Forgot Password?</a>
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
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base text-gray-900 dark:text-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light hover:opacity-90 text-luxury-black font-bold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 mt-4"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-base font-semibold hover:text-gold-light transition-colors">
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}