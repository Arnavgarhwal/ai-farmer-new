from flask import Flask, request, jsonify, send_from_directory
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
import jwt
from functools import wraps

app = Flask(__name__, static_folder='../aifarmerUI/dist', static_url_path='/')

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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

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
    """Predict prices for next 3 months based on location and crop"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.json
        crop = data.get('crop')
        state = data.get('state')
        district = data.get('district')
        harvest_date = data.get('harvest_date')
        
        if not all([crop, state, district, harvest_date]):
            return jsonify({'error': 'crop, state, district and harvest_date required'}), 400
        
        try:
            harvest_date = datetime.strptime(harvest_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Find the best matching mandi for this location
        location_mandis = mandi_data[
            (mandi_data['state'] == state) & 
            (mandi_data['district'] == district)
        ]
        
        if location_mandis.empty:
            # If no exact match, find mandis in the same state
            location_mandis = mandi_data[mandi_data['state'] == state]
        
        if location_mandis.empty:
            return jsonify({'error': f'No mandi data available for {district}, {state}'}), 400
        
        # Get the first available mandi for this location
        mandi_id = location_mandis.iloc[0]['mandi_id']
        
        # Check if we have a model for this crop-mandi combination
        model_key = (crop, int(mandi_id))
        if model_key not in ml_models:
            # Use a default model if specific one doesn't exist
            available_models = list(ml_models.keys())
            if available_models:
                model_key = available_models[0]  # Use first available model
            else:
                return jsonify({'error': f'No prediction model available for {crop}'}), 400
        
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
            
            # Get predicted price using ML model
            model_key = (crop, int(mandi_id))
            if model_key not in ml_models:
                # Use a default model if specific one doesn't exist
                available_models = list(ml_models.keys())
                if available_models:
                    model_key = available_models[0]
                    # Make prediction using the default model
                    features = {
                        'day_of_year': date.dayofyear,
                        'month': date.month,
                        'year': date.year,
                        'rainfall': np.random.uniform(0, 50),
                        'temperature': np.random.uniform(15, 35)
                    }
                    X_pred = pd.DataFrame([features])
                    predicted_price = ml_models[model_key].predict(X_pred)[0]
                else:
                    # Fallback prediction with seasonal adjustments
                    seasonal_factor = 1.0
                    harvest_month = date.month
                    
                    # Seasonal price variations
                    if crop in ['Tomato', 'Onion', 'Potato']:
                        # Vegetables have high seasonal variation
                        if harvest_month in [6, 7, 8]:  # Monsoon months
                            seasonal_factor = 1.3  # Higher prices due to supply constraints
                        elif harvest_month in [10, 11, 12]:  # Peak harvest
                            seasonal_factor = 0.8  # Lower prices due to high supply
                    elif crop in ['Rice', 'Wheat']:
                        # Staple crops have moderate seasonal variation
                        if harvest_month in [10, 11]:  # Peak harvest
                            seasonal_factor = 0.9
                        elif harvest_month in [3, 4, 5]:  # Pre-harvest
                            seasonal_factor = 1.1
                    elif crop in ['Cotton', 'Sugarcane']:
                        # Cash crops have specific harvest seasons
                        if crop == 'Cotton' and harvest_month in [10, 11, 12]:
                            seasonal_factor = 0.85  # Peak cotton harvest
                        elif crop == 'Sugarcane' and harvest_month in [2, 3, 4]:
                            seasonal_factor = 0.9  # Peak sugarcane harvest
                    
                    # Add some randomness and market trend
                    trend_factor = 1 + np.random.uniform(-0.15, 0.25)
                    predicted_price = ml_models[model_key].predict(X_pred)[0] * seasonal_factor * trend_factor
            else:
                # Make prediction using the specific model
                features = {
                    'day_of_year': date.dayofyear,
                    'month': date.month,
                    'year': date.year,
                    'rainfall': np.random.uniform(0, 50),
                    'temperature': np.random.uniform(15, 35)
                }
                X_pred = pd.DataFrame([features])
                predicted_price = ml_models[model_key].predict(X_pred)[0]
            
            predictions.append({
                'date': date.strftime('%Y-%m-%d'),
                'predicted_price': round(float(predicted_price), 2),
                'rainfall': round(float(weather_data['rainfall']), 1),
                'temperature': round(float(weather_data['temperature']), 1),
                'confidence': round(np.random.uniform(75, 95), 1)  # Mock confidence score
            })
        
        # Generate market analysis
        prices = [p['predicted_price'] for p in predictions]
        avg_price = np.mean(prices)
        price_trend = "Stable"
        if prices[-1] > prices[0] * 1.1:
            price_trend = "Upward"
        elif prices[-1] < prices[0] * 0.9:
            price_trend = "Downward"
        
        # Generate recommendations
        recommendation = f"Based on current market trends, {crop} prices are expected to be {price_trend.lower()}. "
        if price_trend == "Upward":
            recommendation += "Consider holding your produce for better prices."
        elif price_trend == "Downward":
            recommendation += "Consider selling early to maximize profits."
        else:
            recommendation += "Market appears stable, plan your harvest timing based on your storage capacity."
        
        # Generate risk factors
        risk_factors = []
        if avg_price < 1500:
            risk_factors.append("Low market prices may affect profitability")
        if max(prices) - min(prices) > 500:
            risk_factors.append("High price volatility expected")
        if any(p['rainfall'] > 40 for p in predictions[:30]):
            risk_factors.append("Heavy rainfall may affect harvest quality")
        if any(p['temperature'] > 35 for p in predictions[:30]):
            risk_factors.append("High temperatures may impact crop yield")
        
        return jsonify({
            'crop': crop,
            'state': state,
            'district': district,
            'harvest_date': harvest_date.strftime('%Y-%m-%d'),
            'predictions': predictions,
            'analysis': {
                'trend': price_trend,
                'recommendation': recommendation,
                'risk_factors': risk_factors
            }
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

@app.route('/api/mandi-prices', methods=['POST', 'OPTIONS'])
def get_mandi_prices_for_prediction():
    """Get current and predicted prices for multiple mandis for a specific crop"""
    if request.method == 'OPTIONS':
        return '', 200
    try:
        data = request.json
        crop = data.get('cropName')
        state = data.get('state')
        district = data.get('district')
        harvest_date = data.get('harvestDate')
        
        if not all([crop, state, district, harvest_date]):
            return jsonify({'error': 'cropName, state, district and harvestDate required'}), 400
        
        try:
            harvest_date = datetime.strptime(harvest_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Get mandis in the same state or nearby
        state_mandis = mandi_data[mandi_data['state'] == state]
        
        if state_mandis.empty:
            # If no mandis in the state, get some popular mandis
            state_mandis = mandi_data.head(5)
        
        # Limit to 5 mandis for the results
        selected_mandis = state_mandis.head(5)
        
        mandi_prices = []
        
        for _, mandi in selected_mandis.iterrows():
            mandi_id = int(mandi['mandi_id'])
            
            # Get current price (mock data based on crop and mandi)
            base_prices = {
                'Rice': 1800,
                'Wheat': 1900,
                'Cotton': 5000,
                'Sugarcane': 2500,
                'Maize': 1700,
                'Tomato': 1200,
                'Onion': 800,
                'Potato': 600,
                'Corn': 1700,
                'Soybean': 3500,
                'Pulses': 4500,
                'Vegetables': 1000,
                'Fruits': 2000,
                'Spices': 8000,
                'Tea': 12000,
                'Coffee': 15000
            }
            
            current_price = base_prices.get(crop, 1500)
            # Add some variation based on mandi_id and crop type
            variation_factor = (mandi_id * 50) % 500
            if crop in ['Rice', 'Wheat']:
                variation_factor = variation_factor * 0.8  # Less variation for staples
            elif crop in ['Tomato', 'Onion', 'Potato']:
                variation_factor = variation_factor * 1.5  # More variation for vegetables
            elif crop in ['Cotton', 'Sugarcane']:
                variation_factor = variation_factor * 1.2  # Moderate variation for cash crops
            
            current_price += variation_factor
            
            # Get predicted price using ML model
            model_key = (crop, mandi_id)
            if model_key not in ml_models:
                # Use a default model if specific one doesn't exist
                available_models = list(ml_models.keys())
                if available_models:
                    model_key = available_models[0]
                    # Make prediction using the default model
                    features = {
                        'day_of_year': harvest_date.dayofyear,
                        'month': harvest_date.month,
                        'year': harvest_date.year,
                        'rainfall': np.random.uniform(0, 50),
                        'temperature': np.random.uniform(15, 35)
                    }
                    X_pred = pd.DataFrame([features])
                    predicted_price = ml_models[model_key].predict(X_pred)[0]
                else:
                    # Fallback prediction with seasonal adjustments
                    seasonal_factor = 1.0
                    harvest_month = harvest_date.month
                    
                    # Seasonal price variations
                    if crop in ['Tomato', 'Onion', 'Potato']:
                        # Vegetables have high seasonal variation
                        if harvest_month in [6, 7, 8]:  # Monsoon months
                            seasonal_factor = 1.3  # Higher prices due to supply constraints
                        elif harvest_month in [10, 11, 12]:  # Peak harvest
                            seasonal_factor = 0.8  # Lower prices due to high supply
                    elif crop in ['Rice', 'Wheat']:
                        # Staple crops have moderate seasonal variation
                        if harvest_month in [10, 11]:  # Peak harvest
                            seasonal_factor = 0.9
                        elif harvest_month in [3, 4, 5]:  # Pre-harvest
                            seasonal_factor = 1.1
                    elif crop in ['Cotton', 'Sugarcane']:
                        # Cash crops have specific harvest seasons
                        if crop == 'Cotton' and harvest_month in [10, 11, 12]:
                            seasonal_factor = 0.85  # Peak cotton harvest
                        elif crop == 'Sugarcane' and harvest_month in [2, 3, 4]:
                            seasonal_factor = 0.9  # Peak sugarcane harvest
                    
                    # Add some randomness and market trend
                    trend_factor = 1 + np.random.uniform(-0.15, 0.25)
                    predicted_price = current_price * seasonal_factor * trend_factor
            else:
                # Make prediction using the specific model
                features = {
                    'day_of_year': harvest_date.dayofyear,
                    'month': harvest_date.month,
                    'year': harvest_date.year,
                    'rainfall': np.random.uniform(0, 50),
                    'temperature': np.random.uniform(15, 35)
                }
                X_pred = pd.DataFrame([features])
                predicted_price = ml_models[model_key].predict(X_pred)[0]
            
            price_change = predicted_price - current_price
            price_change_percent = (price_change / current_price) * 100
            
            # Generate distance based on mandi_id
            distances = ["3.5 km", "5.2 km", "8.1 km", "12.8 km", "15.3 km"]
            distance = distances[mandi_id % len(distances)]
            
            mandi_prices.append({
                'mandiName': mandi['mandi_name'],
                'location': f"{mandi['district']}, {mandi['state']}",
                'currentPrice': round(float(current_price), 2),
                'predictedPrice': round(float(predicted_price), 2),
                'priceChange': round(float(price_change), 2),
                'priceChangePercent': round(float(price_change_percent), 1),
                'distance': distance,
                'lastUpdated': datetime.now().strftime('%Y-%m-%d')
            })
        
        return jsonify({
            'success': True,
            'mandiPrices': mandi_prices,
            'crop': crop,
            'state': state,
            'district': district,
            'harvestDate': harvest_date.strftime('%Y-%m-%d')
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to get mandi prices: {str(e)}"}), 500

if __name__ == '__main__':
    print("🚀 Starting AI Farmer Backend Server...")
    print("✅ No database required - using file-based storage")
    print("🤖 ML models loaded for price prediction")
    print("🌐 Server will be available at: http://127.0.0.1:5000")
    print("🔑 Default admin credentials: arnavgarhwal / @Ag12345")
    app.run(debug=True, host='0.0.0.0', port=5000) 