from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173", 
    "https://arnavgarhwal.github.io",
    "https://ai-farmer-new.onrender.com"
])

# Simple file-based storage
DATA_FILE = "data.json"
VISITOR_LOG_FILE = "visitor_log.json"

def load_data():
    """Load data from JSON file"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except:
            return {"users": [], "admins": [], "schemes": [], "crops": []}
    return {"users": [], "admins": [], "schemes": [], "crops": []}

def save_data(data):
    """Save data to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def load_visitor_log():
    """Load visitor log from JSON file"""
    if os.path.exists(VISITOR_LOG_FILE):
        try:
            with open(VISITOR_LOG_FILE, 'r') as f:
                return json.load(f)
        except:
            return {"visits": []}
    return {"visits": []}

def save_visitor_log(log_data):
    """Save visitor log to JSON file"""
    with open(VISITOR_LOG_FILE, 'w') as f:
        json.dump(log_data, f, indent=2)

def record_visit():
    """Record a new visit with timestamp"""
    log_data = load_visitor_log()
    visit = {
        "timestamp": datetime.now().isoformat(),
        "date": datetime.now().strftime("%Y-%m-%d"),
        "time": datetime.now().strftime("%H:%M:%S")
    }
    log_data["visits"].append(visit)
    save_visitor_log(log_data)

def get_visitor_stats():
    """Calculate real visitor statistics"""
    log_data = load_visitor_log()
    visits = log_data.get("visits", [])
    
    now = datetime.now()
    today = now.strftime("%Y-%m-%d")
    week_ago = (now - timedelta(days=7)).strftime("%Y-%m-%d")
    month_ago = (now - timedelta(days=30)).strftime("%Y-%m-%d")
    year_ago = (now - timedelta(days=365)).strftime("%Y-%m-%d")
    
    today_visits = len([v for v in visits if v.get("date") == today])
    week_visits = len([v for v in visits if v.get("date") >= week_ago])
    month_visits = len([v for v in visits if v.get("date") >= month_ago])
    year_visits = len([v for v in visits if v.get("date") >= year_ago])
    total_visits = len(visits)
    
    return {
        "today": today_visits,
        "thisWeek": week_visits,
        "thisMonth": month_visits,
        "thisYear": year_visits,
        "total": total_visits
    }

# Initialize with default admin user
def initialize_data():
    data = load_data()
    if not data.get("admins"):
        data["admins"] = [
            {
                "username": "arnavgarhwal",
                "password": "@Ag12345",  # In production, use hashed passwords
                "email": "admin@intellifarmsystems.com",
                "role": "super_admin",
                "created_at": datetime.now().isoformat()
            }
        ]
        save_data(data)
    return data

# Initialize data on startup
initialize_data()

@app.route('/')
def home():
    # Record a visit when someone accesses the home page
    record_visit()
    return jsonify({"message": "AI Farmer Backend API", "status": "running"})

@app.route('/api/track-visit', methods=['POST'])
def track_visit():
    """Track a new visit"""
    try:
        record_visit()
        return jsonify({"success": True, "message": "Visit recorded"})
    except Exception as e:
        return jsonify({"error": f"Failed to record visit: {str(e)}"}), 500

@app.route('/api/visitor-stats', methods=['GET'])
def visitor_stats():
    """Get real visitor statistics"""
    try:
        stats = get_visitor_stats()
        return jsonify(stats)
    except Exception as e:
        return jsonify({"error": f"Failed to get visitor stats: {str(e)}"}), 500

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400
        
        # Load admin data
        db_data = load_data()
        admins = db_data.get("admins", [])
        
        # Check credentials
        for admin in admins:
            if admin.get("username") == username and admin.get("password") == password:
                return jsonify({
                    "success": True,
                    "message": "Login successful",
                    "token": f"admin_token_{username}_{datetime.now().timestamp()}",
                    "user": {
                        "username": admin.get("username"),
                        "email": admin.get("email"),
                        "role": admin.get("role")
                    }
                })
        
        return jsonify({"error": "Invalid credentials"}), 401
        
    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500

@app.route('/api/admin/dashboard', methods=['GET'])
def admin_dashboard():
    """Get admin dashboard data"""
    try:
        db_data = load_data()
        visitor_stats = get_visitor_stats()
        
        # Mock dashboard data
        dashboard_data = {
            "total_users": len(db_data.get("users", [])),
            "total_schemes": len(db_data.get("schemes", [])),
            "total_crops": len(db_data.get("crops", [])),
            "visitor_stats": visitor_stats,
            "recent_activities": [
                {"action": "User registered", "time": datetime.now().isoformat()},
                {"action": "Scheme added", "time": (datetime.now() - timedelta(hours=2)).isoformat()},
                {"action": "Crop data updated", "time": (datetime.now() - timedelta(hours=5)).isoformat()}
            ],
            "system_stats": {
                "uptime": "24 hours",
                "version": "1.0.0",
                "last_backup": datetime.now().isoformat()
            }
        }
        
        return jsonify(dashboard_data)
        
    except Exception as e:
        return jsonify({"error": f"Failed to load dashboard: {str(e)}"}), 500

@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    """Get all government schemes"""
    try:
        db_data = load_data()
        schemes = db_data.get("schemes", [])
        
        # If no schemes in database, return mock data
        if not schemes:
            schemes = [
                {
                    "id": 1,
                    "name": "PM-KISAN",
                    "description": "Direct income support for farmers",
                    "category": "Income Support",
                    "status": "Active"
                },
                {
                    "id": 2,
                    "name": "PM Fasal Bima Yojana",
                    "description": "Crop insurance scheme",
                    "category": "Insurance",
                    "status": "Active"
                }
            ]
        
        return jsonify({"schemes": schemes})
        
    except Exception as e:
        return jsonify({"error": f"Failed to load schemes: {str(e)}"}), 500

@app.route('/api/crops', methods=['GET'])
def get_crops():
    """Get crop recommendations"""
    try:
        # Mock crop data
        crops = [
            {
                "name": "Rice",
                "season": "Kharif",
                "investment": "Medium",
                "profit_margin": "25-30%"
            },
            {
                "name": "Wheat",
                "season": "Rabi", 
                "investment": "Medium",
                "profit_margin": "20-25%"
            },
            {
                "name": "Cotton",
                "season": "Kharif",
                "investment": "High",
                "profit_margin": "30-40%"
            }
        ]
        
        return jsonify({"crops": crops})
        
    except Exception as e:
        return jsonify({"error": f"Failed to load crops: {str(e)}"}), 500

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """Get weather forecast"""
    try:
        # Mock weather data
        weather_data = {
            "location": "Mumbai, Maharashtra",
            "current": {
                "temperature": 28,
                "humidity": 75,
                "condition": "Partly Cloudy"
            },
            "forecast": [
                {"date": "2024-01-15", "high": 30, "low": 24, "condition": "Sunny"},
                {"date": "2024-01-16", "high": 29, "low": 23, "condition": "Cloudy"},
                {"date": "2024-01-17", "high": 27, "low": 22, "condition": "Rain"}
            ]
        }
        
        return jsonify(weather_data)
        
    except Exception as e:
        return jsonify({"error": f"Failed to load weather: {str(e)}"}), 500

@app.route('/api/market-prices', methods=['GET'])
def get_market_prices():
    """Get current market prices"""
    try:
        # Mock market price data
        prices = [
            {"crop": "Rice", "price": "₹1800/quintal", "trend": "up"},
            {"crop": "Wheat", "price": "₹1900/quintal", "trend": "stable"},
            {"crop": "Cotton", "price": "₹5500/quintal", "trend": "down"}
        ]
        
        return jsonify({"prices": prices})
        
    except Exception as e:
        return jsonify({"error": f"Failed to load market prices: {str(e)}"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

if __name__ == '__main__':
    print("🚀 Starting AI Farmer Backend Server...")
    print("✅ No database required - using file-based storage")
    print("🌐 Server will be available at: http://127.0.0.1:5000")
    print("🔑 Default admin credentials: arnavgarhwal / @Ag12345")
    
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port) 