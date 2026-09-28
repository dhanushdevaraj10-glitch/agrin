import { useState } from 'react';
import { Leaf, CloudRain, ShieldAlert, Navigation, Settings, Globe } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Advisory } from './pages/Advisory';
import { CropHealth } from './pages/CropHealth';
import { Soil } from './pages/Soil';
import { Satellite } from './pages/Satellite';
import { Cooperation } from './pages/Cooperation';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon issue in React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const Navbar = () => (
  <nav className="bg-forest text-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-leaf mr-2" />
          <span className="font-bold text-xl tracking-tight">AgriN</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-leaf transition-colors">Dashboard</Link>
          <Link to="/advisory" className="hover:text-leaf transition-colors">Agro-Advisory</Link>
          <Link to="/crop-health" className="hover:text-leaf transition-colors">Crop Health</Link>
          <Link to="/soil" className="hover:text-leaf transition-colors">Soil Intelligence</Link>
          <Link to="/satellite" className="hover:text-leaf transition-colors">Satellite</Link>
          <Link to="/cooperation" className="hover:text-leaf transition-colors">Cooperation</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Globe className="h-5 w-5 cursor-pointer hover:text-leaf" />
          <Link to="/advisory" className="flex items-center space-x-2 bg-leaf px-4 py-2 rounded-full cursor-pointer hover:bg-opacity-80 transition text-white">
            <span className="text-sm font-medium">Get Advisory</span>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative bg-white overflow-hidden flex flex-col lg:flex-row">
    <div className="w-full lg:w-1/2">
      <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
        <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
              <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
              AGRIN INTELLIGENCE NETWORK ONLINE
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-charcoal sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Intelligence for</span>{' '}
              <span className="block text-leaf xl:inline">Every Field.</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              AgriN combines satellite intelligence, soil health, weather forecasting and AI-powered crop diagnostics to deliver localized recommendations for climate-resilient and regenerative farming.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link to="/advisory" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-leaf hover:bg-forest transition-colors md:py-4 md:text-lg md:px-10">
                  Get My Farm Advisory
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/satellite" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-leaf bg-green-50 hover:bg-green-100 transition-colors md:py-4 md:text-lg md:px-10">
                  Explore Intelligence
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative z-0">
      <MapContainer 
        center={[11.0168, 76.9558]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=6BBoUOFAv8iyRKC9jHun"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
        />
        <Marker position={[11.0168, 76.9558]}>
          <Popup>
            <strong>AgriN Hub</strong><br/>Coimbatore Node
          </Popup>
        </Marker>
        <Circle center={[11.0168, 76.9558]} pathOptions={{ fillColor: '#4C8B3E', color: '#4C8B3E' }} radius={800} />
      </MapContainer>
    </div>
  </div>
);

const Features = () => (
  <div className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-charcoal tracking-tight sm:text-4xl">
          One platform. Multiple intelligence layers.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Satellite Intelligence", desc: "Monitor field health with NDVI and crop stress indicators.", icon: <Globe className="h-6 w-6" /> },
          { title: "Soil Intelligence", desc: "Track organic carbon, pH, and nutrient balances.", icon: <ShieldAlert className="h-6 w-6" /> },
          { title: "Weather Intelligence", desc: "Localized hyper-accurate climate forecasts.", icon: <CloudRain className="h-6 w-6" /> },
          { title: "Crop Health", desc: "AI-powered disease detection from field images.", icon: <Leaf className="h-6 w-6" /> },
          { title: "AI Advisory", desc: "Actionable recommendations combining all data layers.", icon: <Navigation className="h-6 w-6" /> },
          { title: "Regenerative Farming", desc: "Action plans for improving long-term farm resilience.", icon: <Settings className="h-6 w-6" /> }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-forest mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  const [demoMode, setDemoMode] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        
        {/* Demo Mode Toggle */}
        <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2 flex justify-between items-center text-sm">
          <span className="text-yellow-800 font-medium">
            {demoMode ? '🟢 DEMO MODE ACTIVE (Simulated Data)' : '⚪ LIVE MODE (Requires APIs)'}
          </span>
          <button 
            onClick={() => setDemoMode(!demoMode)}
            className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-md text-yellow-900 font-bold transition-colors"
          >
            Toggle Demo Mode
          </button>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              
              <div className="bg-forest text-white py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">From Local Farms to Shared Intelligence</h2>
                <p className="max-w-2xl mx-auto text-green-100 mb-8">
                  AgriN connects local agricultural intelligence with a cooperative digital architecture — helping farmers act on real-world conditions while enabling reusable models, data standards and climate knowledge across borders.
                </p>
                <Link to="/cooperation" className="inline-block bg-white text-forest px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
                  Explore AgriN Architecture
                </Link>
              </div>
            </>
          } />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/crop-health" element={<CropHealth />} />
          <Route path="/soil" element={<Soil />} />
          <Route path="/satellite" element={<Satellite />} />
          <Route path="/cooperation" element={<Cooperation />} />
        </Routes>
        
        <footer className="bg-charcoal text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-4 text-white">
              <Leaf className="h-6 w-6 mr-2 text-leaf" />
              <span className="font-bold text-xl">AgriN</span>
            </div>
            <p className="mb-4">Regenerative Agricultural Intelligence</p>
            <p className="text-sm italic mb-8">"Built for climate-resilient and cooperative agriculture."</p>
            <p className="text-xs text-gray-500">Prototype / Hackathon Demonstration</p>
            <p className="text-xs text-gray-500">Some data shown in this prototype may be simulated for demonstration.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
