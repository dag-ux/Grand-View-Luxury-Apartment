import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Users, FileText, 
  MessageSquare, Settings, LogOut, Menu, X 
} from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Define the menu items for the ERP
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Apartments', path: '/dashboard/apartments', icon: <Building2 size={20} /> },
    { name: 'Inquiries', path: '/dashboard/inquiries', icon: <MessageSquare size={20} /> },
    { name: 'Tenants', path: '/dashboard/tenants', icon: <Users size={20} /> },
    { name: 'Leases', path: '/dashboard/leases', icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-gold-base/20 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}>
        
        {/* Logo Area */}
        <div className="h-24 flex items-center px-6 border-b border-gray-200 dark:border-gold-base/10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-full border border-gold-base/30" />
            <div className="flex flex-col">
              <span className="font-serif text-black dark:text-white font-bold text-lg tracking-widest uppercase leading-none">
                Grand<span className="text-gold-gradient">View</span>
              </span>
              <span className="text-[8px] text-gold-base tracking-[0.2em] uppercase font-bold mt-1">ERP System</span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-gold-base/10 text-gold-base border-r-2 border-gold-base' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gold-base/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar (Mobile Menu Toggle) */}
        <header className="h-24 bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-gold-base/20 flex items-center justify-between px-6 md:hidden">
          <span className="font-serif text-black dark:text-white font-bold text-xl">ERP</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-gray-300">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* The Outlet renders the specific dashboard page (e.g., Overview, Apartments) */}
          <Outlet /> 
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
}