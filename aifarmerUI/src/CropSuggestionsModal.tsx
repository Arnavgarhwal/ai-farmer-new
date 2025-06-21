import React from 'react';

// Define the detailed types for the props
interface Crop {
  name: string;
  icon: string;
  investmentLevel: string;
  growingRequirement: {
    season: string[];
    soilType: string[];
    duration: string;
    waterLevel: string;
  };
  economicsPerAcre: {
    yield: string;
    marketPrice: string;
    grossRevenue: string;
    netProfit: string;
  };
  priceBreakdown: {
    [key: string]: string | undefined;
  };
  description: string;
}

interface CropSuggestionsModalProps {
  show: boolean;
  onClose: () => void;
  crops: Crop[];
  categories: string[];
}

const CropSuggestionsModal: React.FC<CropSuggestionsModalProps> = ({ show, onClose, crops, categories }) => {
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");

  if (!show) {
    return null;
  }

  const filteredCrops = crops.filter(crop => {
    const categoryMatch = category === "All" || crop.investmentLevel === category;
    const searchMatch = crop.name.toLowerCase().includes(search.toLowerCase()) || 
                        crop.description.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0, 0, 0, 0.5)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "95%", maxWidth: "1200px",
        height: "90%", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px", borderBottom: "1px solid #e2e8f0"
        }}>
          <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>🌾 Crop Suggestions</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 28, color: "#8B4513",
            cursor: "pointer", width: 40, height: 40, display: "flex",
            alignItems: "center", justifyContent: "center", borderRadius: 8
          }} aria-label="Close">×</button>
        </div>
        
        <div style={{ padding: "24px", display: "flex", gap: "20px", borderBottom: "1px solid #e2e8f0" }}>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{
            flex: 1, padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 16,
          }}>
            {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Investments' : `${cat} Investment`}</option>)}
          </select>
          <input type="text" placeholder="Search by crop name or description..." value={search} onChange={e => setSearch(e.target.value)} style={{
            flex: 2, padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 16,
          }}/>
        </div>

        <div style={{ overflowY: "auto", padding: "24px", flex: 1, background: "#f0f4f8" }}>
          {filteredCrops.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
              {filteredCrops.map((crop, idx) => (
                <div key={idx} style={{
                  background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "40px", marginRight: "16px" }}>{crop.icon}</span>
                    <div>
                      <h4 style={{ color: "#14532d", fontWeight: 700, fontSize: "22px", margin: 0 }}>{crop.name}</h4>
                      <span style={{ 
                        background: crop.investmentLevel === 'High' ? '#dc2626' : crop.investmentLevel === 'Medium' ? '#f59e0b' : '#22c55e', 
                        color: "#fff", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600 
                      }}>{crop.investmentLevel} Investment</span>
                    </div>
                  </div>
                  <p style={{ color: "#374151", fontSize: "15px", lineHeight: 1.6, marginBottom: "20px", flexGrow: 1 }}>{crop.description}</p>
                  
                  <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '16px'}}>
                    <div style={{background: '#f0fdf4', padding: '12px', borderRadius: '8px', marginBottom: '12px'}}>
                      <h5 style={{color: '#15803d', marginBottom: '10px', fontSize: '16px'}}>🌱 Growing Requirements</h5>
                      <p><strong>🗓️ Season:</strong> {crop.growingRequirement.season.join(", ")}</p>
                      <p><strong>🏞️ Soil:</strong> {crop.growingRequirement.soilType.join(", ")}</p>
                      <p><strong>⏳ Duration:</strong> {crop.growingRequirement.duration}</p>
                      <p><strong>💧 Water:</strong> {crop.growingRequirement.waterLevel}</p>
                    </div>

                    <div style={{background: '#fffbeb', padding: '12px', borderRadius: '8px', marginBottom: '12px'}}>
                      <h5 style={{color: '#b45309', marginTop: '16px', marginBottom: '10px', fontSize: '16px'}}>💰 Economics / Acre</h5>
                      <p><strong>📦 Yield:</strong> {crop.economicsPerAcre.yield}</p>
                      <p><strong>💵 Revenue:</strong> {crop.economicsPerAcre.grossRevenue}</p>
                      <p><strong>📈 Net Profit:</strong> {crop.economicsPerAcre.netProfit}</p>
                    </div>

                    <div style={{background: '#eff6ff', padding: '12px', borderRadius: '8px'}}>
                      <h5 style={{color: '#1d4ed8', marginTop: '16px', marginBottom: '10px', fontSize: '16px'}}>💸 Cost Breakdown / Acre</h5>
                       {Object.entries(crop.priceBreakdown).map(([key, value]) => (
                          <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
                       ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280", fontSize: 16 }}>
              No crops found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropSuggestionsModal; 