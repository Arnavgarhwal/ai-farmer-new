import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# Data copied from the frontend
government_schemes_data = [
  {
    "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    "icon": "💰",
    "category": "Direct Income Support",
    "description": "Provides direct income support of ₹6,000 per year to eligible farmer families",
    "eligibility": "Small and marginal farmers with landholding up to 2 hectares",
    "benefits": "₹6,000 per year in 3 equal installments",
    "states": ["All States"],
    "applicationProcess": "Online through PM-KISAN portal or Common Service Centers",
    "website": "https://pmkisan.gov.in",
    "status": "Active"
  },
  {
    "name": "PM Fasal Bima Yojana (PMFBY)",
    "icon": "🛡️",
    "category": "Crop Insurance",
    "description": "Comprehensive crop insurance scheme to protect farmers against natural calamities",
    "eligibility": "All farmers growing notified crops",
    "benefits": "Up to 100% crop loss coverage, low premium rates",
    "states": ["All States"],
    "applicationProcess": "Through banks, insurance companies, or Common Service Centers",
    "website": "https://pmfby.gov.in",
    "status": "Active"
  },
  {
    "name": "Kisan Credit Card (KCC)",
    "icon": "💳",
    "category": "Credit Support",
    "description": "Provides easy access to credit for farmers to meet agricultural needs",
    "eligibility": "All farmers including tenant farmers and sharecroppers",
    "benefits": "Up to ₹3 lakh credit limit, low interest rates, flexible repayment",
    "states": ["All States"],
    "applicationProcess": "Through banks and cooperative societies",
    "website": "https://www.nabard.org",
    "status": "Active"
  },
  {
    "name": "Soil Health Card Scheme",
    "icon": "🌱",
    "category": "Soil Management",
    "description": "Provides soil health cards to farmers with soil testing and recommendations",
    "eligibility": "All farmers",
    "benefits": "Free soil testing, personalized recommendations for fertilizers",
    "states": ["All States"],
    "applicationProcess": "Through agriculture department offices",
    "website": "https://soilhealth.dac.gov.in",
    "status": "Active"
  },
  {
    "name": "PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)",
    "icon": "💧",
    "category": "Irrigation",
    "description": "Comprehensive irrigation scheme to ensure water security",
    "eligibility": "Farmers in water-scarce areas",
    "benefits": "Subsidy for irrigation equipment, micro-irrigation systems",
    "states": ["All States"],
    "applicationProcess": "Through agriculture department and banks",
    "website": "https://pmksy.gov.in",
    "status": "Active"
  },
  {
    "name": "National Agriculture Market (eNAM)",
    "icon": "🏪",
    "category": "Market Access",
    "description": "Online trading platform for agricultural commodities",
    "eligibility": "All farmers and traders",
    "benefits": "Better price discovery, reduced transaction costs",
    "states": ["All States"],
    "applicationProcess": "Online registration through eNAM portal",
    "website": "https://enam.gov.in",
    "status": "Active"
  },
  {
    "name": "PM-FME (Pradhan Mantri Formalisation of Micro Food Processing Enterprises)",
    "icon": "🏭",
    "category": "Food Processing",
    "description": "Support for micro food processing enterprises",
    "eligibility": "Micro food processing units, self-help groups",
    "benefits": "Up to 35% subsidy, credit support, training",
    "states": ["All States"],
    "applicationProcess": "Through state implementing agencies",
    "website": "https://pmfme.mofpi.gov.in",
    "status": "Active"
  },
  {
    "name": "PMKSY-PDMC (Per Drop More Crop)",
    "icon": "💧",
    "category": "Micro Irrigation",
    "description": "Promotes micro irrigation for water conservation",
    "eligibility": "Farmers with small landholdings",
    "benefits": "Up to 55% subsidy for micro irrigation systems",
    "states": ["All States"],
    "applicationProcess": "Through agriculture department",
    "website": "https://pmksy.gov.in",
    "status": "Active"
  },
  {
    "name": "National Mission for Sustainable Agriculture (NMSA)",
    "icon": "🌿",
    "category": "Sustainable Farming",
    "description": "Promotes sustainable agriculture practices",
    "eligibility": "Farmers practicing organic farming",
    "benefits": "Support for organic farming, soil conservation",
    "states": ["All States"],
    "applicationProcess": "Through agriculture department",
    "website": "https://nmsa.dac.gov.in",
    "status": "Active"
  },
  {
    "name": "PM-KMY (Pradhan Mantri Kisan Maan Dhan Yojana)",
    "icon": "👴",
    "category": "Pension Scheme",
    "description": "Pension scheme for small and marginal farmers",
    "eligibility": "Farmers aged 18-40 years with landholding up to 2 hectares",
    "benefits": "₹3,000 monthly pension after 60 years",
    "states": ["All States"],
    "applicationProcess": "Through Common Service Centers",
    "website": "https://pmkmy.gov.in",
    "status": "Active"
  },
  {
    "name": "Maharashtra - Shetkari Sanman Yojana",
    "icon": "🏛️",
    "category": "State Scheme",
    "description": "Direct income support for farmers in Maharashtra",
    "eligibility": "Farmers in Maharashtra",
    "benefits": "₹6,000 per year additional support",
    "states": ["Maharashtra"],
    "applicationProcess": "Through Maharashtra government portal",
    "website": "https://maharashtra.gov.in",
    "status": "Active"
  },
  {
    "name": "Punjab - Bigha Sansad Yojana",
    "icon": "🏛️",
    "category": "State Scheme",
    "description": "Support for farmers in Punjab",
    "eligibility": "Farmers in Punjab",
    "benefits": "Various subsidies and support programs",
    "states": ["Punjab"],
    "applicationProcess": "Through Punjab agriculture department",
    "website": "https://punjab.gov.in",
    "status": "Active"
  }
]

def seed_database():
    """Connects to the database and seeds it with government schemes."""
    try:
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/ai-farmer")
        client = MongoClient(mongo_uri)
        
        # In a typical Mongo URI, the database name is at the end of the path.
        # If not, we default to 'ai-farmer'.
        db_name = MongoClient(mongo_uri).get_database().name
        db = client[db_name]

        print("✅ MongoDB Connected Successfully for seeding")

        schemes_collection = db.schemes

        # Clear existing data
        print(f"Deleting existing documents from '{schemes_collection.name}' collection...")
        schemes_collection.delete_many({})
        print("✅ Cleared existing schemes data.")

        # Insert new data
        if government_schemes_data:
            print(f"Inserting {len(government_schemes_data)} schemes...")
            schemes_collection.insert_many(government_schemes_data)
            print("✅ Successfully inserted schemes into the database.")
        else:
            print("⚠️ No schemes data to insert.")

        client.close()

    except Exception as e:
        print(f"❌ An error occurred during database seeding: {e}")

if __name__ == '__main__':
    seed_database() 