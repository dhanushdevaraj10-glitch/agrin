import { useState } from 'react';
import { ShieldAlert, Droplets, Leaf, ThermometerSun, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const Advisory = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/advisory`, {
        location: 'Coimbatore',
        crop: 'Tomato',
        growth_stage: 'Flowering',
        soil_type: 'Red Loam',
        irrigation_type: 'Drip',
        farm_size: '2 acres',
        current_problem: 'None'
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-charcoal">Your AI Agro-Advisory</h1>
        <p className="text-gray-600 mt-2">Generate intelligent farming recommendations based on local climate and soil conditions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Location</label>
              <input type="text" defaultValue="Coimbatore" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-leaf focus:ring-leaf sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop</label>
              <input type="text" defaultValue="Tomato" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-leaf focus:ring-leaf sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Growth Stage</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-leaf focus:ring-leaf sm:text-sm">
                <option>Seedling</option>
                <option>Vegetative</option>
                <option selected>Flowering</option>
                <option>Fruiting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Soil Type</label>
              <input type="text" defaultValue="Red Loam" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-leaf focus:ring-leaf sm:text-sm" />
            </div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-leaf hover:bg-forest focus:outline-none transition-colors mt-6">
              {loading ? 'Generating...' : 'Generate Advisory'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in-up">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Today's Advisory</h2>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Confidence: {result.confidence}%
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg flex gap-3">
                  <Droplets className="text-blue-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Water</h4>
                    <p className="text-sm text-gray-700 mt-1">{result.advisory.water}</p>
                  </div>
                </div>
                <div className="p-4 bg-earth bg-opacity-10 rounded-lg flex gap-3">
                  <ThermometerSun className="text-earth shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Soil</h4>
                    <p className="text-sm text-gray-700 mt-1">{result.advisory.soil}</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg flex gap-3">
                  <Leaf className="text-green-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Crop</h4>
                    <p className="text-sm text-gray-700 mt-1">{result.advisory.crop}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg flex gap-3">
                  <ShieldAlert className="text-gray-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Weather</h4>
                    <p className="text-sm text-gray-700 mt-1">{result.advisory.weather}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Action Priority:</h3>
                <ul className="space-y-2">
                  {result.action_priority.map((action: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center text-xs mr-2">{i+1}</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300 p-8">
              <Leaf className="w-16 h-16 mb-4 opacity-50" />
              <p>Fill out your farm details to generate a localized AI advisory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
