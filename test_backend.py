#!/usr/bin/env python3
"""
Simple test script to verify the backend API is working
"""
import requests
import json

# Test the backend API
BACKEND_URL = "https://ai-farmer-new.onrender.com"

def test_endpoint(endpoint, method="GET", data=None):
    """Test a specific endpoint"""
    url = f"{BACKEND_URL}{endpoint}"
    headers = {
        "Content-Type": "application/json",
        "Origin": "https://arnavgarhwal.github.io"
    }
    
    try:
        if method == "GET":
            response = requests.get(url, headers=headers)
        elif method == "POST":
            response = requests.post(url, headers=headers, json=data)
        elif method == "OPTIONS":
            response = requests.options(url, headers=headers)
        
        print(f"✅ {method} {endpoint}: {response.status_code}")
        if response.headers.get('Access-Control-Allow-Origin'):
            print(f"   CORS: {response.headers.get('Access-Control-Allow-Origin')}")
        else:
            print(f"   ❌ No CORS headers found")
        
        if response.status_code == 200:
            try:
                print(f"   Response: {response.json()}")
            except:
                print(f"   Response: {response.text[:100]}...")
        
        return response.status_code == 200
    except Exception as e:
        print(f"❌ {method} {endpoint}: Error - {str(e)}")
        return False

def main():
    print("🧪 Testing AI Farmer Backend API")
    print("=" * 50)
    
    # Test basic endpoints
    test_endpoint("/")
    test_endpoint("/api/test-cors")
    test_endpoint("/api/visitor-stats")
    
    # Test OPTIONS requests (CORS preflight)
    test_endpoint("/api/track-visit", "OPTIONS")
    test_endpoint("/api/admin/login", "OPTIONS")
    
    # Test POST requests
    test_endpoint("/api/track-visit", "POST", {})
    test_endpoint("/api/admin/login", "POST", {"username": "test", "password": "test"})
    
    print("\n" + "=" * 50)
    print("🎯 Test completed!")

if __name__ == "__main__":
    main() 