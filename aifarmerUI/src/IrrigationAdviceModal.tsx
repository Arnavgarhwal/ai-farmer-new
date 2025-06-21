import React from 'react';

// Define types for the props
interface IrrigationAdvice {
  name: string;
  icon: string;
  category: string;
  description: string;
  cost: string;
  advantages: string[];
  disadvantages: string[];
  suitableCrops: string[];
  link: string;
}

interface IrrigationAdviceModalProps {
  show: boolean;
  onClose: () => void;
  advice: IrrigationAdvice[];
  categories: string[];
}

const IrrigationAdviceModal: React.FC<IrrigationAdviceModalProps> = ({ show, onClose, advice, categories }) => {
  const [category, setCategory] = React.useState("All");
  const [search, setSearch] = React.useState("");

  if (!show) {
    return null;
  }

  const filteredAdvice = advice.filter(item => {
    const categoryMatch = category === "All" || item.category === category;
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                        item.description.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0, 0, 0, 0.5)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "90%", maxWidth: "1000px",
        height: "90%", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px", borderBottom: "1px solid #e2e8f0"
        }}>
          <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>💧 Irrigation Advice</h2>
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
          <input type="text" placeholder="Search advice..." value={search} onChange={e => setSearch(e.target.value)} style={{
            flex: 2, padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 16,
          }}/>
        </div>

        <div style={{ overflowY: "auto", padding: "24px", flex: 1 }}>
          {filteredAdvice.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {filteredAdvice.map((item, idx) => (
                <div key={idx} style={{
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: 12, border: "1px solid #bae6fd", padding: 24,
                }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontSize: 32, marginRight: 12 }}>{item.icon}</span>
                    <div>
                      <h4 style={{ color: "#16a34a", fontWeight: 700, fontSize: 18, margin: 0, marginBottom: 4 }}>{item.name}</h4>
                      <span style={{ background: "#16a34a", color: "#fff", padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{item.category}</span>
                    </div>
                  </div>
                  <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{item.description}</p>
                  <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}><strong>Cost: </strong>{item.cost}</p>
                  <div><strong style={{ color: "#16a34a" }}>Advantages:</strong><ul>{item.advantages.map(adv => <li key={adv}>{adv}</li>)}</ul></div>
                  <div><strong style={{ color: "#16a34a" }}>Disadvantages:</strong><ul>{item.disadvantages.map(dis => <li key={dis}>{dis}</li>)}</ul></div>
                  <div><strong style={{ color: "#16a34a" }}>Suitable Crops:</strong><p>{item.suitableCrops.join(", ")}</p></div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)", color: "#fff",
                    textDecoration: "none", padding: "8px 16px", borderRadius: 6, fontSize: 14,
                    fontWeight: 600, display: "inline-block", transition: "all 0.2s ease"
                  }}>Learn More →</a>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280", fontSize: 16 }}>
              No advice found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IrrigationAdviceModal;
