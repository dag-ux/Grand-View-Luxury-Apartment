import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Apartments from './pages/Apartments';
import ApartmentDetail from './pages/ApartmentDetail';
import Amenities from './pages/Amenities';
import Contact from './pages/Contact';
import About from './pages/About'; // Imported the new About page

// Dashboard Pages
import DashboardLayout from './components/DashboardLayout';
import AdminOverview from './pages/dashboard/AdminOverview';
import ManageApartments from './pages/dashboard/ManageApartments';
import ManageInquiries from './pages/dashboard/ManageInquiries';

// --- PUBLIC LAYOUT ---
// This automatically adds the Navbar and Footer to all public pages
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-luxury-white dark:bg-luxury-black text-black dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      {/* Changed flex-grow to grow to fix the VS Code warning */}
      <main className="grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/apartments/:id" element={<ApartmentDetail />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* --- PRIVATE ERP DASHBOARD ROUTES --- */}
        {/* The DashboardLayout has its own Sidebar, so it doesn't use the PublicLayout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="apartments" element={<ManageApartments />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          
          {/* Placeholders for future pages */}
          <Route path="tenants" element={<div className="p-10 text-2xl font-bold dark:text-white">Tenants Page (Coming Soon)</div>} />
          <Route path="leases" element={<div className="p-10 text-2xl font-bold dark:text-white">Leases Page (Coming Soon)</div>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;