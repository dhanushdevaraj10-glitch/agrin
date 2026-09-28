
import { Globe, Network, ShieldCheck, Share2 } from 'lucide-react';

export const Cooperation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-charcoal">BRICS Agricultural Intelligence Network</h1>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">AgriN provides a common digital architecture where participating countries can exchange agricultural models, climate signals, crop-health methodologies and regenerative farming knowledge while maintaining country-level data governance.</p>
      </div>

      <div className="bg-forest rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="relative h-64 md:h-96 flex items-center justify-center bg-opacity-20 bg-black">
          <div className="absolute top-4 right-4 z-10 bg-white text-forest text-xs font-bold px-3 py-1 rounded-full">Demo Network Representation</div>
          <Globe className="w-48 h-48 text-leaf opacity-30 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Visual representation of nodes */}
            <div className="w-full max-w-4xl flex justify-between px-10">
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)]"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] mt-20"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] -mt-10"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] mt-32"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] mt-4"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
        {[
          { name: 'INDIA', focus: 'Rice, Millets, Tea, Horticulture' },
          { name: 'BRAZIL', focus: 'Soy, Coffee, Sugarcane' },
          { name: 'CHINA', focus: 'Rice, Wheat, Vegetables' },
          { name: 'SOUTH AFRICA', focus: 'Maize, Wheat, Horticulture' },
          { name: 'RUSSIA', focus: 'Wheat, Barley, Oilseeds' }
        ].map(country => (
          <div key={country.name} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 mb-2">{country.name}</h3>
            <p className="text-xs text-gray-500 font-medium uppercase mb-1">Primary Focus</p>
            <p className="text-sm text-forest">{country.focus}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-leaf bg-opacity-10 p-6 rounded-xl border border-leaf border-opacity-20 text-center">
          <Network className="w-10 h-10 text-leaf mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">24 Crop Models Shared</h3>
          <p className="text-sm text-gray-600">Cross-border ML models trained on diverse climatic zones.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
          <Share2 className="w-10 h-10 text-blue-500 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">12 Data Layers</h3>
          <p className="text-sm text-gray-600">Standardized APIs for weather, soil, and satellite intelligence exchange.</p>
        </div>
        <div className="bg-earth bg-opacity-10 p-6 rounded-xl border border-earth border-opacity-20 text-center">
          <ShieldCheck className="w-10 h-10 text-earth mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Sovereign Governance</h3>
          <p className="text-sm text-gray-600">Participating nations maintain complete control over local agricultural datasets.</p>
        </div>
      </div>
    </div>
  );
};
