import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Public Navbar
import Footer from './components/Footer'; // Public Footer

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Apartments from './pages/Apartments';
import ApartmentDetail from './pages/ApartmentDetail';
import Amenities from './pages/Amenities';
import Contact from './pages/Contact';

// Dashboard Pages
import DashboardLayout from './components/DashboardLayout';
import AdminOverview from './pages/dashboard/AdminOverview';
import ManageApartments from './pages/dashboard/ManageApartments';
import ManageInquiries from './pages/dashboard/ManageInquiries';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen bg-luxury-white dark:bg-luxury-black text-black dark:text-white font-sans transition-colors duration-300">
            <Navbar />
            <main className="flex-grow"><Home /></main>
            <Footer />
          </div>
        } />
        <Route path="/login" element={<><Navbar /><main className="flex-grow"><Login /></main><Footer /></>} />
        <Route path="/register" element={<><Navbar /><main className="flex-grow"><Register /></main><Footer /></>} />
        <Route path="/apartments" element={<><Navbar /><main className="flex-grow"><Apartments /></main><Footer /></>} />
        <Route path="/apartments/:id" element={<><Navbar /><main className="flex-grow"><ApartmentDetail /></main><Footer /></>} />
        <Route path="/amenities" element={<><Navbar /><main className="flex-grow"><Amenities /></main><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><main className="flex-grow"><Contact /></main><Footer /></>} />

        {/* --- PRIVATE ERP DASHBOARD ROUTES --- */}
        {/* The Layout wraps all dashboard pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminOverview />} />           {/* /dashboard */}
          <Route path="apartments" element={<ManageApartments />} /> {/* /dashboard/apartments */}
          
          {/* Placeholders for future pages */}
         <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="tenants" element={<div className="text-black dark:text-white p-10 text-2xl font-bold">Tenants Page (Coming Soon)</div>} />
          <Route path="leases" element={<div className="text-black dark:text-white p-10 text-2xl font-bold">Leases Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;