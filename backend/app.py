from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import random
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

app = Flask(__name__)

# Use permissive CORS for now to ensure it works
CORS(app, origins="*", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Simple file-based storage
DATA_FILE = "data.json"
VISITOR_LOG_FILE = "visitor_log.json"

# ML Model Setup
def initialize_ml_models():
    """Initialize ML models for price prediction"""
    print("🤖 Initializing ML models for price prediction...")
    
    # Mock database for mandi prices
    crop_data = pd.DataFrame({
        'mandi_id': [1, 1, 2, 2, 3, 3, 4, 4],
        'mandi_name': ['Azadpur Mandi', 'Azadpur Mandi', 'Nagpur APMC', 'Nagpur APMC', 
                      'Bangalore APMC', 'Bangalore APMC', 'Chennai Koyambedu', 'Chennai Koyambedu'],
        'state': ['Delhi', 'Delhi', 'Maharashtra', 'Maharashtra', 
                 'Karnataka', 'Karnataka', 'Tamil Nadu', 'Tamil Nadu'],
        'district': ['North Delhi', 'North Delhi', 'Nagpur', 'Nagpur', 
                    'Bangalore Urban', 'Bangalore Urban', 'Chennai', 'Chennai'],
        'crop': ['Tomato', 'Onion', 'Tomato', 'Onion', 
                'Tomato', 'Potato', 'Onion', 'Potato'],
        'min_price': [1200, 1800, 1100, 1700, 1150, 1600, 1250, 1550],
        'max_price': [1500, 2200, 1400, 2100, 1450, 1900, 1600, 1800],
        'modal_price': [1350, 2000, 1250, 1900, 1300, 1750, 1400, 1650],
        'last_updated': ['2023-11-20']*8
    })

    # Historical data for ML training (mock - in production use real historical data)
    date_range = pd.date_range(end=datetime.today(), periods=365*3)
    historical_data = pd.DataFrame({
        'date': np.random.choice(date_range, 1000),
        'mandi_id': np.random.randint(1, 5, 1000),
        'crop': np.random.choice(['Tomato', 'Onion', 'Potato'], 1000),
        'modal_price': np.random.randint(1000, 2500, 1000),
        'rainfall': np.random.uniform(0, 50, 1000),
        'temperature': np.random.uniform(15, 35, 1000)
    })

    # Train ML models for each crop-mandi combination
    models = {}

    for crop in ['Tomato', 'Onion', 'Potato']:
        for mandi in [1, 2, 3, 4]:
            # Filter data for this crop-mandi combination
            data = historical_data[(historical_data['crop'] == crop) & 
                                  (historical_data['mandi_id'] == mandi)].copy()
            
            if len(data) > 10:  # Only train if we have enough data
                # Feature engineering
                data['day_of_year'] = data['date'].dt.dayofyear
                data['month'] = data['date'].dt.month
                data['year'] = data['date'].dt.year
                
                # Split into features and target
                X = data[['day_of_year', 'month', 'year', 'rainfall', 'temperature']]
                y = data['modal_price']
                
                # Train-test split
                X_train, X_test, y_train, y_test = train_test_split(
                    X, y, test_size=0.2, random_state=42)
                
                # Train model
                model = RandomForestRegressor(n_estimators=100, random_state=42)
                model.fit(X_train, y_train)
                
                # Evaluate
                y_pred = model.predict(X_test)
                mae = mean_absolute_error(y_test, y_pred)
                print(f"✅ Trained model for {crop} at mandi {mandi} - MAE: {mae:.2f}")
                
                # Store model
                models[(crop, mandi)] = model

    # Save models to disk
    try:
        joblib.dump(models, 'crop_price_models.pkl')
        print("💾 ML models saved successfully")
    except Exception as e:
        print(f"⚠️ Could not save models: {e}")
    
    return models, crop_data

# Initialize ML models
try:
    ml_models, mandi_data = initialize_ml_models()
    print("🎯 ML models initialized successfully")
except Exception as e:
    print(f"❌ Error initializing ML models: {e}")
    ml_models, mandi_data = {}, pd.DataFrame()

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

@app.route('/api/test-cors', methods=['GET', 'POST', 'OPTIONS'])
def test_cors():
    """Test endpoint to verify CORS is working"""
    if request.method == 'OPTIONS':
        return '', 200
    return jsonify({"message": "CORS is working!", "method": request.method})

@app.route('/api/track-visit', methods=['POST', 'OPTIONS'])
def track_visit():
    """Track a new visit"""
    print(f"Track visit called with method: {request.method}")
    print(f"Headers: {dict(request.headers)}")
    if request.method == 'OPTIONS':
        print("Handling OPTIONS request for track-visit")
        return '', 200
    try:
        record_visit()
        return jsonify({"success": True, "message": "Visit recorded"})
    except Exception as e:
        print(f"Error tracking visit: {str(e)}")
        return jsonify({"error": f"Failed to record visit: {str(e)}"}), 500

@app.route('/api/visitor-stats', methods=['GET', 'OPTIONS'])
def visitor_stats():
    """Get real visitor statistics"""
    print(f"Visitor stats called with method: {request.method}")
    if request.method == 'OPTIONS':
        print("Handling OPTIONS request for visitor-stats")
        return '', 200
    try:
        stats = get_visitor_stats()
        return jsonify(stats)
    except Exception as e:
        print(f"Error getting visitor stats: {str(e)}")
        return jsonify({"error": f"Failed to get visitor stats: {str(e)}"}), 500

@app.route('/api/admin/login', methods=['POST', 'OPTIONS'])
def admin_login():
    print(f"Admin login called with method: {request.method}")
    print(f"Headers: {dict(request.headers)}")
    if request.method == 'OPTIONS':
        print("Handling OPTIONS request for admin-login")
        return '', 200
    try:
        data = request.get_json()
        print(f"Login attempt received: {data}")
        
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
                print(f"Successful login for user: {username}")
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
        
        print(f"Failed login attempt for user: {username}")
        return jsonify({"error": "Invalid credentials"}), 401
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": f"Login failed: {str(e)}"}), 500

@app.route('/api/admin/dashboard', methods=['GET', 'OPTIONS'])
def admin_dashboard():
    """Get admin dashboard data"""
    if request.method == 'OPTIONS':
        return '', 200
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
                "version": "2.0.0",
                "last_backup": datetime.now().isoformat()
            }
        }
        
        return jsonify(dashboard_data)
        
    except Exception as e:
        return jsonify({"error": f"Failed to load dashboard: {str(e)}"}), 500

# ML Price Prediction Endpoints
@app.route('/api/mandis', methods=['GET', 'OPTIONS'])
def get_mandis():
    """Get list of all mandis"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        mandis = mandi_data[['mandi_id', 'mandi_name', 'state', 'district']].drop_duplicates()
        return jsonify(mandis.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": f"Failed to get mandis: {str(e)}"}), 500

@app.route('/api/crops', methods=['GET', 'OPTIONS'])
def get_crops():
    """Get list of all crops"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        crops = mandi_data['crop'].unique().tolist()
        return jsonify(crops)
    except Exception as e:
        return jsonify({"error": f"Failed to get crops: {str(e)}"}), 500

@app.route('/api/current_prices', methods=['GET', 'OPTIONS'])
def get_current_prices():
    """Get current prices for all crops in all mandis"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        return jsonify(mandi_data.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": f"Failed to get current prices: {str(e)}"}), 500

@app.route('/api/mandi_prices', methods=['GET', 'OPTIONS'])
def get_mandi_prices():
    """Get prices for specific mandi"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        mandi_id = request.args.get('mandi_id')
        if not mandi_id:
            return jsonify({'error': 'mandi_id parameter required'}), 400
        
        prices = mandi_data[mandi_data['mandi_id'] == int(mandi_id)]
        return jsonify(prices.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": f"Failed to get mandi prices: {str(e)}"}), 500

@app.route('/api/crop_prices', methods=['GET', 'OPTIONS'])
def get_crop_prices():
    """Get prices for specific crop across all mandis"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        crop = request.args.get('crop')
        if not crop:
            return jsonify({'error': 'crop parameter required'}), 400
        
        prices = mandi_data[mandi_data['crop'] == crop]
        return jsonify(prices.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": f"Failed to get crop prices: {str(e)}"}), 500

@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def predict_prices():
    """Predict prices for next 3 months"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.json
        mandi_id = data.get('mandi_id')
        crop = data.get('crop')
        harvest_date = data.get('harvest_date')
        
        if not all([mandi_id, crop, harvest_date]):
            return jsonify({'error': 'mandi_id, crop and harvest_date required'}), 400
        
        try:
            harvest_date = datetime.strptime(harvest_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Check if we have a model for this crop-mandi combination
        model_key = (crop, int(mandi_id))
        if model_key not in ml_models:
            return jsonify({'error': f'No prediction model available for {crop} at this mandi'}), 400
        
        # Generate predictions for next 90 days
        prediction_dates = [harvest_date + timedelta(days=i) for i in range(90)]
        
        predictions = []
        for date in prediction_dates:
            # In production, you would fetch actual weather forecasts
            weather_data = {
                'rainfall': np.random.uniform(0, 50),
                'temperature': np.random.uniform(15, 35)
            }
            
            features = {
                'day_of_year': date.dayofyear,
                'month': date.month,
                'year': date.year,
                'rainfall': weather_data['rainfall'],
                'temperature': weather_data['temperature']
            }
            
            # Convert to DataFrame for prediction
            X_pred = pd.DataFrame([features])
            
            # Make prediction
            predicted_price = ml_models[model_key].predict(X_pred)[0]
            
            predictions.append({
                'date': date.strftime('%Y-%m-%d'),
                'predicted_price': round(float(predicted_price), 2),
                'rainfall': round(float(weather_data['rainfall']), 1),
                'temperature': round(float(weather_data['temperature']), 1)
            })
        
        return jsonify({
            'mandi_id': mandi_id,
            'crop': crop,
            'predictions': predictions
        })
    except Exception as e:
        return jsonify({"error": f"Failed to predict prices: {str(e)}"}), 500

@app.route('/api/weather', methods=['GET', 'OPTIONS'])
def get_weather():
    """Get weather forecast (mock)"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        # In production, integrate with actual weather API
        lat = request.args.get('lat')
        lon = request.args.get('lon')
        
        if not lat or not lon:
            return jsonify({'error': 'lat and lon parameters required'}), 400
        
        # Mock weather data
        forecast = []
        for i in range(14):  # 14 day forecast
            date = (datetime.today() + timedelta(days=i)).strftime('%Y-%m-%d')
            forecast.append({
                'date': date,
                'rainfall': round(np.random.uniform(0, 20), 1),
                'temperature': round(np.random.uniform(20, 35), 1),
                'humidity': round(np.random.uniform(40, 90), 1)
            })
        
        return jsonify({
            'location': {'lat': lat, 'lon': lon},
            'forecast': forecast
        })
    except Exception as e:
        return jsonify({"error": f"Failed to get weather: {str(e)}"}), 500

# Keep existing endpoints for backward compatibility
@app.route('/api/schemes', methods=['GET', 'OPTIONS'])
def get_schemes():
    """Get all government schemes"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        db_data = load_data()
        schemes = db_data.get("schemes", [])
        
        # If no schemes in database, return mock data
        if not schemes:
            schemes = [
                {
                    "id": 1,
                    "name": "PM-KISAN",
                    "description": "Direct income support of Rs. 6000 per year to farmers",
                    "category": "Income Support",
                    "eligibility": "Small and marginal farmers",
                    "amount": "Rs. 6000/year",
                    "deadline": "2024-12-31"
                },
                {
                    "id": 2,
                    "name": "PM Fasal Bima Yojana",
                    "description": "Crop insurance scheme for farmers",
                    "category": "Insurance",
                    "eligibility": "All farmers",
                    "amount": "Up to 100% coverage",
                    "deadline": "Ongoing"
                }
            ]
        
        return jsonify(schemes)
    except Exception as e:
        return jsonify({"error": f"Failed to get schemes: {str(e)}"}), 500

@app.route('/api/weather-updates', methods=['GET', 'OPTIONS'])
def get_weather_updates():
    """Get weather updates"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        weather_data = {
            "current": {
                "temperature": random.randint(20, 35),
                "humidity": random.randint(40, 80),
                "condition": random.choice(["Sunny", "Cloudy", "Rainy", "Partly Cloudy"])
            },
            "forecast": [
                {
                    "date": (datetime.now() + timedelta(days=i)).strftime("%Y-%m-%d"),
                    "temperature": random.randint(18, 38),
                    "condition": random.choice(["Sunny", "Cloudy", "Rainy", "Partly Cloudy"])
                } for i in range(7)
            ]
        }
        return jsonify(weather_data)
    except Exception as e:
        return jsonify({"error": f"Failed to get weather updates: {str(e)}"}), 500

@app.route('/api/market-prices', methods=['GET', 'OPTIONS'])
def get_market_prices():
    """Get market prices"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        prices = [
            {"crop": "Rice", "price": random.randint(1500, 2500), "unit": "per quintal"},
            {"crop": "Wheat", "price": random.randint(1800, 2200), "unit": "per quintal"},
            {"crop": "Corn", "price": random.randint(1200, 1800), "unit": "per quintal"}
        ]
        return jsonify(prices)
    except Exception as e:
        return jsonify({"error": f"Failed to get market prices: {str(e)}"}), 500

@app.route('/api/health', methods=['GET', 'OPTIONS'])
def health_check():
    """Health check endpoint"""
    if request.method == 'OPTIONS':
        return '', 200
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0",
        "features": ["visitor_tracking", "admin_dashboard", "ml_price_prediction", "weather_forecast"]
    })

if __name__ == '__main__':
    print("🚀 Starting AI Farmer Backend Server...")
    print("✅ No database required - using file-based storage")
    print("🤖 ML models loaded for price prediction")
    print("🌐 Server will be available at: http://127.0.0.1:5000")
    print("🔑 Default admin credentials: arnavgarhwal / @Ag12345")
    app.run(debug=True, host='0.0.0.0', port=5000) 