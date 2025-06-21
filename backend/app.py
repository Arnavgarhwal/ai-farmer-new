import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- Database Connection ---
try:
    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai-farmer")
    client = MongoClient(mongo_uri)
    db = client.get_default_database()
    
    # Check if the connection is successful
    client.admin.command('ping')
    print("✅ MongoDB Connected Successfully")

except Exception as e:
    print(f"❌ Database connection failed: {e}")
    db = None

# --- API Endpoints ---

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Intellifarm Systems Python Backend!"})

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    if not db:
        return jsonify({"error": "Database not connected"}), 500

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # This is a placeholder for actual admin authentication
    # In a real application, you would query the database and check hashed passwords
    if username == "admin" and password == "password":
        # In a real app, you'd return a JWT token here
        return jsonify({"message": "Admin login successful", "token": "fake-jwt-token-for-dev"})
    else:
        return jsonify({"error": "Invalid credentials"}), 401


# --- Main Execution ---
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port) 