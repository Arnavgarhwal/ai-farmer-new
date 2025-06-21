#!/usr/bin/env python3
"""
Simple test to see what's running on Render
"""
import requests

def test_render():
    base_url = "https://ai-farmer-new.onrender.com"
    
    print("🔍 Testing Render deployment...")
    print("=" * 50)
    
    # Test 1: Basic connectivity
    try:
        response = requests.get(base_url, timeout=10)
        print(f"✅ Basic connectivity: {response.status_code}")
        print(f"   Response: {response.text[:200]}...")
    except Exception as e:
        print(f"❌ Basic connectivity failed: {e}")
    
    # Test 2: Check if it's a different app
    try:
        response = requests.get(f"{base_url}/health", timeout=10)
        print(f"✅ Health endpoint: {response.status_code}")
        print(f"   Response: {response.text[:200]}...")
    except Exception as e:
        print(f"❌ Health endpoint failed: {e}")
    
    # Test 3: Check headers
    try:
        response = requests.get(base_url, timeout=10)
        print(f"✅ Headers check:")
        for key, value in response.headers.items():
            if 'server' in key.lower() or 'x-' in key.lower():
                print(f"   {key}: {value}")
    except Exception as e:
        print(f"❌ Headers check failed: {e}")

if __name__ == "__main__":
    test_render() 