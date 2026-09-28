import { useState, useRef } from 'react';
import { Upload, AlertTriangle, CheckCircle, Activity, Info, Leaf, ImageIcon } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const CropHealth = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDemoDiagnosis = async () => {
    setLoading(true);
    setImagePreview(null);
    try {
      const response = await axios.post(`${API_URL}/api/disease-diagnosis`, {
        use_demo: true
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setLoading(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        axios.post(`${API_URL}/api/disease-diagnosis`, { 
          image_url: base64String,
          use_demo: false 
        })
        .then(res => setResult(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-charcoal">AI Crop Doctor</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Detect crop health problems before they become field-wide losses. Upload an image of your affected crop for instant diagnosis.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Upload Section */}
          <div className="p-8 border-r border-gray-100 bg-gray-50 flex flex-col justify-center items-center text-center">
            
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-100 transition-colors cursor-pointer mb-6 overflow-hidden relative min-h-[200px] flex flex-col items-center justify-center"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Crop Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : null}
              <div className="relative z-10 flex flex-col items-center bg-white bg-opacity-70 p-4 rounded-lg">
                {imagePreview ? <ImageIcon className="w-12 h-12 text-forest mb-2" /> : <Upload className="w-12 h-12 text-gray-400 mb-2" />}
                <p className="text-sm font-bold text-gray-900">{imagePreview ? 'Image Selected. Analyzing...' : 'Click to upload crop image'}</p>
                {!imagePreview && <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, WEBP</p>}
              </div>
            </div>
            
            <div className="relative w-full text-center mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative"><span className="px-2 bg-gray-50 text-sm text-gray-500">OR</span></div>
            </div>

            <button 
              onClick={handleDemoDiagnosis}
              disabled={loading}
              className="w-full bg-charcoal text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              {loading ? 'Analyzing Image...' : 'Use Demo Crop Image'}
            </button>
          </div>

          {/* Results Section */}
          <div className="p-8">
            {result ? (
              <div className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm text-gray-500 uppercase tracking-wide font-bold">Detected Condition</h3>
                    <h2 className="text-2xl font-bold text-red-600 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2" /> {result.detected_condition}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Severity: {result.severity}
                    </span>
                    <p className="text-xs font-bold text-gray-500 mt-1">Confidence: {result.confidence}%</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 flex items-center text-sm mb-2">
                    <Activity className="w-4 h-4 mr-1 text-gray-500" /> Symptoms
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    {result.symptoms.map((sym: string, i: number) => (
                      <li key={i}>{sym}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 flex items-center text-sm mb-2">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Recommended Actions
                  </h4>
                  <ul className="space-y-2">
                    {result.recommended_actions.map((act: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-gray-700 bg-green-50 p-2 rounded-md border border-green-100">
                        <span className="mr-2 text-green-600">•</span> {act}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-earth bg-opacity-10 border border-earth border-opacity-30 p-4 rounded-lg">
                  <h4 className="font-bold text-earth text-sm mb-1 flex items-center">
                    <Leaf className="w-4 h-4 mr-1" /> Regenerative Response
                  </h4>
                  <p className="text-sm text-gray-700">{result.regenerative_response}</p>
                </div>
                
                <p className="text-xs text-gray-400 mt-4 flex items-center justify-center">
                  <Info className="w-3 h-3 mr-1" /> AI diagnosis is an advisory aid and should be verified by an agricultural expert.
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Activity className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-center">Upload an image or use the demo to see AI diagnostic results.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
