import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Assuming you saved your logo as logo.png in the public folder */}
      <img 
        src="/logo.png" 
        alt="Grand View Logo" 
        className="w-48 h-48 rounded-full mb-8 shadow-2xl shadow-gold/20" 
      />
      
      <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4 text-center">
        Grand View Luxury Apartments
      </h1>
      
      <p className="mb-8 text-center max-w-lg opacity-80">
        Experience unparalleled luxury in Bole Rwanda, Addis Ababa.
      </p>

      <ThemeToggle />
    </div>
  );
}

export default App;