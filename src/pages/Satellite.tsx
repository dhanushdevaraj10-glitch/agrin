import { useState, useEffect } from 'react';
import { Layers, Eye, Check } from 'lucide-react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const Satellite = () => {
  const [data, setData] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState('NDVI');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/satellite`).then(res => setData(res.data)).catch(console.error);
  }, []);

  const handleCompare = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  const layers = ['NDVI', 'Moisture', 'Temperature', 'Crop Stress'];
  
  // Example demo farm coordinates in Coimbatore
  const farmPolygon: [number, number][] = [
    [11.0168, 76.9558],
    [11.0168, 76.9608],
    [11.0128, 76.9608],
    [11.0128, 76.9558],
  ];

  // Determine polygon color based on active layer
  const getPolygonColor = () => {
    switch(activeLayer) {
      case 'NDVI': return '#4C8B3E'; // Green
      case 'Moisture': return '#3b82f6'; // Blue
      case 'Temperature': return '#ef4444'; // Red
      case 'Crop Stress': return '#eab308'; // Yellow
      default: return '#4C8B3E';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
      {showToast && (
        <div className="fixed top-20 right-5 bg-charcoal text-white px-4 py-3 rounded shadow-lg z-50 flex items-center animate-fade-in-up">
          <Check className="w-5 h-5 mr-2 text-green-400" /> Compare mode activated! Check historical changes.
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-charcoal">See What Your Field Cannot Tell You.</h1>
        <p className="text-gray-600 mt-2">Satellite Intelligence & Visualizations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          
          <div className="p-6 border-r border-gray-100 bg-gray-50 flex flex-col justify-between z-10">
            <div>
              <h3 className="font-bold text-gray-900 mb-6 flex items-center"><Layers className="w-5 h-5 mr-2" /> Map Layers</h3>
              <div className="space-y-3">
                {layers.map(layer => (
                  <button 
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeLayer === layer ? 'bg-leaf text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            </div>

            {data && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Field Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Vegetation Index</p>
                    <p className="font-bold text-lg text-forest">{data.vegetation_index}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Crop Stress</p>
                    <p className="font-bold text-lg text-green-600">{data.crop_stress}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Water Stress</p>
                    <p className="font-bold text-lg text-yellow-600">{data.water_stress}</p>
                  </div>
                </div>
                <button onClick={handleCompare} className="mt-6 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-medium text-sm flex items-center justify-center hover:bg-gray-50">
                  <Eye className="w-4 h-4 mr-2" /> Compare Changes
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-3 relative h-[600px] flex items-center justify-center overflow-hidden z-0">
            <div className="absolute top-4 right-4 z-[400] bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-bold tracking-wider">
              {activeLayer.toUpperCase()} LAYER ACTIVE
            </div>
            
            <MapContainer 
              center={[11.0148, 76.9583]} 
              zoom={15} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=6BBoUOFAv8iyRKC9jHun"
                attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
              />
              <Polygon 
                positions={farmPolygon} 
                pathOptions={{ 
                  color: getPolygonColor(), 
                  fillColor: getPolygonColor(), 
                  fillOpacity: 0.4, 
                  weight: 2 
                }}
              >
                <Popup>
                  <div className="font-bold">AgriN Demo Farm</div>
                  <div>Status: {activeLayer} scanning optimal.</div>
                </Popup>
              </Polygon>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
