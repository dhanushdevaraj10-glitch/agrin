import { useState, useEffect } from 'react';
import { Activity, Beaker, Droplets, ArrowUpCircle } from 'lucide-react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const data = [
  { name: 'Jan', ph: 6.2, carbon: 0.8 },
  { name: 'Feb', ph: 6.4, carbon: 0.9 },
  { name: 'Mar', ph: 6.3, carbon: 1.0 },
  { name: 'Apr', ph: 6.5, carbon: 1.1 },
  { name: 'May', ph: 6.7, carbon: 1.2 },
];

export const Soil = () => {
  const [soilData, setSoilData] = useState<any>(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/soil`).then(res => setSoilData(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-charcoal">Soil Intelligence</h1>
        <p className="text-gray-600 mt-2">Monitor soil health and generate regeneration plans.</p>
      </div>

      {soilData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Soil Health Score</h3>
              <div className="text-5xl font-extrabold text-forest">{soilData.health_score}<span className="text-2xl text-gray-400">/100</span></div>
              <p className="text-sm font-bold text-green-600 mt-2">Status: Good</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 border-b pb-2">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-gray-600 flex items-center"><Beaker className="w-4 h-4 mr-2"/> pH Level</span> <span className="font-bold">{soilData.metrics.pH}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600 flex items-center"><Activity className="w-4 h-4 mr-2"/> Organic Carbon</span> <span className="font-bold">{soilData.metrics.organic_carbon}%</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600 flex items-center"><Droplets className="w-4 h-4 mr-2"/> Moisture</span> <span className="font-bold">{soilData.metrics.moisture}%</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Nitrogen</span> <span className="font-bold text-yellow-600">{soilData.metrics.nitrogen}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Phosphorus</span> <span className="font-bold text-green-600">{soilData.metrics.phosphorus}</span></div>
              </div>
            </div>

            <button onClick={() => alert("Generating full PDF Soil Regeneration Plan...")} className="w-full bg-forest text-white py-3 rounded-lg font-medium hover:bg-opacity-90 flex items-center justify-center transition">
              <ArrowUpCircle className="w-5 h-5 mr-2" /> Generate Soil Regeneration Plan
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4">Organic Carbon & pH Trend</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="carbon" stroke="#8B5A2B" name="Carbon %" />
                    <Line yAxisId="right" type="monotone" dataKey="ph" stroke="#4C8B3E" name="pH Level" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold mb-4 text-earth">Recommendations for Improvement</h3>
              <ul className="space-y-3">
                <li className="flex items-start"><span className="text-earth mr-2">•</span> Increase organic matter through composting.</li>
                <li className="flex items-start"><span className="text-earth mr-2">•</span> Consider planting leguminous cover crops for nitrogen fixation.</li>
                <li className="flex items-start"><span className="text-earth mr-2">•</span> Maintain soil moisture by applying organic mulch before dry periods.</li>
                <li className="flex items-start"><span className="text-earth mr-2">•</span> Reduce unnecessary synthetic fertilizer to protect soil microbiome.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64"><p className="text-gray-500">Loading Soil Intelligence...</p></div>
      )}
    </div>
  );
};
