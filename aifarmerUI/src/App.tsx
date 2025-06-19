import React, { useState, useEffect } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";

const MOCK_MARKETS = [
  { name: "Agro Market A", distance: "5 km" },
  { name: "Green Valley Market", distance: "12 km" },
  { name: "Farmers' Hub", distance: "20 km" },
];
const MOCK_PRICES: { [key: string]: { min: number; max: number; period: string } } = {
  wheat: { min: 1800, max: 2200, period: "March - April" },
  rice: { min: 1500, max: 2000, period: "October - November" },
  maize: { min: 1200, max: 1700, period: "September - October" },
};

// All States and Union Territories of India
const INDIAN_STATES = [
  { id: "AP", name: "Andhra Pradesh" },
  { id: "AR", name: "Arunachal Pradesh" },
  { id: "AS", name: "Assam" },
  { id: "BR", name: "Bihar" },
  { id: "CT", name: "Chhattisgarh" },
  { id: "GA", name: "Goa" },
  { id: "GJ", name: "Gujarat" },
  { id: "HR", name: "Haryana" },
  { id: "HP", name: "Himachal Pradesh" },
  { id: "JH", name: "Jharkhand" },
  { id: "KA", name: "Karnataka" },
  { id: "KL", name: "Kerala" },
  { id: "MP", name: "Madhya Pradesh" },
  { id: "MH", name: "Maharashtra" },
  { id: "MN", name: "Manipur" },
  { id: "ML", name: "Meghalaya" },
  { id: "MZ", name: "Mizoram" },
  { id: "NL", name: "Nagaland" },
  { id: "OR", name: "Odisha" },
  { id: "PB", name: "Punjab" },
  { id: "RJ", name: "Rajasthan" },
  { id: "SK", name: "Sikkim" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "TG", name: "Telangana" },
  { id: "TR", name: "Tripura" },
  { id: "UP", name: "Uttar Pradesh" },
  { id: "UT", name: "Uttarakhand" },
  { id: "WB", name: "West Bengal" },
  // Union Territories
  { id: "AN", name: "Andaman and Nicobar Islands" },
  { id: "CH", name: "Chandigarh" },
  { id: "DN", name: "Dadra and Nagar Haveli and Daman and Diu" },
  { id: "DL", name: "Delhi" },
  { id: "JK", name: "Jammu and Kashmir" },
  { id: "LA", name: "Ladakh" },
  { id: "LD", name: "Lakshadweep" },
  { id: "PY", name: "Puducherry" }
];

// Equipment Data
const equipmentList = [
  {
    name: "Tractor",
    icon: "🚜",
    category: "Machinery",
    priceRange: "₹3,00,000 - ₹10,00,000",
    features: [
      "20-60 HP engine options",
      "4WD/2WD variants",
      "Hydraulic lift, PTO, and drawbar",
      "Fuel efficient, easy maintenance"
    ],
    suitableFor: ["Land preparation", "Sowing", "Transport"],
    maintenance: "Regular oil changes, filter cleaning, and timely servicing."
  },
  {
    name: "Rotavator",
    icon: "🪓",
    category: "Implement",
    priceRange: "₹60,000 - ₹1,50,000",
    features: [
      "Efficient soil pulverization",
      "Reduces weed growth",
      "Saves time and labor"
    ],
    suitableFor: ["Seedbed preparation", "Weed control"],
    maintenance: "Check blades for wear, lubricate moving parts."
  },
  {
    name: "Seed Drill",
    icon: "🌱",
    category: "Implement",
    priceRange: "₹40,000 - ₹1,20,000",
    features: [
      "Uniform seed placement",
      "Reduces seed wastage",
      "Improves germination rates"
    ],
    suitableFor: ["Sowing wheat, rice, pulses, oilseeds"],
    maintenance: "Clean after use, check for blockages."
  },
  {
    name: "Sprinkler Irrigation System",
    icon: "💧",
    category: "Irrigation",
    priceRange: "₹25,000 - ₹1,00,000 per acre",
    features: [
      "Uniform water distribution",
      "Reduces water usage",
      "Suitable for most crops"
    ],
    suitableFor: ["Vegetables", "Cereals", "Pulses"],
    maintenance: "Check for leaks, clean nozzles regularly."
  },
  {
    name: "Drip Irrigation System",
    icon: "💦",
    category: "Irrigation",
    priceRange: "₹35,000 - ₹1,20,000 per acre",
    features: [
      "Targeted water delivery",
      "Reduces evaporation loss",
      "Ideal for row crops, fruits"
    ],
    suitableFor: ["Fruits", "Vegetables", "Flowers"],
    maintenance: "Flush lines, check emitters for clogging."
  },
  {
    name: "Combine Harvester",
    icon: "🚜",
    category: "Machinery",
    priceRange: "₹15,00,000 - ₹30,00,000",
    features: [
      "Harvests, threshes, and cleans in one pass",
      "Saves labor and time",
      "Reduces grain loss"
    ],
    suitableFor: ["Wheat", "Rice", "Maize"],
    maintenance: "Clean after use, check belts and blades."
  },
  {
    name: "Cold Storage Unit",
    icon: "❄️",
    category: "Storage",
    priceRange: "₹2,00,000 - ₹10,00,000",
    features: [
      "Preserves produce freshness",
      "Reduces post-harvest losses",
      "Essential for perishable crops"
    ],
    suitableFor: ["Fruits", "Vegetables", "Flowers"],
    maintenance: "Monitor temperature, regular servicing."
  },
  {
    name: "Power Tiller",
    icon: "🛠️",
    category: "Machinery",
    priceRange: "₹1,00,000 - ₹2,50,000",
    features: [
      "Compact and versatile",
      "Ideal for small farms",
      "Multiple attachments available"
    ],
    suitableFor: ["Land preparation", "Inter-cultivation"],
    maintenance: "Check oil, tighten bolts, clean after use."
  }
];

// Irrigation Types Data
const irrigationTypes = [
  {
    name: "Drip Irrigation",
    icon: "💧",
    cost: "₹35,000 - ₹1,20,000 per acre",
    advantages: [
      "Highly water-efficient (saves 30-60%)",
      "Reduces weed growth",
      "Minimizes evaporation loss",
      "Improves yield and quality"
    ],
    disadvantages: [
      "High initial investment",
      "Requires regular maintenance (clogging risk)",
      "Not ideal for all soil types"
    ],
    suitableCrops: ["Fruits", "Vegetables", "Flowers", "Sugarcane"],
    notes: "Best for row crops and orchards. Government subsidies often available."
  },
  {
    name: "Sprinkler Irrigation",
    icon: "🌦️",
    cost: "₹25,000 - ₹1,00,000 per acre",
    advantages: [
      "Uniform water distribution",
      "Suitable for undulating land",
      "Reduces labor requirement",
      "Can be automated"
    ],
    disadvantages: [
      "Water loss due to wind/evaporation",
      "Not ideal for all crops (e.g., some cereals)",
      "Nozzle clogging risk"
    ],
    suitableCrops: ["Wheat", "Pulses", "Vegetables", "Fodder"],
    notes: "Works well for most field crops and lawns."
  },
  {
    name: "Surface/Furrow Irrigation",
    icon: "🌊",
    cost: "₹5,000 - ₹15,000 per acre",
    advantages: [
      "Low initial cost",
      "Simple to operate",
      "No special equipment needed"
    ],
    disadvantages: [
      "High water loss (runoff, evaporation)",
      "Uneven distribution possible",
      "Labor intensive"
    ],
    suitableCrops: ["Rice", "Wheat", "Maize", "Sugarcane"],
    notes: "Traditional method, best for heavy soils and leveled fields."
  },
  {
    name: "Subsurface Irrigation",
    icon: "🕳️",
    cost: "₹60,000 - ₹2,00,000 per acre",
    advantages: [
      "Very efficient water use",
      "Reduces disease risk",
      "No surface evaporation"
    ],
    disadvantages: [
      "Very high installation cost",
      "Difficult to monitor and repair",
      "Not suitable for all soils"
    ],
    suitableCrops: ["Vegetables", "Fruits", "Flowers"],
    notes: "Used in high-value horticulture and research."
  }
];

// Government Schemes Data
const governmentSchemes = [
  {
    name: "PM-KISAN",
    icon: "💰",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to eligible farmer families",
    benefits: [
      "₹6,000 per year in 3 equal installments",
      "Direct bank transfer",
      "No middlemen involved",
      "Covers all farming families"
    ],
    eligibility: [
      "Small and marginal farmers",
      "Landholding up to 2 hectares",
      "Valid bank account",
      "Aadhaar linked"
    ],
    applicationProcess: "Apply through Common Service Centers (CSC) or online portal",
    website: "pmkisan.gov.in",
    status: "Active"
  },
  {
    name: "PMFBY",
    icon: "🛡️",
    fullName: "Pradhan Mantri Fasal Bima Yojana",
    description: "Comprehensive crop insurance scheme to protect farmers against natural calamities",
    benefits: [
      "Covers yield losses due to natural calamities",
      "Affordable premium rates",
      "Quick claim settlement",
      "Covers all food and oilseed crops"
    ],
    eligibility: [
      "All farmers growing notified crops",
      "Compulsory for loanee farmers",
      "Voluntary for non-loanee farmers",
      "Valid land records required"
    ],
    applicationProcess: "Apply through banks, insurance companies, or online portal",
    website: "pmfby.gov.in",
    status: "Active"
  },
  {
    name: "Soil Health Card",
    icon: "📋",
    fullName: "Soil Health Card Scheme",
    description: "Free soil testing and recommendations for balanced fertilizer use",
    benefits: [
      "Free soil testing every 3 years",
      "Personalized fertilizer recommendations",
      "Reduces input costs",
      "Improves soil fertility"
    ],
    eligibility: [
      "All farmers",
      "Valid land records",
      "Aadhaar linked",
      "No income limit"
    ],
    applicationProcess: "Apply at nearest soil testing laboratory or online",
    website: "soilhealth.dac.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY",
    icon: "💧",
    fullName: "Pradhan Mantri Krishi Sinchayee Yojana",
    description: "Comprehensive irrigation scheme to ensure water to every field",
    benefits: [
      "50% subsidy on micro-irrigation",
      "90% subsidy for small/marginal farmers",
      "Water conservation",
      "Increased crop productivity"
    ],
    eligibility: [
      "All farmers",
      "Valid land records",
      "Water source available",
      "Technical feasibility"
    ],
    applicationProcess: "Apply through state agriculture department",
    website: "pmksy.gov.in",
    status: "Active"
  },
  {
    name: "PMFME",
    icon: "🏭",
    fullName: "Pradhan Mantri Formalisation of Micro Food Processing Enterprises",
    description: "Support for food processing units and value addition",
    benefits: [
      "35% subsidy on project cost",
      "Credit linked assistance",
      "Skill development training",
      "Market linkage support"
    ],
    eligibility: [
      "Micro food processing units",
      "Individual entrepreneurs",
      "Self-help groups",
      "Producer organizations"
    ],
    applicationProcess: "Apply through state nodal agencies",
    website: "pmfme.mofpi.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-PDMC",
    icon: "🏗️",
    fullName: "PMKSY - Per Drop More Crop",
    description: "Micro-irrigation scheme for water use efficiency",
    benefits: [
      "55% subsidy for small/marginal farmers",
      "45% subsidy for other farmers",
      "Drip and sprinkler systems",
      "Water saving up to 50%"
    ],
    eligibility: [
      "All farmers",
      "Suitable crops",
      "Water availability",
      "Technical feasibility"
    ],
    applicationProcess: "Apply through agriculture department or online",
    website: "pmksy.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-AIBP",
    icon: "🌊",
    fullName: "PMKSY - Accelerated Irrigation Benefits Programme",
    description: "Financial assistance for major and medium irrigation projects",
    benefits: [
      "Central assistance for irrigation projects",
      "Faster project completion",
      "Increased irrigation potential",
      "Better water management"
    ],
    eligibility: [
      "State governments",
      "Irrigation projects",
      "Technical approval",
      "Environmental clearance"
    ],
    applicationProcess: "State governments apply to central ministry",
    website: "pmksy.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-HKKP",
    icon: "🏞️",
    fullName: "PMKSY - Har Khet Ko Pani",
    description: "Assistance for creation of new water sources and restoration",
    benefits: [
      "New water source creation",
      "Restoration of water bodies",
      "Groundwater development",
      "Water harvesting structures"
    ],
    eligibility: [
      "All farmers",
      "Water scarce areas",
      "Technical feasibility",
      "Community participation"
    ],
    applicationProcess: "Apply through state agriculture department",
    website: "pmksy.gov.in",
    status: "Active"
  }
];

// Harvest Planning Data
const harvestPlanningData = {
  crops: [
    {
      name: "Wheat",
      icon: "🌾",
      harvestTiming: {
        optimal: "March-April (Rabi)",
        indicators: ["Golden yellow color", "Hard grains", "Moisture content 14-16%"],
        duration: "7-10 days window"
      },
      storage: {
        conditions: "Cool, dry place (15-20°C)",
        moisture: "Below 12%",
        containers: "Gunny bags, metal bins",
        duration: "6-12 months"
      },
      marketAnalysis: {
        peakPrices: "October-December",
        demand: "High throughout year",
        storageValue: "Good for long-term storage"
      },
      postHarvest: [
        "Clean and grade grains",
        "Treat with approved pesticides",
        "Monitor for pests regularly",
        "Maintain proper ventilation"
      ]
    },
    {
      name: "Rice",
      icon: "🍚",
      harvestTiming: {
        optimal: "September-October (Kharif)",
        indicators: ["80-85% grains matured", "Yellowing of leaves", "Moisture 20-25%"],
        duration: "5-7 days window"
      },
      storage: {
        conditions: "Cool, dry place (10-15°C)",
        moisture: "Below 13%",
        containers: "Hermetic bags, silos",
        duration: "8-12 months"
      },
      marketAnalysis: {
        peakPrices: "January-March",
        demand: "Consistent high demand",
        storageValue: "Excellent for storage"
      },
      postHarvest: [
        "Dry to 12-13% moisture",
        "Remove broken grains",
        "Store in airtight containers",
        "Regular quality checks"
      ]
    },
    {
      name: "Corn/Maize",
      icon: "🌽",
      harvestTiming: {
        optimal: "September-October",
        indicators: ["Kernels hard and dented", "Brown silks", "Moisture 25-30%"],
        duration: "10-14 days window"
      },
      storage: {
        conditions: "Well-ventilated area",
        moisture: "Below 14%",
        containers: "Cribs, silos, bags",
        duration: "6-8 months"
      },
      marketAnalysis: {
        peakPrices: "November-December",
        demand: "High for feed industry",
        storageValue: "Moderate storage value"
      },
      postHarvest: [
        "Dry to 13-14% moisture",
        "Remove damaged cobs",
        "Control temperature",
        "Monitor for aflatoxin"
      ]
    },
    {
      name: "Soybeans",
      icon: "🫘",
      harvestTiming: {
        optimal: "October-November",
        indicators: ["Pods brown and dry", "Seeds rattle in pods", "Moisture 13-15%"],
        duration: "7-10 days window"
      },
      storage: {
        conditions: "Cool, dry storage",
        moisture: "Below 12%",
        containers: "Bulk storage, bags",
        duration: "12-18 months"
      },
      marketAnalysis: {
        peakPrices: "February-April",
        demand: "High for oil extraction",
        storageValue: "Excellent storage value"
      },
      postHarvest: [
        "Clean and grade beans",
        "Maintain low moisture",
        "Regular aeration",
        "Monitor for mold"
      ]
    },
    {
      name: "Cotton",
      icon: "🧶",
      harvestTiming: {
        optimal: "October-December",
        indicators: ["Bolls fully opened", "White fluffy fibers", "Dry weather"],
        duration: "Multiple pickings over 2-3 months"
      },
      storage: {
        conditions: "Dry, well-ventilated",
        moisture: "Below 8%",
        containers: "Compressed bales",
        duration: "12-24 months"
      },
      marketAnalysis: {
        peakPrices: "March-May",
        demand: "High for textile industry",
        storageValue: "Good storage value"
      },
      postHarvest: [
        "Grade by fiber length",
        "Remove impurities",
        "Compress into bales",
        "Store in dry conditions"
      ]
    },
    {
      name: "Sugarcane",
      icon: "🎋",
      harvestTiming: {
        optimal: "November-March",
        indicators: ["12-18 months growth", "High sucrose content", "Dry weather"],
        duration: "3-4 months harvesting season"
      },
      storage: {
        conditions: "Cannot be stored long",
        moisture: "Process within 24-48 hours",
        containers: "Transport to mill immediately",
        duration: "1-2 days maximum"
      },
      marketAnalysis: {
        peakPrices: "December-February",
        demand: "High for sugar mills",
        storageValue: "No storage value"
      },
      postHarvest: [
        "Transport immediately",
        "Avoid bruising",
        "Maintain freshness",
        "Process quickly"
      ]
    }
  ],
  generalTips: {
    timing: [
      "Monitor weather forecasts for dry harvesting conditions",
      "Check crop maturity indicators regularly",
      "Plan harvest during optimal moisture content",
      "Avoid harvesting during rain or high humidity"
    ],
    equipment: [
      "Ensure harvesters are properly maintained",
      "Calibrate equipment for optimal performance",
      "Have backup equipment ready",
      "Train operators on proper techniques"
    ],
    labor: [
      "Arrange labor well in advance",
      "Provide proper training and safety equipment",
      "Plan for peak labor requirements",
      "Consider mechanization for efficiency"
    ]
  }
};

// Weather Updates Data
const weatherData = {
  currentWeather: {
    temperature: "28°C",
    humidity: "65%",
    windSpeed: "12 km/h",
    precipitation: "0%",
    uvIndex: "High",
    visibility: "10 km"
  },
  forecast: [
    {
      day: "Today",
      date: "2024-01-15",
      high: "32°C",
      low: "22°C",
      condition: "Sunny",
      icon: "☀️",
      precipitation: "0%",
      windSpeed: "10 km/h"
    },
    {
      day: "Tomorrow",
      date: "2024-01-16",
      high: "30°C",
      low: "20°C",
      condition: "Partly Cloudy",
      icon: "⛅",
      precipitation: "20%",
      windSpeed: "15 km/h"
    },
    {
      day: "Wednesday",
      date: "2024-01-17",
      high: "28°C",
      low: "18°C",
      condition: "Light Rain",
      icon: "🌦️",
      precipitation: "60%",
      windSpeed: "20 km/h"
    },
    {
      day: "Thursday",
      date: "2024-01-18",
      high: "26°C",
      low: "16°C",
      condition: "Rainy",
      icon: "🌧️",
      precipitation: "80%",
      windSpeed: "25 km/h"
    },
    {
      day: "Friday",
      date: "2024-01-19",
      high: "29°C",
      low: "19°C",
      condition: "Cloudy",
      icon: "☁️",
      precipitation: "30%",
      windSpeed: "12 km/h"
    }
  ],
  farmingAlerts: [
    {
      type: "Harvest Alert",
      severity: "High",
      message: "Optimal harvesting conditions expected for wheat in the next 3 days",
      icon: "🌾",
      color: "#16a34a"
    },
    {
      type: "Irrigation Alert",
      severity: "Medium",
      message: "Low rainfall expected - consider irrigation for moisture-sensitive crops",
      icon: "💧",
      color: "#f59e0b"
    },
    {
      type: "Pest Alert",
      severity: "Low",
      message: "High humidity may increase pest activity - monitor crops closely",
      icon: "🦗",
      color: "#dc2626"
    }
  ],
  cropSpecificWeather: [
    {
      crop: "Wheat",
      icon: "🌾",
      optimalConditions: {
        temperature: "20-25°C",
        humidity: "60-70%",
        rainfall: "Moderate",
        windSpeed: "5-15 km/h"
      },
      currentStatus: "Optimal",
      recommendations: [
        "Continue with planned harvest activities",
        "Monitor for any sudden weather changes",
        "Ensure proper storage conditions"
      ]
    },
    {
      crop: "Rice",
      icon: "🍚",
      optimalConditions: {
        temperature: "25-35°C",
        humidity: "70-80%",
        rainfall: "High",
        windSpeed: "5-10 km/h"
      },
      currentStatus: "Good",
      recommendations: [
        "Maintain water levels in paddy fields",
        "Watch for heavy rainfall that may cause flooding",
        "Prepare for potential pest outbreaks"
      ]
    },
    {
      crop: "Corn/Maize",
      icon: "🌽",
      optimalConditions: {
        temperature: "25-30°C",
        humidity: "65-75%",
        rainfall: "Moderate",
        windSpeed: "10-20 km/h"
      },
      currentStatus: "Caution",
      recommendations: [
        "Monitor for drought conditions",
        "Consider additional irrigation if needed",
        "Watch for wind damage to tall plants"
      ]
    },
    {
      crop: "Soybeans",
      icon: "🫘",
      optimalConditions: {
        temperature: "20-30°C",
        humidity: "60-70%",
        rainfall: "Moderate",
        windSpeed: "5-15 km/h"
      },
      currentStatus: "Optimal",
      recommendations: [
        "Ideal conditions for growth and development",
        "Continue with regular maintenance",
        "Monitor soil moisture levels"
      ]
    }
  ],
  weatherTips: {
    general: [
      "Check weather forecasts daily before planning farm activities",
      "Adjust irrigation schedules based on rainfall predictions",
      "Protect crops from extreme weather events",
      "Monitor soil moisture levels regularly"
    ],
    seasonal: [
      "Summer: Focus on irrigation and heat stress management",
      "Monsoon: Prepare for heavy rainfall and flooding",
      "Winter: Protect crops from frost and cold damage",
      "Spring: Monitor for pest outbreaks and disease"
    ],
    emergency: [
      "Have emergency contact numbers ready",
      "Keep backup power sources for critical equipment",
      "Store essential supplies for extreme weather",
      "Develop evacuation plans for severe storms"
    ]
  }
};

const App: React.FC = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [crop, setCrop] = useState("");
  const [harvestingDate, setHarvestingDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCropSuggestions, setShowCropSuggestions] = useState(false);
  const [showCostAnalysis, setShowCostAnalysis] = useState(false);
  const [showEquipmentGuide, setShowEquipmentGuide] = useState(false);
  const [showIrrigationAdvice, setShowIrrigationAdvice] = useState(false);
  const [showYieldPrediction, setShowYieldPrediction] = useState(false);
  const [showGovernmentSchemes, setShowGovernmentSchemes] = useState(false);
  const [showHarvestPlanning, setShowHarvestPlanning] = useState(false);
  const [showWeatherUpdates, setShowWeatherUpdates] = useState(false);
  const [showFertilizerDetails, setShowFertilizerDetails] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Debug state changes
  useEffect(() => {
    console.log("showCropSuggestions:", showCropSuggestions);
  }, [showCropSuggestions]);

  useEffect(() => {
    console.log("showCostAnalysis:", showCostAnalysis);
  }, [showCostAnalysis]);

  // Cost Analysis Data
  const costAnalysisData = {
    costCategories: [
      {
        name: "Input Costs",
        icon: "🌱",
        items: [
          { name: "Seeds", costPerAcre: 1200, description: "High-quality certified seeds" },
          { name: "Fertilizers", costPerAcre: 3000, description: "NPK and organic fertilizers" },
          { name: "Pesticides", costPerAcre: 1500, description: "Crop protection chemicals" },
          { name: "Bio-fertilizers", costPerAcre: 800, description: "Organic soil enhancers" }
        ]
      },
      {
        name: "Labor Costs",
        icon: "👨‍🌾",
        items: [
          { name: "Land Preparation", costPerAcre: 2000, description: "Plowing, harrowing, leveling" },
          { name: "Sowing/Planting", costPerAcre: 1500, description: "Manual or mechanical planting" },
          { name: "Weeding", costPerAcre: 1200, description: "Manual and chemical weed control" },
          { name: "Harvesting", costPerAcre: 2500, description: "Manual or mechanical harvesting" },
          { name: "Post-harvest", costPerAcre: 1000, description: "Threshing, cleaning, storage" }
        ]
      },
      {
        name: "Equipment & Machinery",
        icon: "🚜",
        items: [
          { name: "Tractor Operations", costPerAcre: 2500, description: "Tractor hire and fuel" },
          { name: "Implements", costPerAcre: 1500, description: "Plows, harrows, seed drills" },
          { name: "Irrigation Equipment", costPerAcre: 2000, description: "Pumps, pipes, sprinklers" },
          { name: "Harvesting Equipment", costPerAcre: 3000, description: "Combine harvesters, threshers" }
        ]
      },
      {
        name: "Infrastructure",
        icon: "🏗️",
        items: [
          { name: "Irrigation System", costPerAcre: 5000, description: "Drip/sprinkler installation" },
          { name: "Storage Facilities", costPerAcre: 3000, description: "Warehouses, silos" },
          { name: "Fencing", costPerAcre: 2000, description: "Boundary protection" },
          { name: "Roads & Access", costPerAcre: 1500, description: "Internal farm roads" }
        ]
      },
      {
        name: "Operational Costs",
        icon: "⚡",
        items: [
          { name: "Electricity", costPerAcre: 800, description: "Pumping and processing" },
          { name: "Fuel", costPerAcre: 1200, description: "Diesel for machinery" },
          { name: "Transportation", costPerAcre: 1500, description: "Input delivery and output transport" },
          { name: "Insurance", costPerAcre: 500, description: "Crop and equipment insurance" }
        ]
      },
      {
        name: "Miscellaneous",
        icon: "📋",
        items: [
          { name: "Testing & Certification", costPerAcre: 300, description: "Soil testing, organic certification" },
          { name: "Marketing", costPerAcre: 500, description: "Packaging, branding, market access" },
          { name: "Administrative", costPerAcre: 400, description: "Record keeping, compliance" },
          { name: "Contingency", costPerAcre: 1000, description: "Unforeseen expenses (10% buffer)" }
        ]
      }
    ],
    optimizationTips: [
      {
        category: "Input Optimization",
        tips: [
          "Use certified seeds for better germination and yield",
          "Apply fertilizers based on soil test results",
          "Implement integrated pest management (IPM)",
          "Consider organic alternatives for premium markets"
        ]
      },
      {
        category: "Labor Efficiency",
        tips: [
          "Plan operations to minimize labor requirements",
          "Train workers for better productivity",
          "Use appropriate tools and equipment",
          "Consider mechanization for large-scale operations"
        ]
      },
      {
        category: "Equipment Management",
        tips: [
          "Maintain equipment regularly to avoid breakdowns",
          "Share equipment with neighboring farmers",
          "Consider custom hiring for specialized operations",
          "Invest in multi-purpose implements"
        ]
      },
      {
        category: "Infrastructure Planning",
        tips: [
          "Design irrigation systems for water efficiency",
          "Plan storage facilities based on crop volume",
          "Invest in infrastructure that adds long-term value",
          "Consider government subsidies for infrastructure"
        ]
      }
    ],
    revenueStreams: [
      {
        name: "Primary Crop Sales",
        description: "Main crop yield sold at market prices",
        potential: "High",
        reliability: "High"
      },
      {
        name: "Secondary Crops",
        description: "Intercropping and multiple cropping",
        potential: "Medium",
        reliability: "Medium"
      },
      {
        name: "Organic Premium",
        description: "Higher prices for organic produce",
        potential: "High",
        reliability: "Medium"
      },
      {
        name: "Value Addition",
        description: "Processing and packaging for higher margins",
        potential: "Very High",
        reliability: "Low"
      },
      {
        name: "Contract Farming",
        description: "Guaranteed prices through contracts",
        potential: "Medium",
        reliability: "High"
      }
    ]
  };

  // Comprehensive Crop Suggestions Data
  const cropSuggestions = [
    {
      name: "Rice",
      icon: "🌾",
      season: "Kharif (June-October)",
      duration: "120-150 days",
      water: "High",
      soil: "Clay loam",
      states: ["WB", "UP", "PB", "TN", "AP", "TG", "BR", "OR"],
      description: "Staple food crop, suitable for monsoon season",
      marketPotential: "High",
      investment: "Medium",
      costBreakdown: {
        seeds: 1200,
        fertilizers: 3000,
        pesticides: 1500,
        irrigation: 2000,
        labor: 8000,
        machinery: 3000,
        transportation: 1500,
        miscellaneous: 1000
      },
      yieldPerAcre: 25, // quintals
      marketPrice: 1800, // per quintal
      totalCost: 0, // will be calculated
      totalRevenue: 0, // will be calculated
      profit: 0 // will be calculated
    },
    {
      name: "Wheat",
      icon: "🌾",
      season: "Rabi (November-March)",
      duration: "110-130 days",
      water: "Medium",
      soil: "Loamy",
      states: ["UP", "PB", "HR", "MP", "RJ", "MH", "BR"],
      description: "Winter crop, major food grain",
      marketPotential: "High",
      investment: "Medium",
      costBreakdown: {
        seeds: 1000,
        fertilizers: 2500,
        pesticides: 1200,
        irrigation: 1500,
        labor: 6000,
        machinery: 2500,
        transportation: 1200,
        miscellaneous: 800
      },
      yieldPerAcre: 20, // quintals
      marketPrice: 2000, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Maize",
      icon: "🌽",
      season: "Kharif & Rabi",
      duration: "90-120 days",
      water: "Medium",
      soil: "Well-drained loam",
      states: ["MP", "KA", "AP", "TG", "BR", "JH", "MH"],
      description: "Versatile crop for food and fodder",
      marketPotential: "Medium",
      investment: "Low",
      costBreakdown: {
        seeds: 800,
        fertilizers: 2000,
        pesticides: 1000,
        irrigation: 1200,
        labor: 5000,
        machinery: 2000,
        transportation: 1000,
        miscellaneous: 600
      },
      yieldPerAcre: 18, // quintals
      marketPrice: 1500, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Sugarcane",
      icon: "🎋",
      season: "Year-round",
      duration: "12-18 months",
      water: "Very High",
      soil: "Deep loam",
      states: ["UP", "MH", "KA", "TN", "AP", "TG", "GJ"],
      description: "Cash crop, requires long growing period",
      marketPotential: "High",
      investment: "High",
      costBreakdown: {
        seeds: 3000,
        fertilizers: 5000,
        pesticides: 2000,
        irrigation: 8000,
        labor: 15000,
        machinery: 5000,
        transportation: 3000,
        miscellaneous: 2000
      },
      yieldPerAcre: 400, // quintals
      marketPrice: 300, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Cotton",
      icon: "🧶",
      season: "Kharif",
      duration: "150-180 days",
      water: "Medium",
      soil: "Black soil",
      states: ["MH", "GJ", "MP", "AP", "TG", "RJ", "KA"],
      description: "Fiber crop, drought resistant",
      marketPotential: "Medium",
      investment: "Medium",
      costBreakdown: {
        seeds: 1500,
        fertilizers: 3000,
        pesticides: 2500,
        irrigation: 2000,
        labor: 10000,
        machinery: 3000,
        transportation: 2000,
        miscellaneous: 1500
      },
      yieldPerAcre: 8, // quintals
      marketPrice: 6000, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Pulses",
      icon: "🫘",
      season: "Rabi & Kharif",
      duration: "60-120 days",
      water: "Low",
      soil: "Sandy loam",
      states: ["MP", "MH", "UP", "RJ", "KA", "AP", "TG"],
      description: "Protein-rich, nitrogen fixing",
      marketPotential: "Medium",
      investment: "Low",
      costBreakdown: {
        seeds: 600,
        fertilizers: 1500,
        pesticides: 800,
        irrigation: 800,
        labor: 4000,
        machinery: 1500,
        transportation: 800,
        miscellaneous: 500
      },
      yieldPerAcre: 6, // quintals
      marketPrice: 4000, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Oilseeds",
      icon: "🫒",
      season: "Rabi & Kharif",
      duration: "90-150 days",
      water: "Low-Medium",
      soil: "Sandy loam",
      states: ["MP", "RJ", "MH", "UP", "AP", "TG", "KA"],
      description: "Edible oils and industrial use",
      marketPotential: "Medium",
      investment: "Low",
      costBreakdown: {
        seeds: 800,
        fertilizers: 1800,
        pesticides: 1000,
        irrigation: 1000,
        labor: 5000,
        machinery: 1800,
        transportation: 1000,
        miscellaneous: 600
      },
      yieldPerAcre: 8, // quintals
      marketPrice: 3500, // per quintal
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Vegetables",
      icon: "🥬",
      season: "Year-round",
      duration: "30-120 days",
      water: "High",
      soil: "Rich loam",
      states: ["All States"],
      description: "Short duration, high value crops",
      marketPotential: "High",
      investment: "Medium",
      costBreakdown: {
        seeds: 500,
        fertilizers: 2000,
        pesticides: 1200,
        irrigation: 1500,
        labor: 8000,
        machinery: 1000,
        transportation: 1000,
        miscellaneous: 800
      },
      yieldPerAcre: 15, // tons
      marketPrice: 2000, // per ton
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    },
    {
      name: "Fruits",
      icon: "🍎",
      season: "Year-round",
      duration: "3-8 years",
      water: "Medium",
      soil: "Well-drained",
      states: ["All States"],
      description: "Perennial crops, long-term investment",
      marketPotential: "High",
      investment: "High",
      costBreakdown: {
        seeds: 2000,
        fertilizers: 3000,
        pesticides: 2000,
        irrigation: 3000,
        labor: 12000,
        machinery: 2000,
        transportation: 1500,
        miscellaneous: 1500
      },
      yieldPerAcre: 10, // tons
      marketPrice: 5000, // per ton
      totalCost: 0,
      totalRevenue: 0,
      profit: 0
    }
  ];

  // Calculate costs and profits for each crop
  const calculateCropEconomics = (crop: any) => {
    const totalCost = Object.values(crop.costBreakdown).reduce((sum: number, cost: any) => sum + (cost as number), 0);
    const totalRevenue = crop.yieldPerAcre * crop.marketPrice;
    const profit = totalRevenue - totalCost;
    
    return {
      ...crop,
      totalCost,
      totalRevenue,
      profit
    };
  };

  const cropsWithEconomics = cropSuggestions.map(calculateCropEconomics);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simulate AI analysis with mock data
      const cropKey = crop.trim().toLowerCase();
      const priceInfo = MOCK_PRICES[cropKey] || {
        min: 1000,
        max: 2000,
        period: "Varies by crop"
      };
      setResult({
        markets: MOCK_MARKETS,
        price: priceInfo,
        harvestingDate // include in result if needed
      });
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setState("");
    setDistrict("");
    setCrop("");
    setHarvestingDate("");
    setResult(null);
  };

  const features = [
    { name: t("Crop Suggestions"), icon: "🌾", description: t("Get AI-powered crop recommendations based on soil, climate, and market conditions") },
    { name: t("Yield Prediction"), icon: "📊", description: t("Predict crop yields using advanced AI algorithms and historical data") },
    { name: t("Irrigation Advice"), icon: "💧", description: t("Smart irrigation recommendations for optimal water usage and crop health") },
    { name: t("Equipment Guide"), icon: "🚜", description: t("Comprehensive guide to farming equipment, prices, and maintenance") },
    { name: t("Cost Analysis"), icon: "💰", description: t("Detailed cost breakdown and financial analysis for different crops") },
    { name: t("Fertilizer Details"), icon: "🌿", description: t("Comprehensive information on fertilizers, usage, and best practices") },
    { name: t("Government Schemes"), icon: "🏛️", description: t("Information about government subsidies and support programs") },
    { name: t("Harvest Planning"), icon: "🌾", description: t("Optimal harvest timing, storage, and post-harvest management strategies") },
    { name: t("Weather Updates"), icon: "🌤️", description: t("Real-time weather data, forecasts, and farming-specific weather alerts") }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: "relative"
    }}>
      {/* Header */}
      <header style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(34, 197, 94, 0.1)",
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        {/* Logo (Top Left) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 20,
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
          }}>
            🌾
          </div>
          <span style={{
            color: "#16a34a",
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "-0.025em"
          }}>
            AI Farmer
          </span>
        </div>

        {/* App Name (Top Center) */}
        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#16a34a",
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: "-0.025em"
        }}>
          Crop Market Analyzer
        </div>

        {/* Menu Icon (Top Right) */}
        <button
          onClick={() => setShowFeatures(v => !v)}
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            borderRadius: 10,
            width: 48,
            height: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            gap: 4
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(34, 197, 94, 0.15)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(34, 197, 94, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          aria-label="More features"
        >
          <span style={{
            width: 20, height: 2, background: "#16a34a", borderRadius: 1, transition: "all 0.2s ease"
          }} />
          <span style={{
            width: 20, height: 2, background: "#16a34a", borderRadius: 1, transition: "all 0.2s ease"
          }} />
          <span style={{
            width: 20, height: 2, background: "#16a34a", borderRadius: 1, transition: "all 0.2s ease"
          }} />
        </button>
      </header>

      {/* Features Drawer/Modal */}
      {showFeatures && (
        <div
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: 320,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(34, 197, 94, 0.1)",
            boxShadow: "-4px 0 24px rgba(34, 197, 94, 0.1)",
            zIndex: 100,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            animation: "slideIn 0.3s ease-out"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ color: "#8B4513", fontWeight: 700, fontSize: 20, margin: 0 }}>Features</h2>
            <button
              onClick={() => setShowFeatures(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                color: "#8B4513",
                cursor: "pointer",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139, 69, 19, 0.1)";
                e.currentTarget.style.color = "#8B4513";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#8B4513";
              }}
              aria-label="Close"
            >×</button>
          </div>
          <div style={{ 
            flex: 1, 
            overflowY: "auto", 
            paddingRight: 8,
            marginRight: -8
          }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {features.map((feature, idx) => (
                <li key={idx} style={{
                  padding: "16px",
                  background: "rgba(139, 69, 19, 0.05)",
                  borderRadius: 12,
                  border: "1px solid rgba(139, 69, 19, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => {
                  switch (feature.name) {
                    case "Crop Suggestions":
                      setShowCropSuggestions(true);
                      break;
                    case "Yield Prediction":
                      setShowYieldPrediction(true);
                      break;
                    case "Irrigation Advice":
                      setShowIrrigationAdvice(true);
                      break;
                    case "Equipment Guide":
                      setShowEquipmentGuide(true);
                      break;
                    case "Cost Analysis":
                      setShowCostAnalysis(true);
                      break;
                    case "Fertilizer Details":
                      setShowFertilizerDetails(true);
                      break;
                    case "Government Schemes":
                      setShowGovernmentSchemes(true);
                      break;
                    case "Harvest Planning":
                      setShowHarvestPlanning(true);
                      break;
                    case "Weather Updates":
                      setShowWeatherUpdates(true);
                      break;
                  }
                  setShowFeatures(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 69, 19, 0.1)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139, 69, 19, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{feature.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: "#8B4513", fontSize: 15 }}>{feature.name}</div>
                      <div style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>{feature.description}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          marginBottom: 48,
          maxWidth: 600
        }}>
          <h1 style={{
            color: "#16a34a",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: "-0.025em"
          }}>
            Smart Farming Solutions
          </h1>
          <p style={{
            color: "#6B7280",
            fontSize: 18,
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400
          }}>
            Get AI-powered market analysis, price predictions, and harvest timing recommendations for your crops.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            border: "1px solid rgba(34, 197, 94, 0.1)",
            boxShadow: "0 8px 32px rgba(34, 197, 94, 0.08)",
            padding: "48px 40px",
            minWidth: 400,
            maxWidth: 500,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 28
          }}
        >
          <div>
            <label htmlFor="state" style={{ 
              color: "#16a34a", 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8, 
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {t('Select Your State')}
            </label>
            <select
              id="state"
              value={state}
              onChange={e => setState(e.target.value)}
              style={{
                width: "100%",
                height: 52,
                border: "2px solid rgba(34, 197, 94, 0.2)",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 12,
                padding: "0 16px",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#16a34a",
                outline: "none",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#16a34a";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(34, 197, 94, 0.2)";
                e.target.style.boxShadow = "none";
              }}
              required
            >
              <option value="">Select your state</option>
              {INDIAN_STATES.map((stateOption) => (
                <option key={stateOption.id} value={stateOption.id}>
                  {stateOption.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="district" style={{ 
              color: "#16a34a", 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8, 
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {t('Enter your district')}
            </label>
            <input
              id="district"
              type="text"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder="Enter your district"
              style={{
                width: "100%",
                height: 52,
                border: "2px solid rgba(34, 197, 94, 0.2)",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 12,
                padding: "0 16px",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#16a34a",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#16a34a";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(34, 197, 94, 0.2)";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="crop" style={{ 
              color: "#16a34a", 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8, 
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {t('Crop Name')}
            </label>
            <input
              id="crop"
              type="text"
              value={crop}
              onChange={e => setCrop(e.target.value)}
              placeholder="Enter crop name (e.g., wheat, rice, maize)"
              style={{
                width: "100%",
                height: 52,
                border: "2px solid rgba(34, 197, 94, 0.2)",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 12,
                padding: "0 16px",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#16a34a",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#16a34a";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(34, 197, 94, 0.2)";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="harvestingDate" style={{ 
              color: "#16a34a", 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8, 
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {t('Harvesting Date')}
            </label>
            <input
              id="harvestingDate"
              type="date"
              value={harvestingDate}
              onChange={e => setHarvestingDate(e.target.value)}
              style={{
                width: "100%",
                height: 52,
                border: "2px solid rgba(34, 197, 94, 0.2)",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 12,
                padding: "0 16px",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#16a34a",
                outline: "none",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#16a34a";
                e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(34, 197, 94, 0.2)";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              height: 56,
              background: loading ? "rgba(34, 197, 94, 0.3)" : "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: loading ? "none" : "0 4px 12px rgba(34, 197, 94, 0.3)"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
              }
            }}
          >
            {loading ? "Analyzing..." : t('Get Market Analysis')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              height: 48,
              background: "transparent",
              color: "#16a34a",
              border: "2px solid rgba(34, 197, 94, 0.2)",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(34, 197, 94, 0.05)";
              e.currentTarget.style.borderColor = "#16a34a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(139, 69, 19, 0.2)";
            }}
          >
            {t('Reset Form')}
          </button>
        </form>

        {/* Results Section */}
        {result && (
          <div style={{
            marginTop: 48,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            border: "1px solid rgba(34, 197, 94, 0.1)",
            boxShadow: "0 8px 32px rgba(34, 197, 94, 0.08)",
            padding: "40px 36px",
            minWidth: 400,
            maxWidth: 500,
            width: "100%",
            color: "#16a34a"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 24
              }}>
                📊
              </div>
              <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>Market Analysis</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h3 style={{ color: "#16a34a", fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Nearby Marketplaces</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {result.markets.map((m: any, idx: number) => (
                    <div key={idx} style={{
                      padding: "12px 16px",
                      background: "rgba(34, 197, 94, 0.05)",
                      borderRadius: 8,
                      border: "1px solid rgba(34, 197, 94, 0.1)"
                    }}>
                      <div style={{ fontWeight: 500, color: "#16a34a" }}>{m.name}</div>
                      <div style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>Distance: {m.distance}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{
                padding: "20px",
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)",
                borderRadius: 12,
                border: "1px solid rgba(34, 197, 94, 0.2)"
              }}>
                <h3 style={{ color: "#16a34a", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Expected Price Range</h3>
                <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 20 }}>
                  ₹{result.price.min.toLocaleString()} - ₹{result.price.max.toLocaleString()} per quintal
                </div>
              </div>
              
              <div style={{
                padding: "20px",
                background: "linear-gradient(135deg, rgba(22, 163, 74, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)",
                borderRadius: 12,
                border: "1px solid rgba(22, 163, 74, 0.2)"
              }}>
                <h3 style={{ color: "#16a34a", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Optimal Harvest Period</h3>
                <div style={{ color: "#22c55e", fontWeight: 600, fontSize: 18 }}>{result.price.period}</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Crop Suggestions Modal */}
      {showCropSuggestions && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>🌱 Crop Suggestions</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>AI-powered crop recommendations based on your location and requirements</p>
              </div>
              <button
                onClick={() => setShowCropSuggestions(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Introduction Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(16, 185, 129, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{t('Smart Crop Recommendations')}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  {t('Our AI analyzes your location, soil type, water availability, and market conditions to suggest the most profitable crops. Each recommendation includes detailed cost analysis, expected yields, and market potential.')}
                </p>
              </div>

              {/* Crop Cards Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 24
              }}>
                {cropsWithEconomics.map((crop, index) => (
                  <div key={index} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                  >
                    {/* Crop Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                            {crop.icon} {crop.name}
                          </h4>
                          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{crop.description}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{
                            background: crop.marketPotential === "High" ? "rgba(16, 185, 129, 0.1)" : 
                                       crop.marketPotential === "Medium" ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                            color: crop.marketPotential === "High" ? "#059669" : 
                                   crop.marketPotential === "Medium" ? "#d97706" : "#dc2626",
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 500
                          }}>
                            {crop.marketPotential} Market
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Crop Details */}
                    <div style={{ padding: "24px" }}>
                      {/* Growing Requirements */}
                      <div style={{ marginBottom: 20 }}>
                        <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Growing Requirements</h5>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <div>
                            <span style={{ color: "#64748b", fontSize: 13 }}>Season:</span>
                            <div style={{ color: "#1e293b", fontWeight: 500 }}>{crop.season}</div>
                          </div>
                          <div>
                            <span style={{ color: "#64748b", fontSize: 13 }}>Duration:</span>
                            <div style={{ color: "#1e293b", fontWeight: 500 }}>{crop.duration}</div>
                          </div>
                          <div>
                            <span style={{ color: "#64748b", fontSize: 13 }}>Water Need:</span>
                            <div style={{ color: "#1e293b", fontWeight: 500 }}>{crop.water}</div>
                          </div>
                          <div>
                            <span style={{ color: "#64748b", fontSize: 13 }}>Soil Type:</span>
                            <div style={{ color: "#1e293b", fontWeight: 500 }}>{crop.soil}</div>
                          </div>
                        </div>
                      </div>

                      {/* Economics Section */}
                      <div style={{ marginBottom: 20 }}>
                        <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Economics (per acre)</h5>
                        <div style={{
                          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%)",
                          borderRadius: 12,
                          padding: 16,
                          border: "1px solid rgba(59, 130, 246, 0.1)"
                        }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            <div>
                              <span style={{ color: "#64748b", fontSize: 13 }}>Total Cost:</span>
                              <div style={{ color: "#dc2626", fontWeight: 600 }}>₹{crop.totalCost.toLocaleString()}</div>
                            </div>
                            <div>
                              <span style={{ color: "#64748b", fontSize: 13 }}>Expected Revenue:</span>
                              <div style={{ color: "#059669", fontWeight: 600 }}>₹{crop.totalRevenue.toLocaleString()}</div>
                            </div>
                            <div>
                              <span style={{ color: "#64748b", fontSize: 13 }}>Net Profit:</span>
                              <div style={{ 
                                color: crop.profit >= 0 ? "#059669" : "#dc2626", 
                                fontWeight: 600 
                              }}>
                                ₹{crop.profit.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cost Breakdown */}
                      <div style={{ marginBottom: 20 }}>
                        <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Cost Breakdown</h5>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          {Object.entries(crop.costBreakdown).map(([key, value]) => (
                            <div key={key} style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "#64748b", fontSize: 13, textTransform: "capitalize" }}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span style={{ color: "#1e293b", fontWeight: 500, fontSize: 13 }}>
                                ₹{(value as number).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Investment Level */}
                      <div style={{
                        background: crop.investment === "Low" ? "rgba(16, 185, 129, 0.1)" : 
                                   crop.investment === "Medium" ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        borderRadius: 8,
                        padding: "12px 16px",
                        border: "1px solid",
                        borderColor: crop.investment === "Low" ? "rgba(16, 185, 129, 0.2)" : 
                                     crop.investment === "Medium" ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#64748b", fontSize: 14 }}>Investment Level:</span>
                          <span style={{
                            color: crop.investment === "Low" ? "#059669" : 
                                   crop.investment === "Medium" ? "#d97706" : "#dc2626",
                            fontWeight: 600,
                            fontSize: 14
                          }}>
                            {crop.investment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(59, 130, 246, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(59, 130, 246, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>{t('Tip')}:</strong> {t('Consider your local climate, soil conditions, and market demand when choosing crops. These recommendations are based on general conditions and may vary by specific location.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cost Analysis Modal */}
      {showCostAnalysis && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>💰 Cost Analysis</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Comprehensive cost analysis and financial planning tools</p>
              </div>
              <button
                onClick={() => setShowCostAnalysis(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Introduction Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Crop-Specific Cost Analysis</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Detailed cost breakdown for each crop including seeds, fertilizers, labor, transportation, and other expenses. 
                  Compare costs across different crops to make informed decisions.
                </p>
              </div>

              {/* Crop Cost Breakdown Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: 24
              }}>
                {cropsWithEconomics.map((crop, index) => (
                  <div key={index} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                  >
                    {/* Crop Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                            {crop.icon} {crop.name}
                          </h4>
                          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{crop.description}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{
                            background: "rgba(245, 158, 11, 0.1)",
                            color: "#d97706",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 4
                          }}>
                            Total Cost: ₹{crop.totalCost.toLocaleString()}
                          </div>
                          <div style={{
                            background: crop.profit >= 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                            color: crop.profit >= 0 ? "#059669" : "#dc2626",
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            Profit: ₹{crop.profit.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div style={{ padding: "24px" }}>
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 16 }}>Cost Breakdown (per acre)</h5>
                      
                      {/* Cost Categories */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {/* Seeds */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(16, 185, 129, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(16, 185, 129, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>🌱</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Seeds</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>High-quality certified seeds</div>
                            </div>
                          </div>
                          <div style={{ color: "#059669", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.seeds.toLocaleString()}
                          </div>
                        </div>

                        {/* Fertilizers */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(59, 130, 246, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(59, 130, 246, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>🌿</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Fertilizers</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>NPK and organic fertilizers</div>
                            </div>
                          </div>
                          <div style={{ color: "#1d4ed8", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.fertilizers.toLocaleString()}
                          </div>
                        </div>

                        {/* Pesticides */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(239, 68, 68, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(239, 68, 68, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>🛡️</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Pesticides</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Crop protection chemicals</div>
                            </div>
                          </div>
                          <div style={{ color: "#dc2626", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.pesticides.toLocaleString()}
                          </div>
                        </div>

                        {/* Irrigation */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(6, 182, 212, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(6, 182, 212, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>💧</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Irrigation</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Water management systems</div>
                            </div>
                          </div>
                          <div style={{ color: "#0891b2", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.irrigation.toLocaleString()}
                          </div>
                        </div>

                        {/* Labor */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(245, 158, 11, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(245, 158, 11, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>👨‍🌾</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Labor</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Manual and skilled labor</div>
                            </div>
                          </div>
                          <div style={{ color: "#d97706", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.labor.toLocaleString()}
                          </div>
                        </div>

                        {/* Machinery */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(107, 114, 128, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(107, 114, 128, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>🚜</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Machinery</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Equipment and implements</div>
                            </div>
                          </div>
                          <div style={{ color: "#6b7280", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.machinery.toLocaleString()}
                          </div>
                        </div>

                        {/* Transportation */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(168, 85, 247, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(168, 85, 247, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>🚚</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Transportation</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Input delivery and output transport</div>
                            </div>
                          </div>
                          <div style={{ color: "#9333ea", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.transportation.toLocaleString()}
                          </div>
                        </div>

                        {/* Miscellaneous */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          background: "rgba(156, 163, 175, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(156, 163, 175, 0.1)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{ fontSize: 20 }}>📋</span>
                            <div>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14 }}>Miscellaneous</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Other expenses and contingencies</div>
                            </div>
                          </div>
                          <div style={{ color: "#9ca3af", fontWeight: 600, fontSize: 14 }}>
                            ₹{crop.costBreakdown.miscellaneous.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Summary Section */}
                      <div style={{
                        marginTop: 20,
                        padding: "16px",
                        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                        borderRadius: 12,
                        border: "1px solid rgba(245, 158, 11, 0.2)"
                      }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                          <div>
                            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Total Cost</div>
                            <div style={{ color: "#dc2626", fontSize: 18, fontWeight: 700 }}>
                              ₹{crop.totalCost.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Expected Revenue</div>
                            <div style={{ color: "#059669", fontSize: 18, fontWeight: 700 }}>
                              ₹{crop.totalRevenue.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Net Profit</div>
                            <div style={{ 
                              color: crop.profit >= 0 ? "#059669" : "#dc2626", 
                              fontSize: 18, 
                              fontWeight: 700 
                            }}>
                              ₹{crop.profit.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(245, 158, 11, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Tip:</strong> Compare costs across different crops to identify the most profitable options for your farm. 
                  Consider local market conditions and your available resources when making decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Guide Modal */}
      {showEquipmentGuide && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>🚜 Equipment Guide</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Farming equipment recommendations based on your crop and location</p>
              </div>
              <button
                onClick={() => setShowEquipmentGuide(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Introduction Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Equipment Recommendations</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Our AI recommends the best equipment for your specific crop and farming conditions. 
                  This includes machinery, implements, and other tools tailored to your needs.
                </p>
              </div>

              {/* Equipment Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24
              }}>
                {equipmentList.map((eq, idx) => (
                  <div key={idx} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}>
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontSize: 32 }}>{eq.icon}</span>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", margin: 0 }}>{eq.name}</h4>
                          <div style={{ color: "#64748b", fontSize: 14 }}>{eq.category}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <div style={{ marginBottom: 12 }}>
                        <span style={{ color: "#64748b", fontSize: 13 }}>Price Range:</span>
                        <div style={{ color: "#1e293b", fontWeight: 500 }}>{eq.priceRange}</div>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <span style={{ color: "#64748b", fontSize: 13 }}>Features:</span>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {eq.features.map((f, i) => (
                            <li key={i} style={{ color: "#64748b", fontSize: 14 }}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <span style={{ color: "#64748b", fontSize: 13 }}>Suitable For:</span>
                        <div style={{ color: "#059669", fontWeight: 500 }}>{eq.suitableFor.join(", ")}</div>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", fontSize: 13 }}>Maintenance:</span>
                        <div style={{ color: "#d97706", fontWeight: 500 }}>{eq.maintenance}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(245, 158, 11, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Tip:</strong> Consider your local climate, soil conditions, and market demand when choosing equipment. 
                  These recommendations are based on general conditions and may vary by specific location.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Irrigation Advice Modal */}
      {showIrrigationAdvice && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 900,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>💧 Irrigation Advice</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Smart, crop-specific water management recommendations</p>
              </div>
              <button
                onClick={() => setShowIrrigationAdvice(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>
            <div style={{ padding: 32 }}>
              {/* Types of Irrigation Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(56, 189, 248, 0.15)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Types of Irrigation</h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 20
                }}>
                  {irrigationTypes.map((type, idx) => (
                    <div key={idx} style={{
                      background: "#fff",
                      borderRadius: 14,
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 2px 8px rgba(56, 189, 248, 0.07)",
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: 28 }}>{type.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: 18, color: "#0ea5e9" }}>{type.name}</span>
                      </div>
                      <div style={{ color: "#64748b", fontSize: 14, marginBottom: 4 }}><b>Cost:</b> {type.cost}</div>
                      <div style={{ color: "#059669", fontSize: 14, marginBottom: 4 }}><b>Best for:</b> {type.suitableCrops.join(", ")}</div>
                      <div style={{ color: "#1e293b", fontSize: 14, marginBottom: 4 }}><b>Advantages:</b>
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {type.advantages.map((adv, i) => <li key={i} style={{ color: "#059669" }}>{adv}</li>)}
                        </ul>
                      </div>
                      <div style={{ color: "#dc2626", fontSize: 14, marginBottom: 4 }}><b>Disadvantages:</b>
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {type.disadvantages.map((dis, i) => <li key={i} style={{ color: "#dc2626" }}>{dis}</li>)}
                        </ul>
                      </div>
                      <div style={{ color: "#64748b", fontSize: 13 }}><b>Notes:</b> {type.notes}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* More detailed, crop/region-specific advice will be added next */}
            </div>
          </div>
        </div>
      )}

      {/* Yield Prediction Modal */}
      {showYieldPrediction && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>📈 Yield Prediction</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>AI-powered yield forecasting based on crop, weather, and management factors</p>
              </div>
              <button
                onClick={() => setShowYieldPrediction(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Introduction Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(16, 185, 129, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Smart Yield Forecasting</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Our AI analyzes multiple factors including weather patterns, soil conditions, crop variety, and management practices 
                  to provide accurate yield predictions. These predictions help in planning harvest, storage, and marketing strategies.
                </p>
              </div>

              {/* Yield Predictions Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 24
              }}>
                {cropsWithEconomics.map((crop, index) => {
                  // Calculate predicted yield based on various factors
                  const baseYield = crop.yieldPerAcre;
                  const weatherFactor = 0.95; // Simulated weather impact
                  const soilFactor = 1.02; // Simulated soil quality impact
                  const managementFactor = 1.05; // Simulated management practices impact
                  const predictedYield = Math.round(baseYield * weatherFactor * soilFactor * managementFactor);
                  const confidence = Math.floor(Math.random() * 20) + 80; // 80-100% confidence
                  
                  return (
                    <div key={index} style={{
                      background: "#fff",
                      borderRadius: 16,
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                    }}
                    >
                      {/* Crop Header */}
                      <div style={{
                        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                        padding: "20px 24px",
                        borderBottom: "1px solid #e2e8f0"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                          <div>
                            <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                              {crop.icon} {crop.name}
                            </h4>
                            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{crop.description}</p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{
                              background: confidence >= 90 ? "rgba(16, 185, 129, 0.1)" : 
                                         confidence >= 80 ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                              color: confidence >= 90 ? "#059669" : 
                                     confidence >= 80 ? "#d97706" : "#dc2626",
                              padding: "4px 12px",
                              borderRadius: 20,
                              fontSize: 12,
                              fontWeight: 600
                            }}>
                              {confidence}% Confidence
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Yield Prediction Details */}
                      <div style={{ padding: "24px" }}>
                        {/* Prediction Summary */}
                        <div style={{ marginBottom: 20 }}>
                          <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Yield Prediction (per acre)</h5>
                          <div style={{
                            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
                            borderRadius: 12,
                            padding: 16,
                            border: "1px solid rgba(16, 185, 129, 0.2)"
                          }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                              <div>
                                <span style={{ color: "#64748b", fontSize: 13 }}>Historical Average:</span>
                                <div style={{ color: "#1e293b", fontWeight: 600 }}>{baseYield} {crop.name === "Vegetables" || crop.name === "Fruits" ? "tons" : "quintals"}</div>
                              </div>
                              <div>
                                <span style={{ color: "#64748b", fontSize: 13 }}>Predicted Yield:</span>
                                <div style={{ color: "#059669", fontWeight: 600, fontSize: 18 }}>
                                  {predictedYield} {crop.name === "Vegetables" || crop.name === "Fruits" ? "tons" : "quintals"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Factors Affecting Yield */}
                        <div style={{ marginBottom: 20 }}>
                          <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Factors Affecting Yield</h5>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div style={{
                              padding: "12px",
                              background: "rgba(59, 130, 246, 0.05)",
                              borderRadius: 8,
                              border: "1px solid rgba(59, 130, 246, 0.1)"
                            }}>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Weather Conditions</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Optimal rainfall and temperature patterns</div>
                            </div>
                            <div style={{
                              padding: "12px",
                              background: "rgba(245, 158, 11, 0.05)",
                              borderRadius: 8,
                              border: "1px solid rgba(245, 158, 11, 0.1)"
                            }}>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Soil Quality</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Good soil fertility and structure</div>
                            </div>
                            <div style={{
                              padding: "12px",
                              background: "rgba(16, 185, 129, 0.05)",
                              borderRadius: 8,
                              border: "1px solid rgba(16, 185, 129, 0.1)"
                            }}>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Management Practices</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Timely operations and proper care</div>
                            </div>
                            <div style={{
                              padding: "12px",
                              background: "rgba(168, 85, 247, 0.05)",
                              borderRadius: 8,
                              border: "1px solid rgba(168, 85, 247, 0.1)"
                            }}>
                              <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Pest & Disease Control</div>
                              <div style={{ color: "#64748b", fontSize: 12 }}>Effective protection measures</div>
                            </div>
                          </div>
                        </div>

                        {/* Optimization Tips */}
                        <div style={{
                          background: "rgba(245, 158, 11, 0.05)",
                          borderRadius: 12,
                          padding: 16,
                          border: "1px solid rgba(245, 158, 11, 0.1)"
                        }}>
                          <h6 style={{ color: "#1e293b", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>💡 Yield Optimization Tips</h6>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            <li style={{ color: "#64748b", fontSize: 13, marginBottom: 4 }}>Use high-quality seeds and optimal spacing</li>
                            <li style={{ color: "#64748b", fontSize: 13, marginBottom: 4 }}>Apply balanced fertilizers based on soil testing</li>
                            <li style={{ color: "#64748b", fontSize: 13, marginBottom: 4 }}>Implement proper irrigation scheduling</li>
                            <li style={{ color: "#64748b", fontSize: 13 }}>Monitor and control pests/diseases early</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(16, 185, 129, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(16, 185, 129, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Note:</strong> Yield predictions are based on historical data and current conditions. 
                  Actual yields may vary due to unforeseen weather events or management changes. 
                  Regular monitoring and adaptive management are recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Government Schemes Modal */}
      {showGovernmentSchemes && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>🏛️ Government Schemes</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Subsidies and support programs for farmers</p>
              </div>
              <button
                onClick={() => setShowGovernmentSchemes(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Introduction Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Government Support for Farmers</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  The Government of India offers various schemes and subsidies to support farmers and improve agricultural productivity. 
                  These programs provide financial assistance, technical support, and infrastructure development.
                </p>
              </div>

              {/* Schemes Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: 24
              }}>
                {governmentSchemes.map((scheme, index) => (
                  <div key={index} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                  >
                    {/* Scheme Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                            {scheme.icon} {scheme.name}
                          </h4>
                          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{scheme.fullName}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{
                            background: scheme.status === "Active" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                            color: scheme.status === "Active" ? "#059669" : "#dc2626",
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            {scheme.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scheme Details */}
                    <div style={{ padding: "24px" }}>
                      <div style={{ marginBottom: 20 }}>
                        <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>Description</h5>
                        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{scheme.description}</p>
                      </div>

                      {/* Benefits */}
                      <div style={{ marginBottom: 20 }}>
                        <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Key Benefits</h5>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {scheme.benefits.map((benefit, idx) => (
                            <li key={idx} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Eligibility */}
                      <div style={{ marginBottom: 20 }}>
                        <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Eligibility Criteria</h5>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {scheme.eligibility.map((criteria, idx) => (
                            <li key={idx} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Application Info */}
                      <div style={{
                        background: "rgba(245, 158, 11, 0.05)",
                        borderRadius: 12,
                        padding: 16,
                        border: "1px solid rgba(245, 158, 11, 0.1)"
                      }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                          <div>
                            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Application Process</div>
                            <div style={{ color: "#1e293b", fontSize: 14, fontWeight: 500 }}>{scheme.applicationProcess}</div>
                          </div>
                          <div>
                            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Official Website</div>
                            <div style={{ color: "#16a34a", fontSize: 14, fontWeight: 500 }}>{scheme.website}</div>
                            <a href={`https://${scheme.website}`} target="_blank" rel="noopener noreferrer" style={{
                              display: "inline-block",
                              marginTop: 8,
                              padding: "8px 16px",
                              background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                              color: "#fff",
                              borderRadius: 8,
                              fontWeight: 600,
                              fontSize: 14,
                              textDecoration: "none",
                              boxShadow: "0 2px 8px rgba(34, 197, 94, 0.08)",
                              transition: "all 0.2s ease"
                            }}>
                              Go to Official Website
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(245, 158, 11, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Important:</strong> Always verify scheme details from official government websites before applying. 
                  Scheme benefits and eligibility criteria may vary by state and are subject to change.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Harvest Planning Modal */}
      {showHarvestPlanning && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>🌾 Harvest Planning</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Optimal harvest timing, storage, and post-harvest management strategies</p>
              </div>
              <button
                onClick={() => setShowHarvestPlanning(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Introduction Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Harvest Planning Tips</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Our AI provides insights into optimal harvest timing, storage conditions, and post-harvest management strategies for your crops.
                </p>
              </div>

              {/* Tips Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 24
              }}>
                {harvestPlanningData.crops.map((crop, index) => (
                  <div key={index} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                  >
                    {/* Crop Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                            {crop.icon} {crop.name}
                          </h4>
                          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Harvest Planning Guide</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{
                            background: "rgba(245, 158, 11, 0.1)",
                            color: "#d97706",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 4
                          }}>
                            Optimal Harvest Period: {crop.harvestTiming.optimal}
                          </div>
                          <div style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            color: "#059669",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 4
                          }}>
                            Storage Conditions: {crop.storage.conditions}
                          </div>
                          <div style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#dc2626",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 4
                          }}>
                            Market Analysis: {crop.marketAnalysis.peakPrices}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tips Section */}
                    <div style={{ padding: "24px" }}>
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>General Tips</h5>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {harvestPlanningData.generalTips.timing.map((tip, index) => (
                          <li key={index} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>{tip}</li>
                        ))}
                      </ul>
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12, marginTop: 20 }}>Equipment Tips</h5>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {harvestPlanningData.generalTips.equipment.map((tip, index) => (
                          <li key={index} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>{tip}</li>
                        ))}
                      </ul>
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12, marginTop: 20 }}>Labor Tips</h5>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {harvestPlanningData.generalTips.labor.map((tip, index) => (
                          <li key={index} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(245, 158, 11, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Tip:</strong> Consider your local climate, soil conditions, and market demand when planning your harvest. 
                  These strategies are based on general conditions and may need adjustments for specific locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Updates Modal */}
      {showWeatherUpdates && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>🌤️ Weather Updates</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Real-time weather data, forecasts, and farming-specific weather alerts</p>
              </div>
              <button
                onClick={() => setShowWeatherUpdates(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Weather Data Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Weather Information</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Our AI provides real-time weather data, forecasts, and alerts tailored to your specific crop and farming conditions.
                </p>
              </div>

              {/* Weather Data Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 24
              }}>
                {weatherData.cropSpecificWeather.map((crop, index) => (
                  <div key={index} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                  >
                    {/* Crop Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                            {crop.icon} {crop.crop}
                          </h4>
                          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Harvest Planning Guide</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{
                            background: crop.currentStatus === "Optimal" ? "rgba(16, 185, 129, 0.1)" : 
                                        crop.currentStatus === "Good" ? "rgba(59, 130, 246, 0.1)" : "rgba(245, 158, 11, 0.1)",
                            color: crop.currentStatus === "Optimal" ? "#059669" : 
                                   crop.currentStatus === "Good" ? "#2563eb" : "#d97706",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 4
                          }}>
                            Status: {crop.currentStatus}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weather Data Details */}
                    <div style={{ padding: "24px" }}>
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Optimal Conditions</h5>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div style={{
                          padding: "12px",
                          background: "rgba(59, 130, 246, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(59, 130, 246, 0.1)"
                        }}>
                          <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Temperature</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>{crop.optimalConditions.temperature}</div>
                        </div>
                        <div style={{
                          padding: "12px",
                          background: "rgba(245, 158, 11, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(245, 158, 11, 0.1)"
                        }}>
                          <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Humidity</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>{crop.optimalConditions.humidity}</div>
                        </div>
                        <div style={{
                          padding: "12px",
                          background: "rgba(16, 185, 129, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(16, 185, 129, 0.1)"
                        }}>
                          <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Rainfall</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>{crop.optimalConditions.rainfall}</div>
                        </div>
                        <div style={{
                          padding: "12px",
                          background: "rgba(168, 85, 247, 0.05)",
                          borderRadius: 8,
                          border: "1px solid rgba(168, 85, 247, 0.1)"
                        }}>
                          <div style={{ color: "#1e293b", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Wind Speed</div>
                          <div style={{ color: "#64748b", fontSize: 12 }}>{crop.optimalConditions.windSpeed}</div>
                        </div>
                      </div>
                      
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12, marginTop: 20 }}>Recommendations</h5>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {crop.recommendations.map((rec, idx) => (
                          <li key={idx} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(245, 158, 11, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Tip:</strong> Stay informed about weather conditions and adjust your farming strategies accordingly. 
                  These insights help in planning harvest, storage, and marketing strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fertilizer Details Modal */}
      {showFertilizerDetails && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 24,
            maxWidth: 1200,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>🌿 Fertilizer Details</h2>
                <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>Comprehensive information on fertilizers, usage, and best practices</p>
              </div>
              <button
                onClick={() => setShowFertilizerDetails(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >×</button>
            </div>

            <div style={{ padding: 32 }}>
              {/* Fertilizer Information */}
              <div style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
                border: "1px solid rgba(245, 158, 11, 0.2)"
              }}>
                <h3 style={{ color: "#1e293b", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Fertilizer Information</h3>
                <p style={{ color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  Our AI provides detailed information about fertilizers, including their types, benefits, and best practices for your specific crop.
                </p>
              </div>

              {/* Fertilizer Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: 24
              }}>
                {cropsWithEconomics.map((crop, index) => (
                  <div key={index} style={{
                    background: "#fff",
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
                  }}
                  >
                    {/* Crop Header */}
                    <div style={{
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      padding: "20px 24px",
                      borderBottom: "1px solid #e2e8f0"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <h4 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                            {crop.icon} {crop.name}
                          </h4>
                          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{crop.description}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{
                            background: "rgba(245, 158, 11, 0.1)",
                            color: "#d97706",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 14,
                            fontWeight: 600,
                            marginBottom: 4
                          }}>
                            Fertilizer Recommendations: {crop.fertilizerRecommendations}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fertilizer Details */}
                    <div style={{ padding: "24px" }}>
                      <h5 style={{ fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 12 }}>Fertilizer Details</h5>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {crop.fertilizerDetails.map((detail: string, idx: number) => (
                          <li key={idx} style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div style={{
                marginTop: 32,
                padding: 20,
                background: "rgba(245, 158, 11, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(245, 158, 11, 0.1)",
                textAlign: "center"
              }}>
                <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
                  💡 <strong>Tip:</strong> Follow our AI-recommended fertilization schedule for optimal crop growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      {/* Language Selector (Bottom Left) */}
      <div style={{
        position: "fixed",
        left: 24,
        bottom: 24,
        zIndex: 2000,
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #bae6fd",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: 10
      }}>
        <span style={{ color: "#16a34a", fontWeight: 600, fontSize: 14 }}>{t('Language:')}</span>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          style={{
            border: "1px solid #bae6fd",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 14,
            color: "#16a34a",
            background: "#fff",
            outline: "none"
          }}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bn">বাংলা</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="mr">मराठी</option>
          <option value="gu">ગુજરાતી</option>
          <option value="ml">മലയാളം</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="or">ଓଡ଼ିଆ</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
          <option value="as">অসমীয়া</option>
          <option value="ur">اردو</option>
          <option value="ne">नेपाली</option>
          <option value="ks">کٲشُر</option>
          <option value="kok">कोंकणी</option>
          <option value="sd">سنڌي</option>
          <option value="doi">डोगरी</option>
          <option value="mni">মৈতৈলোন্</option>
          <option value="brx">बड़ो</option>
        </select>
      </div>
    </div>
  );
};

export default App;
