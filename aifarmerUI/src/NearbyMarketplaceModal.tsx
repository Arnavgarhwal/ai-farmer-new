import React, { useState } from 'react';

interface Marketplace {
  name: string;
  location: string;
  distance: string;
  crops: string[];
  googleMapsUrl: string;
  lat?: number;
  lng?: number;
}

interface NearbyMarketplaceModalProps {
  show: boolean;
  onClose: () => void;
}

// Mock data for nearby marketplaces (with lat/lng for demo)
const mockMarketplaces: Marketplace[] = [
  {
    name: "Krishi Upaj Mandi, Indore",
    location: "Indore, Madhya Pradesh",
    distance: "",
    crops: ["Wheat", "Soybean", "Maize"],
    googleMapsUrl: "https://www.google.com/maps?q=Krishi+Upaj+Mandi+Indore",
    lat: 22.7196,
    lng: 75.8577
  },
  {
    name: "APMC Market, Navi Mumbai",
    location: "Navi Mumbai, Maharashtra",
    distance: "",
    crops: ["Rice", "Onion", "Tomato"],
    googleMapsUrl: "https://www.google.com/maps?q=APMC+Market+Navi+Mumbai",
    lat: 19.0330,
    lng: 73.0297
  },
  {
    name: "Azadpur Mandi",
    location: "Delhi",
    distance: "",
    crops: ["Potato", "Banana", "Brinjal"],
    googleMapsUrl: "https://www.google.com/maps?q=Azadpur+Mandi+Delhi",
    lat: 28.7250,
    lng: 77.1926
  },
  {
    name: "Koyambedu Market",
    location: "Chennai, Tamil Nadu",
    distance: "",
    crops: ["Onion", "Tomato", "Banana"],
    googleMapsUrl: "https://www.google.com/maps?q=Koyambedu+Market+Chennai",
    lat: 13.0710,
    lng: 80.2170
  }
];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => x * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const NearbyMarketplaceModal: React.FC<NearbyMarketplaceModalProps> = ({ show, onClose }) => {
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [locationRequested, setLocationRequested] = useState(false);

  const handleGetLocation = () => {
    setLocError(null);
    setLocationRequested(true);
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setLocError("Unable to retrieve your location. Showing all marketplaces.");
      }
    );
  };

  if (!show) return null;

  // Calculate distances if userLocation is available
  let mandiList = mockMarketplaces.map(mandi => ({ ...mandi }));
  if (userLocation) {
    mandiList.forEach(mandi => {
      if (mandi.lat && mandi.lng) {
        const dist = haversine(userLocation.lat, userLocation.lng, mandi.lat, mandi.lng);
        mandi.distance = dist.toFixed(2) + ' km';
      } else {
        mandi.distance = '';
      }
    });
    mandiList.sort((a, b) => (parseFloat(a.distance) || 9999) - (parseFloat(b.distance) || 9999));
  }

  const filteredMarkets = mandiList.filter(market =>
    market.name.toLowerCase().includes(search.toLowerCase()) ||
    market.location.toLowerCase().includes(search.toLowerCase()) ||
    market.crops.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0, 0, 0, 0.5)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "95%", maxWidth: "1000px",
        height: "90%", display: "flex", flexDirection: "column", boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px", borderBottom: "1px solid #e2e8f0"
        }}>
          <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>🏬 Nearby Marketplace / Mandi</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 28, color: "#8B4513",
            cursor: "pointer", width: 40, height: 40, display: "flex",
            alignItems: "center", justifyContent: "center", borderRadius: 8
          }} aria-label="Close">×</button>
        </div>
        <div style={{ padding: "24px", display: "flex", gap: "20px", borderBottom: "1px solid #e2e8f0", alignItems: 'center' }}>
          <input type="text" placeholder="Search by name, location, or crop..." value={search} onChange={e => setSearch(e.target.value)} style={{
            flex: 1, padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 16,
          }}/>
          <button
            onClick={handleGetLocation}
            style={{
              background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #bbf7d0',
            }}
          >
            {userLocation ? 'Location Set' : 'Use My Location'}
          </button>
        </div>
        {userLocation && (
          <div style={{ padding: '0 24px', color: '#166534', fontSize: 15, marginBottom: 8 }}>
            <strong>Your Location:</strong> {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
          </div>
        )}
        {locError && (
          <div style={{ padding: '0 24px', color: '#dc2626', fontSize: 15, marginBottom: 8 }}>
            {locError}
          </div>
        )}
        {!userLocation && !locError && locationRequested && (
          <div style={{ padding: '0 24px', color: '#6B7280', fontSize: 15, marginBottom: 8 }}>
            Waiting for location permission...
          </div>
        )}
        <div style={{ overflowY: "auto", padding: "24px", flex: 1, background: "#f0f4f8" }}>
          {filteredMarkets.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
              {filteredMarkets.map((market, idx) => (
                <div key={idx} style={{
                  background: "linear-gradient(135deg, #fff, #f9f9f9)",
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
                  <h3 style={{ color: "#14532d", fontWeight: 700, fontSize: 20, margin: 0, marginBottom: 8 }}>{market.name}</h3>
                  <div style={{ color: "#374151", fontSize: 15, marginBottom: 8 }}><strong>Location:</strong> {market.location}</div>
                  <div style={{ color: "#166534", fontSize: 15, marginBottom: 8 }}><strong>Distance:</strong> {market.distance || "-"}</div>
                  <div style={{ color: "#1d4ed8", fontSize: 15, marginBottom: 8 }}><strong>Crops:</strong> {market.crops.join(", ")}</div>
                  <a href={market.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px 18px",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    display: "inline-block",
                    marginTop: 10,
                    alignSelf: 'flex-start',
                    boxShadow: '0 2px 8px #bbf7d0'
                  }}>View on Google Maps →</a>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280", fontSize: 16 }}>
              No marketplaces found matching your criteria.
            </div>
          )}
        </div>
        {/* Google Maps directions to nearest mandi */}
        {userLocation && filteredMarkets.length > 0 && (
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #e2e8f0',
            background: '#f9fafb',
            textAlign: 'center'
          }}>
            <a
              href={`https://www.google.com/maps/search/apmc+near+me/@${userLocation.lat},${userLocation.lng},12z`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                color: '#fff',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: 10,
                fontSize: 18,
                fontWeight: 700,
                display: 'inline-block',
                boxShadow: '0 2px 8px #bbf7d0',
                marginTop: 8
              }}
            >
              View APMC Near Me on Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyMarketplaceModal; 