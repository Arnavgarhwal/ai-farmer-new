import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';

interface Crop {
  name: string;
}

interface PricePrediction {
  date: string;
  predicted_price: number;
  rainfall: number;
  temperature: number;
  confidence: number;
}

interface PredictionResponse {
  crop: string;
  state: string;
  district: string;
  harvest_date: string;
  predictions: PricePrediction[];
  analysis: {
    trend: string;
    recommendation: string;
    risk_factors: string[];
  };
}

interface MLPricePredictionModalProps {
  show: boolean;
  onClose: () => void;
  cropName?: string;
  state?: string;
  district?: string;
  harvestDate?: string;
}

const MLPricePredictionModal: React.FC<MLPricePredictionModalProps> = ({ 
  show, 
  onClose, 
  cropName = '', 
  state = '', 
  district = '', 
  harvestDate = '' 
}) => {
  const [predictions, setPredictions] = useState<PricePrediction[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  // Auto-predict when modal opens with all required data
  useEffect(() => {
    if (show && cropName && state && district && harvestDate) {
      handlePredict();
    }
  }, [show, cropName, state, district, harvestDate]);

  const handlePredict = async () => {
    if (!cropName || !state || !district || !harvestDate) {
      setError('Missing required information: crop, state, district, or harvest date');
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
          crop: cropName,
          state: state,
          district: district,
          harvest_date: harvestDate
        })
      });

      if (response.ok) {
        const data: PredictionResponse = await response.json();
        setPredictions(data.predictions);
        setAnalysis(data.analysis);
        setCurrentPrice(data.predictions[0]?.predicted_price || null);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTrendColor = (trend: string) => {
    if (trend.toLowerCase().includes('up')) return '#16a34a';
    if (trend.toLowerCase().includes('down')) return '#dc2626';
    return '#6b7280';
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
            🤖 AI Price Prediction Analysis
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 28, color: "#8B4513",
            cursor: "pointer", width: 40, height: 40, display: "flex",
            alignItems: "center", justifyContent: "center", borderRadius: 8
          }} aria-label="Close">×</button>
        </div>

        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" }}>
          {/* Input Summary */}
          <div style={{
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", 
            borderRadius: 12, padding: "20px", border: "1px solid #0ea5e9"
          }}>
            <h3 style={{ color: "#0c4a6e", fontWeight: 600, marginBottom: "16px" }}>
              📋 Analysis Parameters
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <span style={{ fontWeight: 500, color: "#374151" }}>Crop:</span>
                <span style={{ marginLeft: "8px", color: "#16a34a", fontWeight: 600 }}>{cropName}</span>
              </div>
              <div>
                <span style={{ fontWeight: 500, color: "#374151" }}>State:</span>
                <span style={{ marginLeft: "8px", color: "#1e40af", fontWeight: 600 }}>{state}</span>
              </div>
              <div>
                <span style={{ fontWeight: 500, color: "#374151" }}>District:</span>
                <span style={{ marginLeft: "8px", color: "#1e40af", fontWeight: 600 }}>{district}</span>
              </div>
              <div>
                <span style={{ fontWeight: 500, color: "#374151" }}>Harvest Date:</span>
                <span style={{ marginLeft: "8px", color: "#dc2626", fontWeight: 600 }}>{formatDate(harvestDate)}</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div style={{
              background: "#fef3c7", borderRadius: 12, padding: "20px",
              border: "1px solid #f59e0b", textAlign: "center"
            }}>
              <div style={{ fontSize: 24, marginBottom: "12px" }}>🤖</div>
              <h3 style={{ color: "#92400e", fontWeight: 600, marginBottom: "8px" }}>
                AI is Analyzing Market Data...
              </h3>
              <p style={{ color: "#78350f" }}>
                Processing historical data, weather patterns, and market trends for {cropName} in {district}, {state}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626",
              padding: "16px", borderRadius: 12, fontSize: 14
            }}>
              ❌ {error}
            </div>
          )}

          {/* Analysis Results */}
          {analysis && predictions.length > 0 && (
            <>
              {/* Market Analysis Summary */}
              <div style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                borderRadius: 12, padding: "20px", border: "1px solid #16a34a"
              }}>
                <h3 style={{ color: "#166534", fontWeight: 600, marginBottom: "16px" }}>
                  📊 Market Analysis Summary
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                  <div>
                    <h4 style={{ color: "#374151", fontWeight: 600, marginBottom: "8px" }}>Price Trend</h4>
                    <p style={{ 
                      color: getTrendColor(analysis.trend), 
                      fontWeight: 600, 
                      fontSize: 18 
                    }}>
                      📈 {analysis.trend}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: "#374151", fontWeight: 600, marginBottom: "8px" }}>AI Recommendation</h4>
                    <p style={{ color: "#1e293b", fontSize: 16 }}>
                      💡 {analysis.recommendation}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: "#374151", fontWeight: 600, marginBottom: "8px" }}>Expected Price Range</h4>
                    <p style={{ color: "#16a34a", fontWeight: 600, fontSize: 18 }}>
                      ₹{Math.min(...predictions.map(p => p.predicted_price)).toLocaleString()} - 
                      ₹{Math.max(...predictions.map(p => p.predicted_price)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              {analysis.risk_factors && analysis.risk_factors.length > 0 && (
                <div style={{
                  background: "#fef3c7", borderRadius: 12, padding: "16px",
                  border: "1px solid #f59e0b"
                }}>
                  <h4 style={{ color: "#92400e", fontWeight: 600, marginBottom: "12px" }}>
                    ⚠️ Risk Factors to Consider
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#78350f" }}>
                    {analysis.risk_factors.map((risk: string, index: number) => (
                      <li key={index} style={{ marginBottom: "4px" }}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price Predictions */}
              <div>
                <h3 style={{ color: "#1e293b", fontWeight: 600, marginBottom: "16px" }}>
                  📈 90-Day Price Forecast
                </h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
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
                        <span style={{ fontWeight: 600, color: "#16a34a", fontSize: 18 }}>
                          ₹{prediction.predicted_price.toLocaleString()}
                        </span>
                        <span style={{ color: "#6b7280", fontSize: 14 }}> per quintal</span>
                      </div>
                      <div style={{ display: "flex", gap: "12px", fontSize: 12, color: "#6b7280" }}>
                        <span>🌧️ {prediction.rainfall}mm</span>
                        <span>🌡️ {prediction.temperature}°C</span>
                        <span>🎯 {prediction.confidence}%</span>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLPricePredictionModal; 