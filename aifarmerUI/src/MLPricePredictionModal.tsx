import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';

interface Mandi {
  mandi_id: number;
  mandi_name: string;
  state: string;
  district: string;
}

interface Crop {
  name: string;
}

interface PricePrediction {
  date: string;
  predicted_price: number;
  rainfall: number;
  temperature: number;
}

interface PredictionResponse {
  mandi_id: number;
  crop: string;
  predictions: PricePrediction[];
}

interface MLPricePredictionModalProps {
  show: boolean;
  onClose: () => void;
}

const MLPricePredictionModal: React.FC<MLPricePredictionModalProps> = ({ show, onClose }) => {
  const [mandis, setMandis] = useState<Mandi[]>([]);
  const [crops, setCrops] = useState<string[]>([]);
  const [selectedMandi, setSelectedMandi] = useState<number | ''>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [harvestDate, setHarvestDate] = useState<string>('');
  const [predictions, setPredictions] = useState<PricePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentPrices, setCurrentPrices] = useState<any[]>([]);

  // Load mandis and crops on component mount
  useEffect(() => {
    if (show) {
      loadMandis();
      loadCrops();
      loadCurrentPrices();
    }
  }, [show]);

  const loadMandis = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mandis`);
      if (response.ok) {
        const data = await response.json();
        setMandis(data);
      } else {
        console.error('Failed to load mandis');
      }
    } catch (error) {
      console.error('Error loading mandis:', error);
    }
  };

  const loadCrops = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/crops`);
      if (response.ok) {
        const data = await response.json();
        setCrops(data);
      } else {
        console.error('Failed to load crops');
      }
    } catch (error) {
      console.error('Error loading crops:', error);
    }
  };

  const loadCurrentPrices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/current_prices`);
      if (response.ok) {
        const data = await response.json();
        setCurrentPrices(data);
      } else {
        console.error('Failed to load current prices');
      }
    } catch (error) {
      console.error('Error loading current prices:', error);
    }
  };

  const handlePredict = async () => {
    if (!selectedMandi || !selectedCrop || !harvestDate) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mandi_id: selectedMandi,
          crop: selectedCrop,
          harvest_date: harvestDate
        })
      });

      if (response.ok) {
        const data: PredictionResponse = await response.json();
        setPredictions(data.predictions);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to get predictions');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPrice = (mandiId: number, cropName: string) => {
    const price = currentPrices.find(p => p.mandi_id === mandiId && p.crop === cropName);
    return price ? price.modal_price : 'N/A';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0, 0, 0, 0.5)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "95%", maxWidth: "1400px",
        height: "90%", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px", borderBottom: "1px solid #e2e8f0"
        }}>
          <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>
            🤖 ML Price Prediction
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 28, color: "#8B4513",
            cursor: "pointer", width: 40, height: 40, display: "flex",
            alignItems: "center", justifyContent: "center", borderRadius: 8
          }} aria-label="Close">×</button>
        </div>

        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Input Section */}
          <div style={{
            background: "#f8fafc", borderRadius: 12, padding: "20px",
            border: "1px solid #e2e8f0"
          }}>
            <h3 style={{ color: "#1e293b", fontWeight: 600, marginBottom: "16px" }}>
              📊 Prediction Parameters
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "#374151" }}>
                  Select Mandi
                </label>
                <select 
                  value={selectedMandi} 
                  onChange={(e) => setSelectedMandi(Number(e.target.value) || '')}
                  style={{
                    width: "100%", padding: "12px", border: "1px solid #d1d5db", 
                    borderRadius: 8, fontSize: 16, background: "#fff"
                  }}
                >
                  <option value="">Choose a mandi...</option>
                  {mandis.map((mandi) => (
                    <option key={mandi.mandi_id} value={mandi.mandi_id}>
                      {mandi.mandi_name} - {mandi.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "#374151" }}>
                  Select Crop
                </label>
                <select 
                  value={selectedCrop} 
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", border: "1px solid #d1d5db", 
                    borderRadius: 8, fontSize: 16, background: "#fff"
                  }}
                >
                  <option value="">Choose a crop...</option>
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "#374151" }}>
                  Harvest Date
                </label>
                <input 
                  type="date" 
                  value={harvestDate} 
                  onChange={(e) => setHarvestDate(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", border: "1px solid #d1d5db", 
                    borderRadius: 8, fontSize: 16, background: "#fff"
                  }}
                />
              </div>
            </div>

            <button 
              onClick={handlePredict}
              disabled={loading || !selectedMandi || !selectedCrop || !harvestDate}
              style={{
                background: loading ? "#9ca3af" : "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                color: "#fff", border: "none", padding: "12px 24px", 
                borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                marginTop: "16px", boxShadow: "0 2px 8px rgba(22, 163, 74, 0.3)"
              }}
            >
              {loading ? "🤖 Predicting..." : "🚀 Get Price Predictions"}
            </button>

            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
                padding: "12px", borderRadius: 8, marginTop: "12px", fontSize: 14
              }}>
                ❌ {error}
              </div>
            )}
          </div>

          {/* Current Price Display */}
          {selectedMandi && selectedCrop && (
            <div style={{
              background: "#eff6ff", borderRadius: 12, padding: "16px",
              border: "1px solid #bfdbfe"
            }}>
              <h4 style={{ color: "#1d4ed8", fontWeight: 600, marginBottom: "8px" }}>
                📈 Current Market Price
              </h4>
              <p style={{ color: "#1e40af", fontSize: 18, fontWeight: 500 }}>
                {selectedCrop} at {mandis.find(m => m.mandi_id === selectedMandi)?.mandi_name}: 
                <span style={{ color: "#16a34a", fontWeight: 700, marginLeft: "8px" }}>
                  ₹{getCurrentPrice(selectedMandi, selectedCrop)} per quintal
                </span>
              </p>
            </div>
          )}

          {/* Predictions Display */}
          {predictions.length > 0 && (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <h3 style={{ color: "#1e293b", fontWeight: 600, marginBottom: "16px" }}>
                📊 90-Day Price Forecast
              </h3>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                gap: "16px" 
              }}>
                {predictions.slice(0, 30).map((prediction, index) => (
                  <div key={index} style={{
                    background: "linear-gradient(145deg, #fff, #f9f9f9)",
                    borderRadius: 12, padding: "16px", border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontWeight: 600, color: "#374151" }}>
                        {formatDate(prediction.date)}
                      </span>
                      <span style={{ 
                        background: "#dcfce7", color: "#166534", 
                        padding: "4px 8px", borderRadius: 6, fontSize: 14, fontWeight: 600 
                      }}>
                        Day {index + 1}
                      </span>
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <span style={{ fontWeight: 600, color: "#16a34a" }}>
                        ₹{prediction.predicted_price.toLocaleString()}
                      </span>
                      <span style={{ color: "#6b7280", fontSize: 14 }}> per quintal</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px", fontSize: 12, color: "#6b7280" }}>
                      <span>🌧️ {prediction.rainfall}mm</span>
                      <span>🌡️ {prediction.temperature}°C</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {predictions.length > 30 && (
                <div style={{ 
                  textAlign: "center", marginTop: "20px", 
                  color: "#6b7280", fontSize: 14 
                }}>
                  Showing first 30 days of 90-day forecast. 
                  <br />
                  Total predictions: {predictions.length} days
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLPricePredictionModal; 