import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Apartments from './pages/Apartments';
import ApartmentDetail from './pages/ApartmentDetail';
import Amenities from './pages/Amenities'; // <-- NEW
import Contact from './pages/Contact'; // <-- NEW

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-luxury-white dark:bg-luxury-black text-black dark:text-white font-sans transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/apartments/:id" element={<ApartmentDetail />} />
            <Route path="/amenities" element={<Amenities />} /> {/* <-- NEW */}
            <Route path="/contact" element={<Contact />} /> {/* <-- NEW */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;