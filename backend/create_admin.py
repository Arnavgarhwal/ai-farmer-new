import os
from pymongo import MongoClient
from dotenv import load_dotenv
from models import Admin

load_dotenv()

def create_admin_user():
    """Creates a new admin user in the database."""
    try:
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai-farmer")
        client = MongoClient(mongo_uri)
        db_name = MongoClient(mongo_uri).get_database().name
        db = client[db_name]
        
        print("✅ MongoDB Connected Successfully for admin creation")

        admins_collection = db.admins

        # --- IMPORTANT: Set your admin credentials here ---
        admin_username = "admin"
        admin_password = "password" 
        
        # Check if admin already exists
        if admins_collection.find_one({"username": admin_username}):
            print(f"⚠️ Admin user '{admin_username}' already exists.")
            return

        # Create and insert new admin
        new_admin = Admin(username=admin_username, password=admin_password)
        admins_collection.insert_one(new_admin.to_document())
        
        print(f"✅ Successfully created admin user: '{admin_username}'")
        client.close()

    except Exception as e:
        print(f"❌ An error occurred during admin creation: {e}")

if __name__ == '__main__':
    create_admin_user() 