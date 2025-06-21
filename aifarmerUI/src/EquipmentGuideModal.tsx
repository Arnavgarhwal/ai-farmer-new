import React from 'react';

interface Equipment {
  name: string;
  icon: string;
  category: string;
  price: string;
  uses: string[];
  suitableFor: string;
  maintenance: string;
  advantages: string[];
  disadvantages: string[];
  importance: string;
  link: string;
}

interface EquipmentGuideModalProps {
  show: boolean;
  onClose: () => void;
  equipment: Equipment[];
  categories: string[];
}

const EquipmentGuideModal: React.FC<EquipmentGuideModalProps> = ({ show, onClose, equipment, categories }) => {
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");

  if (!show) {
    return null;
  }

  const filteredEquipment = equipment.filter(item => {
    const categoryMatch = category === "All" || item.category === category;
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                        item.uses.join(" ").toLowerCase().includes(search.toLowerCase());
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
          <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>🚜 Equipment Guide</h2>
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
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="text" placeholder="Search by name or use..." value={search} onChange={e => setSearch(e.target.value)} style={{
            flex: 2, padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 16,
          }}/>
        </div>

        <div style={{ overflowY: "auto", padding: "24px", flex: 1, background: "#f0f4f8" }}>
          {filteredEquipment.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
              {filteredEquipment.map((item, idx) => (
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
                    <span style={{ fontSize: 44, marginRight: 18 }}>{item.icon}</span>
                    <div>
                      <h4 style={{ color: "#14532d", fontWeight: 700, fontSize: 22, margin: 0 }}>{item.name}</h4>
                      <span style={{
                        background: item.category === 'Machinery' ? '#f59e0b' : item.category === 'Crop Care' ? '#22d3ee' : item.category === 'Planting' ? '#84cc16' : item.category === 'Energy & Tech' ? '#6366f1' : '#f472b6',
                        color: "#fff", padding: "4px 12px", borderRadius: "12px", fontSize: 13, fontWeight: 600
                      }}>{item.category}</span>
                    </div>
                  </div>
                  <div style={{background: '#fef9c3', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#b45309'}}>💡 Importance:</span> <span style={{color: '#92400e'}}>{item.importance}</span>
                  </div>
                  <div style={{background: '#f0fdf4', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#15803d'}}>💰 Price Range:</span> <span style={{color: '#166534'}}>{item.price}</span>
                  </div>
                  <div style={{background: '#e0f2fe', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#2563eb'}}>🔧 Uses:</span> <span style={{color: '#1e3a8a'}}>{item.uses.join(", ")}</span>
                  </div>
                  <div style={{background: '#f3e8ff', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#7c3aed'}}>🎯 Suitable For:</span> <span style={{color: '#581c87'}}>{item.suitableFor}</span>
                  </div>
                  <div style={{background: '#fef2f2', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#dc2626'}}>🛠️ Maintenance:</span> <span style={{color: '#991b1b'}}>{item.maintenance}</span>
                  </div>
                  <div style={{background: '#dcfce7', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#16a34a'}}>👍 Advantages:</span>
                    <ul style={{margin: '8px 0 0 18px', color: '#166534', fontSize: 15}}>{item.advantages.map(adv => <li key={adv}>{adv}</li>)}</ul>
                  </div>
                  <div style={{background: '#fee2e2', borderRadius: 8, padding: '10px 14px', marginBottom: 10}}>
                    <span style={{fontWeight: 600, color: '#dc2626'}}>👎 Disadvantages:</span>
                    <ul style={{margin: '8px 0 0 18px', color: '#991b1b', fontSize: 15}}>{item.disadvantages.map(dis => <li key={dis}>{dis}</li>)}</ul>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)", color: "#fff",
                    textDecoration: "none", padding: "10px 18px", borderRadius: 8, fontSize: 15,
                    fontWeight: 600, display: "inline-block", marginTop: 10, alignSelf: 'flex-start', boxShadow: '0 2px 8px #bbf7d0'
                  }}>Learn More →</a>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280", fontSize: 16 }}>
              No equipment found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentGuideModal; 