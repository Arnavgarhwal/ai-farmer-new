import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';

interface MandiPrice {
  mandiName: string;
  location: string;
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  priceChangePercent: number;
  distance: string;
  lastUpdated: string;
}

interface PricePredictionResultsProps {
  cropName: string;
  state: string;
  district: string;
  harvestDate: string;
  onBack: () => void;
}

const PricePredictionResults: React.FC<PricePredictionResultsProps> = ({
  cropName,
  state,
  district,
  harvestDate,
  onBack
}) => {
  const [mandiPrices, setMandiPrices] = useState<MandiPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedMandi, setSelectedMandi] = useState<string>('');

  useEffect(() => {
    fetchMandiPrices();
  }, [cropName, state, district, harvestDate]);

  const fetchMandiPrices = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/mandi-prices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropName,
          state,
          district,
          harvestDate
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMandiPrices(data.mandiPrices);
        } else {
          setError(data.error || 'Failed to fetch mandi prices');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch mandi prices');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error fetching mandi prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? '#16a34a' : '#dc2626';
  };

  const getPriceChangeIcon = (change: number) => {
    return change >= 0 ? '📈' : '📉';
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <div style={{ fontSize: 48, marginBottom: "20px" }}>🤖</div>
          <h2 style={{ color: "#16a34a", fontWeight: 700, marginBottom: "12px" }}>
            Analyzing Market Data...
          </h2>
          <p style={{ color: "#6b7280", fontSize: 16 }}>
            Fetching current and predicted prices for {cropName} across nearby mandis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {/* Header */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0",
          marginBottom: "32px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={onBack}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "#16a34a",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Go back"
            >
              ←
            </button>
            <div>
              <h1 style={{ color: "#16a34a", fontWeight: 700, fontSize: "28px", margin: 0 }}>
                📊 Price Prediction Results
              </h1>
              <p style={{ color: "#6b7280", margin: "4px 0 0 0", fontSize: "16px" }}>
                Market analysis for {cropName} in {district}, {state}
              </p>
            </div>
          </div>
        </header>

        {/* Error Display */}
        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "16px",
            borderRadius: 12,
            marginBottom: "24px",
            fontSize: 14
          }}>
            ❌ {error}
          </div>
        )}

        {/* Summary Card */}
        <div style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          borderRadius: 16,
          padding: "24px",
          marginBottom: "32px",
          border: "1px solid #16a34a"
        }}>
          <h2 style={{ color: "#166534", fontWeight: 600, marginBottom: "16px" }}>
            📋 Analysis Summary
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <span style={{ fontWeight: 500, color: "#374151" }}>Crop:</span>
              <span style={{ marginLeft: "8px", color: "#16a34a", fontWeight: 600 }}>{cropName}</span>
            </div>
            <div>
              <span style={{ fontWeight: 500, color: "#374151" }}>Location:</span>
              <span style={{ marginLeft: "8px", color: "#1e40af", fontWeight: 600 }}>{district}, {state}</span>
            </div>
            <div>
              <span style={{ fontWeight: 500, color: "#374151" }}>Harvest Date:</span>
              <span style={{ marginLeft: "8px", color: "#dc2626", fontWeight: 600 }}>{formatDate(harvestDate)}</span>
            </div>
            <div>
              <span style={{ fontWeight: 500, color: "#374151" }}>Mandi Count:</span>
              <span style={{ marginLeft: "8px", color: "#16a34a", fontWeight: 600 }}>{mandiPrices.length} nearby mandis</span>
            </div>
          </div>
        </div>

        {/* Mandi Prices Grid */}
        <div>
          <h2 style={{ color: "#1e293b", fontWeight: 600, marginBottom: "20px", fontSize: "24px" }}>
            🏬 Nearby Mandi Prices
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
            gap: "20px" 
          }}>
            {mandiPrices.map((mandi, index) => (
              <div key={index} style={{
                background: "linear-gradient(145deg, #fff, #f9f9f9)",
                borderRadius: 16,
                padding: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
              }}
              onClick={() => setSelectedMandi(mandi.mandiName)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ color: "#14532d", fontWeight: 700, fontSize: "20px", margin: "0 0 4px 0" }}>
                      {mandi.mandiName}
                    </h3>
                    <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
                      📍 {mandi.location} • {mandi.distance}
                    </p>
                  </div>
                  <span style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "4px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {mandi.lastUpdated}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 4px 0" }}>Current Price</p>
                    <p style={{ color: "#1e293b", fontWeight: 700, fontSize: "18px", margin: 0 }}>
                      {formatPrice(mandi.currentPrice)}
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 4px 0" }}>Predicted Price</p>
                    <p style={{ color: "#16a34a", fontWeight: 700, fontSize: "18px", margin: 0 }}>
                      {formatPrice(mandi.predictedPrice)}
                    </p>
                  </div>
                </div>

                <div style={{
                  background: "#f0fdf4",
                  borderRadius: 8,
                  padding: "12px",
                  textAlign: "center",
                  border: "1px solid #dcfce7"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "16px" }}>{getPriceChangeIcon(mandi.priceChange)}</span>
                    <span style={{ 
                      color: getPriceChangeColor(mandi.priceChange), 
                      fontWeight: 600, 
                      fontSize: "16px" 
                    }}>
                      {mandi.priceChange >= 0 ? '+' : ''}{formatPrice(mandi.priceChange)}
                    </span>
                  </div>
                  <p style={{ 
                    color: getPriceChangeColor(mandi.priceChange), 
                    fontWeight: 600, 
                    fontSize: "14px", 
                    margin: 0 
                  }}>
                    {mandi.priceChange >= 0 ? '+' : ''}{mandi.priceChangePercent}% change
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Recommendation */}
        {mandiPrices.length > 0 && (
          <div style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            borderRadius: 16,
            padding: "24px",
            marginTop: "32px",
            border: "1px solid #f59e0b"
          }}>
            <h3 style={{ color: "#92400e", fontWeight: 600, marginBottom: "16px" }}>
              💡 AI Recommendation
            </h3>
            {(() => {
              const bestMandi = mandiPrices.reduce((best, current) => 
                current.predictedPrice > best.predictedPrice ? current : best
              );
              return (
                <div>
                  <p style={{ color: "#78350f", fontSize: "16px", marginBottom: "12px" }}>
                    <strong>Best Option:</strong> {bestMandi.mandiName} in {bestMandi.location}
                  </p>
                  <p style={{ color: "#78350f", fontSize: "16px", marginBottom: "12px" }}>
                    <strong>Expected Price:</strong> {formatPrice(bestMandi.predictedPrice)} per quintal
                  </p>
                  <p style={{ color: "#78350f", fontSize: "16px" }}>
                    <strong>Potential Profit:</strong> {formatPrice(bestMandi.priceChange)} more than current market price
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricePredictionResults; 