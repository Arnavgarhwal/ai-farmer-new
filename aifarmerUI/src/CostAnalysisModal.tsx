import React from 'react';

interface Crop {
  name: string;
  icon: string;
  investmentLevel: string;
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

interface CostAnalysisModalProps {
  show: boolean;
  onClose: () => void;
  crops: Crop[];
  categories: string[];
}

const CostAnalysisModal: React.FC<CostAnalysisModalProps> = ({ show, onClose, crops, categories }) => {
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");

  if (!show) return null;

  const filteredCrops = crops.filter(crop => {
    const categoryMatch = category === "All" || crop.investmentLevel === category;
    const searchMatch = crop.name.toLowerCase().includes(search.toLowerCase()) || crop.description.toLowerCase().includes(search.toLowerCase());
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
          <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>💸 Cost Analysis</h2>
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
                  background: "linear-gradient(145deg, #fff, #f9f9f9)",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                    <span style={{ fontSize: 44, marginRight: 18 }}>{crop.icon}</span>
                    <div>
                      <h4 style={{ color: "#14532d", fontWeight: 700, fontSize: 22, margin: 0 }}>{crop.name}</h4>
                      <span style={{
                        background: crop.investmentLevel === 'High' ? '#dc2626' : crop.investmentLevel === 'Medium' ? '#f59e0b' : '#22c55e',
                        color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: 13, fontWeight: 600
                      }}>{crop.investmentLevel} Investment</span>
                    </div>
                  </div>
                  <div style={{background: '#f0fdf4', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#15803d'}}>💰 Economics / Acre:</span>
                    <ul style={{margin: '8px 0 0 18px', color: '#166534', fontSize: 15}}>
                      <li><strong>Yield:</strong> {crop.economicsPerAcre.yield}</li>
                      <li><strong>Market Price:</strong> {crop.economicsPerAcre.marketPrice}</li>
                      <li><strong>Gross Revenue:</strong> {crop.economicsPerAcre.grossRevenue}</li>
                      <li><strong>Net Profit:</strong> {crop.economicsPerAcre.netProfit}</li>
                    </ul>
                  </div>
                  <div style={{background: '#eff6ff', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#1d4ed8'}}>💸 Cost Breakdown / Acre:</span>
                    <ul style={{margin: '8px 0 0 18px', color: '#1e3a8a', fontSize: 15}}>
                      {Object.entries(crop.priceBreakdown).map(([key, value]) => (
                        <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{background: '#fef9c3', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#b45309'}}>📝 Description:</span> <span style={{color: '#92400e'}}>{crop.description}</span>
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

export default CostAnalysisModal; 