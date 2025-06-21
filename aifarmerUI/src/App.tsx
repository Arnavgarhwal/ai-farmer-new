import React, { useState } from "react";
import IrrigationAdviceModal from "./IrrigationAdviceModal";
import CropSuggestionsModal from "./CropSuggestionsModal";
import EquipmentGuideModal from "./EquipmentGuideModal";
import CostAnalysisModal from "./CostAnalysisModal";
import YieldPredictionModal from "./YieldPredictionModal";
import WeatherUpdatesModal from "./WeatherUpdatesModal";
import HarvestPlanningModal from "./HarvestPlanningModal";
import NearbyMarketplaceModal from "./NearbyMarketplaceModal";
import i18n from "./i18n";
import { useTranslation } from 'react-i18next';

// List of all Indian States and Union Territories
const indianStates = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh", 
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

// Soil Types
const soilTypes = [
  "Alluvial Soil",
  "Black Soil (Regur)",
  "Red Soil",
  "Laterite Soil",
  "Mountain Soil",
  "Desert Soil",
  "Saline Soil",
  "Peaty Soil"
];

// Comprehensive Crop Database with detailed economics
const cropDatabase = [
  {
    name: "Rice",
    icon: "🌾",
    investmentLevel: "Medium",
    growingRequirement: {
      season: ["Kharif", "Rabi"],
      soilType: ["Alluvial Soil", "Clay Loam"],
      duration: "90-150 days",
      waterLevel: "High"
    },
    economicsPerAcre: {
      yield: "25-30 Quintals",
      marketPrice: "₹1,800 - ₹2,500 / Quintal",
      grossRevenue: "₹45,000 - ₹75,000",
      netProfit: "₹20,000 - ₹40,000"
    },
    priceBreakdown: {
      seeds: "₹4,000",
      fertilizers: "₹6,000",
      labor: "₹10,000",
      transportation: "₹2,000",
      pesticides: "N/A",
      other: "₹3,000"
    },
    description: "A staple food for a large part of the world's population. It requires significant water and labor but offers good returns."
  },
  {
    name: "Wheat",
    icon: "🌾",
    investmentLevel: "Medium",
    growingRequirement: {
      season: ["Rabi"],
      soilType: ["Alluvial Soil", "Clay Loam", "Black Soil"],
      duration: "110-130 days",
      waterLevel: "Medium"
    },
    economicsPerAcre: {
      yield: "20-25 Quintals",
      marketPrice: "₹1,900 - ₹2,200 / Quintal",
      grossRevenue: "₹38,000 - ₹55,000",
      netProfit: "₹18,000 - ₹28,000"
    },
    priceBreakdown: {
      seeds: "₹3,500",
      fertilizers: "₹5,000",
      labor: "₹8,000",
      transportation: "₹1,500",
      pesticides: "N/A",
      other: "₹2,000"
    },
    description: "A primary winter crop in India, crucial for food security. It is less water-intensive than rice."
  },
  {
    name: "Cotton",
    icon: "🧶",
    investmentLevel: "High",
    growingRequirement: {
        season: ["Kharif"],
        soilType: ["Black Soil", "Red Soil"],
        duration: "150-180 days",
        waterLevel: "Medium"
    },
    economicsPerAcre: {
        yield: "8-12 Quintals",
        marketPrice: "₹5,000 - ₹6,000 / Quintal",
        grossRevenue: "₹40,000 - ₹72,000",
        netProfit: "₹15,000 - ₹35,000"
    },
    priceBreakdown: {
        seeds: "₹7,000",
        fertilizers: "₹8,000",
        pesticides: "₹5,000",
        labor: "₹12,000",
        transportation: "₹2,500"
    },
    description: "A key cash crop, known as 'White Gold'. It has a high investment cost, mainly due to seeds and pest control."
  },
  {
    name: "Sugarcane",
    icon: "🎋",
    investmentLevel: "High",
    growingRequirement: {
        season: ["Kharif"],
        soilType: ["Alluvial Soil", "Black Soil"],
        duration: "12-18 months",
        waterLevel: "High"
    },
    economicsPerAcre: {
        yield: "30-40 Tonnes",
        marketPrice: "₹2,500 - ₹3,500 / Tonne",
        grossRevenue: "₹75,000 - ₹1,40,000",
        netProfit: "₹40,000 - ₹80,000"
    },
    priceBreakdown: {
        seeds: "₹10,000",
        fertilizers: "₹12,000",
        labor: "₹15,000",
        transportation: "₹8,000",
        pesticides: "N/A",
        other: "₹5,000"
    },
    description: "A long-duration crop that is a major source of sugar and jaggery. It offers high profits but requires sustained investment and water."
  },
  {
    name: "Maize",
    icon: "🌽",
    investmentLevel: "Medium",
    growingRequirement: { 
      season: ["Kharif", "Rabi"], 
      soilType: ["Alluvial Soil", "Red Soil", "Loam"], 
      duration: "90-110 days", 
      waterLevel: "Medium" 
    },
    economicsPerAcre: { 
      yield: "20-25 Quintals", 
      marketPrice: "₹1,700 - ₹2,100 / Quintal", 
      grossRevenue: "₹34,000 - ₹52,500", 
      netProfit: "₹15,000 - ₹25,000" 
    },
    priceBreakdown: { 
      seeds: "₹4,000", 
      fertilizers: "₹5,500", 
      labor: "₹8,000", 
      transportation: "₹2,000", 
      pesticides: "₹2,000", 
      other: "₹2,500" 
    },
    description: "A versatile cereal grain used for human consumption, animal feed, and industrial products. It's adaptable to various climates."
  },
  {
    name: "Pulses (Chickpea)",
    icon: "🫘",
    investmentLevel: "Low",
    growingRequirement: { 
      season: ["Rabi"], 
      soilType: ["Light to heavy soils", "Sandy Loam"], 
      duration: "95-105 days", 
      waterLevel: "Low" 
    },
    economicsPerAcre: { 
      yield: "8-10 Quintals", 
      marketPrice: "₹4,500 - ₹5,500 / Quintal", 
      grossRevenue: "₹36,000 - ₹55,000", 
      netProfit: "₹20,000 - ₹35,000" 
    },
    priceBreakdown: { 
      seeds: "₹3,000", 
      fertilizers: "₹3,000", 
      labor: "₹7,000", 
      transportation: "₹1,500", 
      pesticides: "₹1,500", 
      other: "₹2,000" 
    },
    description: "An important pulse crop, valued for its high protein content. It improves soil fertility by fixing nitrogen."
  },
  {
    name: "Soybean",
    icon: "🌱",
    investmentLevel: "Medium",
    growingRequirement: { 
      season: ["Kharif"], 
      soilType: ["Loam", "Clay Loam"], 
      duration: "80-100 days", 
      waterLevel: "Medium" 
    },
    economicsPerAcre: { 
      yield: "10-12 Quintals", 
      marketPrice: "₹3,500 - ₹4,500 / Quintal", 
      grossRevenue: "₹35,000 - ₹54,000", 
      netProfit: "₹15,000 - ₹28,000" 
    },
    priceBreakdown: { 
      seeds: "₹3,500", 
      fertilizers: "₹5,000", 
      labor: "₹9,000", 
      transportation: "₹2,000", 
      pesticides: "₹2,500", 
      other: "₹2,000" 
    },
    description: "A globally important crop providing oil and protein. Used in a variety of food products and for animal feed."
  },
  {
    name: "Tomato",
    icon: "🍅",
    investmentLevel: "High",
    growingRequirement: { 
      season: ["Rabi", "Summer"], 
      soilType: ["Sandy Loam", "Clay Loam", "Red Soil"], 
      duration: "120-140 days", 
      waterLevel: "Medium" 
    },
    economicsPerAcre: { 
      yield: "100-150 Quintals", 
      marketPrice: "₹800 - ₹1,500 / Quintal", 
      grossRevenue: "₹80,000 - ₹2,25,000", 
      netProfit: "₹40,000 - ₹1,50,000" 
    },
    priceBreakdown: { 
      seeds: "₹8,000", 
      fertilizers: "₹10,000", 
      labor: "₹20,000", 
      transportation: "₹5,000", 
      pesticides: "₹7,000", 
      other: "₹5,000" 
    },
    description: "A popular and high-value vegetable crop. Prices can be volatile, but potential for high returns is significant."
  },
  {
    name: "Potato",
    icon: "🥔",
    investmentLevel: "High",
    growingRequirement: { 
      season: ["Rabi"], 
      soilType: ["Sandy Loam", "Silt Loam"], 
      duration: "90-120 days", 
      waterLevel: "Medium" 
    },
    economicsPerAcre: { 
      yield: "100-120 Quintals", 
      marketPrice: "₹1,000 - ₹1,800 / Quintal", 
      grossRevenue: "₹1,00,000 - ₹2,16,000", 
      netProfit: "₹50,000 - ₹1,40,000" 
    },
    priceBreakdown: { 
      seeds: "₹20,000", 
      fertilizers: "₹12,000", 
      labor: "₹15,000", 
      transportation: "₹6,000", 
      pesticides: "₹6,000", 
      other: "₹5,000" 
    },
    description: "A major tuber crop and a staple food in many regions. Requires high seed cost but offers excellent profitability."
  },
  {
    name: "Groundnut (Peanut)",
    icon: "🥜",
    investmentLevel: "Medium",
    growingRequirement: {
      season: ["Kharif", "Summer"],
      soilType: ["Sandy Loam", "Light Soil"],
      duration: "100-120 days",
      waterLevel: "Medium"
    },
    economicsPerAcre: {
      yield: "15-20 Quintals",
      marketPrice: "₹4,000 - ₹5,500 / Quintal",
      grossRevenue: "₹60,000 - ₹1,10,000",
      netProfit: "₹25,000 - ₹50,000"
    },
    priceBreakdown: {
      seeds: "₹4,500",
      fertilizers: "₹5,000",
      labor: "₹10,000",
      transportation: "₹2,000",
      pesticides: "₹2,500",
      other: "₹3,000"
    },
    description: "A major oilseed crop, valued for its edible seeds and oil. Grows best in sandy soils with moderate rainfall."
  },
  {
    name: "Banana",
    icon: "🍌",
    investmentLevel: "High",
    growingRequirement: {
      season: ["All Year"],
      soilType: ["Alluvial Soil", "Loam"],
      duration: "10-12 months",
      waterLevel: "High"
    },
    economicsPerAcre: {
      yield: "30-40 Tonnes",
      marketPrice: "₹8,000 - ₹12,000 / Tonne",
      grossRevenue: "₹2,40,000 - ₹4,80,000",
      netProfit: "₹1,00,000 - ₹2,00,000"
    },
    priceBreakdown: {
      seedlings: "₹20,000",
      fertilizers: "₹25,000",
      labor: "₹30,000",
      irrigation: "₹15,000",
      transportation: "₹10,000",
      other: "₹10,000"
    },
    description: "A high-value fruit crop with year-round cultivation. Requires high investment but offers excellent returns."
  },
  {
    name: "Onion",
    icon: "🧅",
    investmentLevel: "Medium",
    growingRequirement: {
      season: ["Rabi", "Kharif"],
      soilType: ["Loam", "Sandy Loam"],
      duration: "90-120 days",
      waterLevel: "Medium"
    },
    economicsPerAcre: {
      yield: "80-120 Quintals",
      marketPrice: "₹800 - ₹2,000 / Quintal",
      grossRevenue: "₹64,000 - ₹2,40,000",
      netProfit: "₹30,000 - ₹1,20,000"
    },
    priceBreakdown: {
      seeds: "₹3,000",
      fertilizers: "₹8,000",
      labor: "₹15,000",
      irrigation: "₹5,000",
      transportation: "₹4,000",
      other: "₹3,000"
    },
    description: "A staple vegetable crop with fluctuating prices. Requires careful post-harvest handling and storage."
  },
  {
    name: "Mustard",
    icon: "🌻",
    investmentLevel: "Low",
    growingRequirement: {
      season: ["Rabi"],
      soilType: ["Alluvial Soil", "Loam"],
      duration: "100-120 days",
      waterLevel: "Low"
    },
    economicsPerAcre: {
      yield: "8-10 Quintals",
      marketPrice: "₹4,000 - ₹5,000 / Quintal",
      grossRevenue: "₹32,000 - ₹50,000",
      netProfit: "₹18,000 - ₹30,000"
    },
    priceBreakdown: {
      seeds: "₹2,000",
      fertilizers: "₹2,500",
      labor: "₹6,000",
      transportation: "₹1,500",
      pesticides: "₹1,000",
      other: "₹1,500"
    },
    description: "A key oilseed crop grown in winter. Low input costs and good market demand for oil extraction."
  },
  {
    name: "Brinjal (Eggplant)",
    icon: "🍆",
    investmentLevel: "Medium",
    growingRequirement: {
      season: ["Kharif", "Rabi", "Summer"],
      soilType: ["Sandy Loam", "Clay Loam"],
      duration: "120-150 days",
      waterLevel: "Medium"
    },
    economicsPerAcre: {
      yield: "120-180 Quintals",
      marketPrice: "₹700 - ₹1,200 / Quintal",
      grossRevenue: "₹84,000 - ₹2,16,000",
      netProfit: "₹35,000 - ₹1,00,000"
    },
    priceBreakdown: {
      seeds: "₹2,500",
      fertilizers: "₹7,000",
      labor: "₹18,000",
      irrigation: "₹4,000",
      transportation: "₹3,000",
      pesticides: "₹2,500",
      other: "₹2,000"
    },
    description: "A popular vegetable crop with high yield potential. Grows well in warm climates and is harvested multiple times."
  }
];

const cropCategories = ["All", "Low", "Medium", "High"]; // For filtering by investment level

// Seasons
const seasons = ["Kharif", "Rabi", "Zaid", "All Year"];

// Government Schemes Database
const governmentSchemes = [
  {
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    icon: "💰",
    category: "Direct Income Support",
    description: "Provides direct income support of ₹6,000 per year to eligible farmer families",
    eligibility: "Small and marginal farmers with landholding up to 2 hectares",
    benefits: "₹6,000 per year in 3 equal installments",
    states: ["All States"],
    applicationProcess: "Online through PM-KISAN portal or Common Service Centers",
    website: "https://pmkisan.gov.in",
    status: "Active"
  },
  {
    name: "PM Fasal Bima Yojana (PMFBY)",
    icon: "🛡️",
    category: "Crop Insurance",
    description: "Comprehensive crop insurance scheme to protect farmers against natural calamities",
    eligibility: "All farmers growing notified crops",
    benefits: "Up to 100% crop loss coverage, low premium rates",
    states: ["All States"],
    applicationProcess: "Through banks, insurance companies, or Common Service Centers",
    website: "https://pmfby.gov.in",
    status: "Active"
  },
  {
    name: "Kisan Credit Card (KCC)",
    icon: "💳",
    category: "Credit Support",
    description: "Provides easy access to credit for farmers to meet agricultural needs",
    eligibility: "All farmers including tenant farmers and sharecroppers",
    benefits: "Up to ₹3 lakh credit limit, low interest rates, flexible repayment",
    states: ["All States"],
    applicationProcess: "Through banks and cooperative societies",
    website: "https://www.nabard.org",
    status: "Active"
  },
  {
    name: "Soil Health Card Scheme",
    icon: "🌱",
    category: "Soil Management",
    description: "Provides soil health cards to farmers with soil testing and recommendations",
    eligibility: "All farmers",
    benefits: "Free soil testing, personalized recommendations for fertilizers",
    states: ["All States"],
    applicationProcess: "Through agriculture department offices",
    website: "https://soilhealth.dac.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)",
    icon: "💧",
    category: "Irrigation",
    description: "Comprehensive irrigation scheme to ensure water security",
    eligibility: "Farmers in water-scarce areas",
    benefits: "Subsidy for irrigation equipment, micro-irrigation systems",
    states: ["All States"],
    applicationProcess: "Through agriculture department and banks",
    website: "https://pmksy.gov.in",
    status: "Active"
  },
  {
    name: "National Agriculture Market (eNAM)",
    icon: "🏪",
    category: "Market Access",
    description: "Online trading platform for agricultural commodities",
    eligibility: "All farmers and traders",
    benefits: "Better price discovery, reduced transaction costs",
    states: ["All States"],
    applicationProcess: "Online registration through eNAM portal",
    website: "https://enam.gov.in",
    status: "Active"
  },
  {
    name: "PM-FME (Pradhan Mantri Formalisation of Micro Food Processing Enterprises)",
    icon: "🏭",
    category: "Food Processing",
    description: "Support for micro food processing enterprises",
    eligibility: "Micro food processing units, self-help groups",
    benefits: "Up to 35% subsidy, credit support, training",
    states: ["All States"],
    applicationProcess: "Through state implementing agencies",
    website: "https://pmfme.mofpi.gov.in",
    status: "Active"
  },
  {
    name: "PMKSY-PDMC (Per Drop More Crop)",
    icon: "💧",
    category: "Micro Irrigation",
    description: "Promotes micro irrigation for water conservation",
    eligibility: "Farmers with small landholdings",
    benefits: "Up to 55% subsidy for micro irrigation systems",
    states: ["All States"],
    applicationProcess: "Through agriculture department",
    website: "https://pmksy.gov.in",
    status: "Active"
  },
  {
    name: "National Mission for Sustainable Agriculture (NMSA)",
    icon: "🌿",
    category: "Sustainable Farming",
    description: "Promotes sustainable agriculture practices",
    eligibility: "Farmers practicing organic farming",
    benefits: "Support for organic farming, soil conservation",
    states: ["All States"],
    applicationProcess: "Through agriculture department",
    website: "https://nmsa.dac.gov.in",
    status: "Active"
  },
  {
    name: "PM-KMY (Pradhan Mantri Kisan Maan Dhan Yojana)",
    icon: "👴",
    category: "Pension Scheme",
    description: "Pension scheme for small and marginal farmers",
    eligibility: "Farmers aged 18-40 years with landholding up to 2 hectares",
    benefits: "₹3,000 monthly pension after 60 years",
    states: ["All States"],
    applicationProcess: "Through Common Service Centers",
    website: "https://pmkmy.gov.in",
    status: "Active"
  },
  {
    name: "Maharashtra - Shetkari Sanman Yojana",
    icon: "🏛️",
    category: "State Scheme",
    description: "Direct income support for farmers in Maharashtra",
    eligibility: "Farmers in Maharashtra",
    benefits: "₹6,000 per year additional support",
    states: ["Maharashtra"],
    applicationProcess: "Through Maharashtra government portal",
    website: "https://maharashtra.gov.in",
    status: "Active"
  },
  {
    name: "Punjab - Bigha Sansad Yojana",
    icon: "🏛️",
    category: "State Scheme",
    description: "Support for farmers in Punjab",
    eligibility: "Farmers in Punjab",
    benefits: "Various subsidies and support programs",
    states: ["Punjab"],
    applicationProcess: "Through Punjab agriculture department",
    website: "https://punjab.gov.in",
    status: "Active"
  }
];

// Scheme Categories
const schemeCategories = [
  "All Categories",
  "Direct Income Support",
  "Crop Insurance",
  "Credit Support",
  "Soil Management",
  "Irrigation",
  "Market Access",
  "Food Processing",
  "Micro Irrigation",
  "Sustainable Farming",
  "Pension Scheme",
  "State Scheme"
];

// Irrigation Advice Database
const irrigationAdvice = [
  {
    name: "Drip Irrigation",
    icon: "💧",
    category: "Micro-Irrigation",
    description: "Delivers water directly to the root zone of plants, minimizing evaporation and runoff. Highly efficient for row crops and orchards.",
    cost: "High (₹50,000 - ₹1,00,000 per acre)",
    advantages: ["High water efficiency (90-95%)", "Reduces weed growth", "Fertilizer can be applied with water (fertigation)"],
    disadvantages: ["High initial investment", "Clogging of emitters", "Requires regular maintenance"],
    suitableCrops: ["Fruits (Grapes, Banana, Pomegranate)", "Vegetables (Tomato, Potato, Onion)", "Cotton", "Sugarcane"],
    link: "https://nph.onlinelibrary.wiley.com/doi/10.1002/ppp3.10218"
  },
  {
    name: "Sprinkler Irrigation",
    icon: "💦",
    category: "Micro-Irrigation",
    description: "Water is sprayed over the crops, simulating natural rainfall. Suitable for a wide variety of crops and soil types.",
    cost: "Medium (₹25,000 - ₹50,000 per acre)",
    advantages: ["Covers a large area", "Suitable for most soil types", "Reduces soil erosion"],
    disadvantages: ["Lower water efficiency than drip (60-80%)", "High evaporation losses in windy/hot conditions", "Can lead to fungal diseases on leaves"],
    suitableCrops: ["Wheat", "Gram", "Maize", "Pulses", "Groundnut"],
    link: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/sprinkler-irrigation"
  },
  {
    name: "Surface Irrigation (Flood/Furrow)",
    icon: "🌊",
    category: "Conventional",
    description: "Water is applied to the field in either a continuous or intermittent stream. The most common and oldest method of irrigation.",
    cost: "Low (Minimal infrastructure needed)",
    advantages: ["Low initial cost", "Simple to operate", "Can leach salts from the root zone"],
    disadvantages: ["Very low water efficiency (40-50%)", "High water wastage", "Uneven water distribution"],
    suitableCrops: ["Rice", "Wheat", "Sugarcane"],
    link: "https://www.sciencedirect.com/topics/earth-and-planetary-sciences/surface-irrigation"
  },
  {
    name: "Subsurface Irrigation",
    icon: "🌿",
    category: "Advanced",
    description: "A system of buried pipes or tubes delivers water directly to the plant root zone, eliminating surface evaporation.",
    cost: "Very High (Over ₹1,00,000 per acre)",
    advantages: ["Highest water efficiency (>95%)", "No surface runoff or evaporation", "Improves soil aeration"],
    disadvantages: ["Very high installation and maintenance costs", "Risk of soil salinization if not managed properly", "Difficult to inspect and repair"],
    suitableCrops: ["High-value cash crops", "Greenhouses", "Areas with severe water scarcity"],
    link: "https://www.sciencedirect.com/topics/engineering/subsurface-irrigation"
  }
];

const irrigationCategories = ["All", "Micro-Irrigation", "Conventional", "Advanced"];

// Equipment Guide Database
const equipmentGuide = [
  {
    name: "Tractor",
    icon: "🚜",
    category: "Machinery",
    price: "₹3,00,000 - ₹15,00,000",
    uses: ["Ploughing", "Tilling", "Hauling", "Operating other implements"],
    suitableFor: "Medium to large-scale farms",
    maintenance: "High (Regular engine checks, oil changes, tire pressure)",
    advantages: ["Versatile and powerful", "Saves significant labor and time", "Can be used for multiple farm operations"],
    disadvantages: ["High initial cost", "Requires skilled operator", "High fuel and maintenance costs"],
    importance: "The backbone of modern mechanized agriculture, essential for large-scale operations.",
    link: "https://www.tractorjunction.com"
  },
  {
    name: "Sprayer",
    icon: "💨",
    category: "Crop Care",
    price: "₹500 (Handheld) - ₹5,00,000 (Tractor-mounted)",
    uses: ["Applying pesticides, herbicides, and fertilizers", "Foliar feeding"],
    suitableFor: "All farm sizes, with different types available",
    maintenance: "Medium (Regular cleaning of nozzles and tanks)",
    advantages: ["Ensures uniform application of liquids", "Saves time compared to manual methods", "Effective pest and disease control"],
    disadvantages: ["Risk of chemical exposure", "Drift can affect non-target areas", "Can be expensive for large models"],
    importance: "Crucial for protecting crops from pests and diseases, thereby securing yield.",
    link: "https://www.agrifarming.in/types-of-sprayers-in-agriculture"
  },
  {
    name: "Seed Drill",
    icon: "🌱",
    category: "Planting",
    price: "₹20,000 - ₹1,50,000",
    uses: ["Sowing seeds at a specific depth and spacing", "Applying fertilizer along with seeds"],
    suitableFor: "Medium to large-scale farms for row crops",
    maintenance: "Low (Cleaning after use, checking for blockages)",
    advantages: ["Uniform seed distribution", "Saves labor and time", "Improves germination rates"],
    disadvantages: ["Not suitable for all types of seeds or soil", "Requires a tractor to operate"],
    importance: "Ensures optimal plant population and spacing, which is critical for achieving high yields.",
    link: "https://www.agrifarming.in/seed-drill-in-agriculture"
  },
  {
    name: "Solar Panel System",
    icon: "☀️",
    category: "Energy & Tech",
    price: "₹50,000 - ₹5,00,000 (depending on capacity)",
    uses: ["Powering water pumps", "Lighting for farmhouses and sheds", "Running other electrical equipment"],
    suitableFor: "Farms in areas with good sunlight, especially off-grid locations",
    maintenance: "Low (Periodic cleaning of panels)",
    advantages: ["Reduces electricity bills", "Environmentally friendly", "Low running costs after installation"],
    disadvantages: ["High initial investment", "Dependent on weather conditions", "Requires space for installation"],
    importance: "Provides a sustainable and cost-effective energy source, reducing reliance on the grid and diesel generators.",
    link: "https://www.loomsolar.com/blogs/collections/solar-panel-for-agriculture"
  },
  {
    name: "Soil Sensors",
    icon: "🔬",
    category: "Energy & Tech",
    price: "₹5,000 - ₹50,000 per sensor kit",
    uses: ["Monitoring soil moisture levels", "Measuring soil temperature and nutrient content (pH, NPK)"],
    suitableFor: "Precision farming, high-value crops, and water-scarce areas",
    maintenance: "Low (Calibration and battery replacement)",
    advantages: ["Enables data-driven irrigation and fertilization", "Saves water and fertilizer", "Improves crop health and yield"],
    disadvantages: ["Initial cost can be high for large areas", "Requires technical knowledge to interpret data"],
    importance: "A key tool for precision agriculture, allowing farmers to make informed decisions based on real-time soil conditions.",
    link: "https://www.sensoterra.com/en/technologies/soil-moisture-sensor-agriculture/"
  },
  {
    name: "Rotavator",
    icon: "🌀",
    category: "Machinery",
    price: "₹60,000 - ₹1,50,000",
    uses: ["Soil preparation", "Mixing crop residues", "Weed control"],
    suitableFor: "All farm sizes, especially for seedbed preparation",
    maintenance: "Medium (Blade sharpening, gearbox oil check)",
    advantages: ["Reduces soil clods", "Saves time and labor", "Improves soil aeration"],
    disadvantages: ["Can cause soil compaction if overused", "Requires tractor power"],
    importance: "Essential for modern tillage and seedbed preparation.",
    link: "https://www.tractorjunction.com/implement/rotavator/"
  },
  {
    name: "Sprinkler System",
    icon: "💦",
    category: "Crop Care",
    price: "₹10,000 - ₹1,00,000",
    uses: ["Irrigation of crops", "Cooling crops during heat waves"],
    suitableFor: "All farm sizes, especially for vegetables and lawns",
    maintenance: "Low (Nozzle cleaning, pipe checks)",
    advantages: ["Uniform water distribution", "Reduces water wastage", "Can be automated"],
    disadvantages: ["Evaporation losses in hot/windy weather", "Initial setup cost"],
    importance: "Efficient irrigation for a wide range of crops.",
    link: "https://www.krishijagran.com/agripedia/sprinkler-irrigation-system/"
  },
  {
    name: "Drip Irrigation Kit",
    icon: "💧",
    category: "Crop Care",
    price: "₹15,000 - ₹80,000 per acre",
    uses: ["Precise irrigation at root zone", "Fertigation"],
    suitableFor: "High-value crops, orchards, water-scarce areas",
    maintenance: "Medium (Filter cleaning, emitter checks)",
    advantages: ["Saves water and fertilizer", "Reduces weed growth", "Improves yield"],
    disadvantages: ["Clogging risk", "Requires regular maintenance", "Initial investment"],
    importance: "Best for water conservation and high-value crops.",
    link: "https://www.indiamart.com/proddetail/drip-irrigation-kit-18649292462.html"
  },
  {
    name: "Harvester",
    icon: "🚜",
    category: "Machinery",
    price: "₹10,00,000 - ₹35,00,000",
    uses: ["Harvesting crops like wheat, rice, maize"],
    suitableFor: "Large farms, commercial operations",
    maintenance: "High (Blade sharpening, engine and hydraulic checks)",
    advantages: ["Saves time and labor", "Reduces crop loss", "Efficient harvesting"],
    disadvantages: ["Very high cost", "Requires skilled operator", "High maintenance"],
    importance: "Vital for large-scale, timely harvesting.",
    link: "https://www.tractorjunction.com/harvester/"
  },
  {
    name: "Shovel",
    icon: "🛠️",
    category: "Hand Tools",
    price: "₹300 - ₹1,000",
    uses: ["Digging", "Moving soil, compost, or manure"],
    suitableFor: "All farm sizes, basic tool",
    maintenance: "Low (Keep clean and dry)",
    advantages: ["Inexpensive", "Versatile", "Easy to use"],
    disadvantages: ["Labor-intensive", "Limited to small areas"],
    importance: "Basic tool for every farmer.",
    link: "https://www.indiamart.com/proddetail/shovel-18649292462.html"
  },
  {
    name: "Rake",
    icon: "🧹",
    category: "Hand Tools",
    price: "₹200 - ₹800",
    uses: ["Collecting leaves, hay, or grass", "Leveling soil"],
    suitableFor: "All farm sizes, gardens",
    maintenance: "Low (Keep tines straight, clean after use)",
    advantages: ["Simple and effective", "Low cost", "No fuel required"],
    disadvantages: ["Manual labor", "Limited to small areas"],
    importance: "Essential for cleaning and preparing fields.",
    link: "https://www.indiamart.com/proddetail/rake-18649292462.html"
  },
  {
    name: "Cutting Tool (Sickle)",
    icon: "🔪",
    category: "Hand Tools",
    price: "₹100 - ₹500",
    uses: ["Harvesting crops by hand", "Cutting grass or weeds"],
    suitableFor: "Small farms, gardens, manual harvesting",
    maintenance: "Low (Sharpen blade, keep dry)",
    advantages: ["Very low cost", "Precise cutting", "No fuel required"],
    disadvantages: ["Labor-intensive", "Slow for large areas", "Risk of injury"],
    importance: "Traditional tool, still vital for small-scale harvesting.",
    link: "https://www.indiamart.com/proddetail/sickle-18649292462.html"
  },
  {
    name: "Harrow",
    icon: "🪓",
    category: "Machinery",
    price: "₹20,000 - ₹1,00,000",
    uses: ["Breaking up soil clods", "Leveling soil", "Incorporating crop residues"],
    suitableFor: "Medium to large farms",
    maintenance: "Medium (Check tines/discs, lubricate bearings)",
    advantages: ["Improves soil structure", "Prepares seedbed", "Reduces weeds"],
    disadvantages: ["Requires tractor", "Can cause compaction if overused"],
    importance: "Key for secondary tillage and seedbed preparation.",
    link: "https://www.tractorjunction.com/implement/harrow/"
  },
  {
    name: "Trailer",
    icon: "🚚",
    category: "Machinery",
    price: "₹40,000 - ₹2,00,000",
    uses: ["Transporting produce, inputs, or equipment"],
    suitableFor: "All farm sizes, especially for moving heavy loads",
    maintenance: "Low (Check tires, lubricate axles)",
    advantages: ["Saves time and labor", "Versatile", "Can be attached to tractor"],
    disadvantages: ["Requires tractor or vehicle", "Limited use without road access"],
    importance: "Essential for efficient transport on and off the farm.",
    link: "https://www.tractorjunction.com/implement/trailer/"
  },
  {
    name: "Water Pump",
    icon: "💧",
    category: "Energy & Tech",
    price: "₹5,000 - ₹50,000",
    uses: ["Lifting water from wells, rivers, or tanks", "Irrigation"],
    suitableFor: "All farm sizes, especially where water is not gravity-fed",
    maintenance: "Medium (Check for leaks, lubricate moving parts)",
    advantages: ["Enables irrigation", "Saves labor", "Can be powered by diesel, electric, or solar"],
    disadvantages: ["Requires fuel or electricity", "Needs regular maintenance"],
    importance: "Critical for water management and irrigation.",
    link: "https://www.indiamart.com/proddetail/water-pump-18649292462.html"
  },
  {
    name: "Motor",
    icon: "⚙️",
    category: "Energy & Tech",
    price: "₹3,000 - ₹30,000",
    uses: ["Powering pumps, threshers, and other equipment"],
    suitableFor: "All farm sizes, especially for mechanized operations",
    maintenance: "Medium (Check wiring, lubricate bearings)",
    advantages: ["Versatile", "Reduces manual labor", "Can be used for multiple applications"],
    disadvantages: ["Requires electricity or fuel", "Needs regular maintenance"],
    importance: "Drives a variety of farm equipment, essential for mechanization.",
    link: "https://www.indiamart.com/proddetail/electric-motor-18649292462.html"
  }
];

const equipmentCategories = ["All", "Machinery", "Crop Care", "Planting", "Energy & Tech", "Hand Tools"];

const features = [
  { name: "Crop Suggestions", icon: "🌾" },
  { name: "Yield Prediction", icon: "📊" },
  { name: "Irrigation Advice", icon: "💧" },
  { name: "Equipment Guide", icon: "🚜" },
  { name: "Cost Analysis", icon: "💰" },
  { name: "Government Schemes", icon: "🏛️" },
  { name: "Harvest Planning", icon: "🌾" },
  { name: "Weather Updates", icon: "🌤️" },
  { name: "Nearby Marketplace/Mandi", icon: "🏬" },
];

// Mock data for nearby marketplaces
const mockMarketplaces = [
  {
    name: "Krishi Upaj Mandi, Indore",
    location: "Indore, Madhya Pradesh",
    distance: "5.2 km",
    crops: ["Wheat", "Soybean", "Maize"],
    googleMapsUrl: "https://www.google.com/maps?q=Krishi+Upaj+Mandi+Indore"
  },
  {
    name: "APMC Market, Navi Mumbai",
    location: "Navi Mumbai, Maharashtra",
    distance: "12.8 km",
    crops: ["Rice", "Onion", "Tomato"],
    googleMapsUrl: "https://www.google.com/maps?q=APMC+Market+Navi+Mumbai"
  },
  {
    name: "Azadpur Mandi",
    location: "Delhi",
    distance: "3.5 km",
    crops: ["Potato", "Banana", "Brinjal"],
    googleMapsUrl: "https://www.google.com/maps?q=Azadpur+Mandi+Delhi"
  },
  {
    name: "Koyambedu Market",
    location: "Chennai, Tamil Nadu",
    distance: "8.1 km",
    crops: ["Onion", "Tomato", "Banana"],
    googleMapsUrl: "https://www.google.com/maps?q=Koyambedu+Market+Chennai"
  }
];

const App: React.FC = () => {
  const { t } = useTranslation();
  const [showFeatures, setShowFeatures] = useState(false);
  const [userState, setUserState] = useState("");
  const [userDistrict, setUserDistrict] = useState("");
  const [cropName, setCropName] = useState("");
  const [harvestingDate, setHarvestingDate] = useState("");
  
  // Government Schemes State
  const [showSchemesModal, setShowSchemesModal] = useState(false);
  const [schemesCategory, setSchemesCategory] = useState("All Categories");
  const [schemesSearch, setSchemesSearch] = useState("");

  // Irrigation Advice Modal State
  const [showIrrigationModal, setShowIrrigationModal] = useState(false);

  // Crop Suggestions Modal State
  const [showCropSuggestionsModal, setShowCropSuggestionsModal] = useState(false);

  // Equipment Guide Modal State
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  // Cost Analysis Modal State
  const [showCostAnalysisModal, setShowCostAnalysisModal] = useState(false);

  // Yield Prediction Modal State
  const [showYieldPredictionModal, setShowYieldPredictionModal] = useState(false);

  // Weather Updates Modal State
  const [showWeatherUpdatesModal, setShowWeatherUpdatesModal] = useState(false);

  // Harvest Planning Modal State
  const [showHarvestPlanningModal, setShowHarvestPlanningModal] = useState(false);

  // Nearby Marketplace Modal State
  const [showMarketplaceModal, setShowMarketplaceModal] = useState(false);

  // Admin Login Modal State
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<'bright' | 'dark'>('bright');
  // Language state
  const [language, setLanguage] = useState('en');

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("State:", userState);
    console.log("District:", userDistrict);
    console.log("Crop Name:", cropName);
    console.log("Harvesting Date:", harvestingDate);
    // Here you can add logic to process the form data
  };

  // Reset form fields
  const resetForm = () => {
    setUserState("");
    setUserDistrict("");
    setCropName("");
    setHarvestingDate("");
  };

  const handleShowSchemes = () => {
    setShowFeatures(false);
    setShowSchemesModal(true);
  };
  
  const handleCloseSchemes = () => {
    setShowSchemesModal(false);
  };
  
  const handleShowIrrigation = () => {
    setShowFeatures(false);
    setShowIrrigationModal(true);
  };

  const handleCloseIrrigation = () => {
    setShowIrrigationModal(false);
  };
  
  const handleShowCropSuggestions = () => {
    setShowFeatures(false);
    setShowCropSuggestionsModal(true);
  };
  
  const handleCloseCropSuggestions = () => {
    setShowCropSuggestionsModal(false);
  };

  const handleShowEquipment = () => {
    setShowFeatures(false);
    setShowEquipmentModal(true);
  };
  
  const handleCloseEquipment = () => {
    setShowEquipmentModal(false);
  };

  const handleShowCostAnalysis = () => {
    setShowFeatures(false);
    setShowCostAnalysisModal(true);
  };

  const handleCloseCostAnalysis = () => {
    setShowCostAnalysisModal(false);
  };

  const handleShowYieldPrediction = () => {
    setShowFeatures(false);
    setShowYieldPredictionModal(true);
  };

  const handleCloseYieldPrediction = () => {
    setShowYieldPredictionModal(false);
  };

  const handleShowWeatherUpdates = () => {
    setShowFeatures(false);
    setShowWeatherUpdatesModal(true);
  };

  const handleCloseWeatherUpdates = () => {
    setShowWeatherUpdatesModal(false);
  };

  const handleShowHarvestPlanning = () => {
    setShowFeatures(false);
    setShowHarvestPlanningModal(true);
  };

  const handleCloseHarvestPlanning = () => {
    setShowHarvestPlanningModal(false);
  };

  const handleShowMarketplace = () => {
    setShowFeatures(false);
    setShowMarketplaceModal(true);
  };

  const handleCloseMarketplace = () => {
    setShowMarketplaceModal(false);
  };

  const filteredSchemes = governmentSchemes.filter(scheme => {
    const categoryMatch = schemesCategory === "All Categories" || scheme.category === schemesCategory;
    const searchMatch = scheme.name.toLowerCase().includes(schemesSearch.toLowerCase()) || 
                        scheme.description.toLowerCase().includes(schemesSearch.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <header style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 0 24px 0",
          background: "none"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src="/logo.png" alt="Intellifarm Systems Logo" style={{ height: 48, marginRight: 12 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Language Selector */}
            <select
              value={language}
              onChange={handleLanguageChange}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: 8,
                fontSize: 15,
                background: "#fff",
                color: "#14532d",
                fontWeight: 600,
                cursor: "pointer"
              }}
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
              <option value="te">తెలుగు</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
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
              aria-label="More features"
            >
              <span style={{ width: 20, height: 2, background: "#16a34a", borderRadius: 1 }} />
              <span style={{ width: 20, height: 2, background: "#16a34a", borderRadius: 1 }} />
              <span style={{ width: 20, height: 2, background: "#16a34a", borderRadius: 1 }} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 0px",
          margin: "0 auto"
        }}>
          <h1 style={{
            color: "#16a34a",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: "-0.025em"
          }}>
            {t('welcome')}
          </h1>
          <p style={{
            color: "#6B7280",
            fontSize: 18,
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 400,
            marginBottom: 32
          }}>
            {t('subtitle', 'Your one-stop platform for smart, sustainable, and profitable farming. Explore features using the menu above.')}
          </p>

          {/* Crop Information Form */}
          <section style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.08)",
            padding: 32,
            marginBottom: 40,
            width: "100%",
            maxWidth: 500
          }}>
            <h2 style={{
              color: "#16a34a",
              fontWeight: 700,
              fontSize: 24,
              marginBottom: 24,
              textAlign: "center"
            }}>
              {t('cropInformation')}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label htmlFor="userState" style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 8
                }}>
                  {t('yourState', 'Your State')}
                </label>
                <select
                  id="userState"
                  value={userState}
                  onChange={(e) => setUserState(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#16a34a";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                  }}
                >
                  <option value="">{t('selectYourState', 'Select your state')}</option>
                  {indianStates.map((state, idx) => (
                    <option key={idx} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="userDistrict" style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 8
                }}>
                  {t('yourDistrict', 'Your District')}
                </label>
                <input
                  type="text"
                  id="userDistrict"
                  value={userDistrict}
                  onChange={(e) => setUserDistrict(e.target.value)}
                  placeholder={t('enterYourDistrict', 'Enter your district')}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#16a34a";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                  }}
                />
              </div>
              <div>
                <label htmlFor="cropName" style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 8
                }}>
                  {t('cropName', 'Crop Name')}
                </label>
                <input
                  type="text"
                  id="cropName"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder={t('enterCropName', 'Enter crop name (e.g., Wheat, Rice, Corn)')}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#16a34a";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                  }}
                />
              </div>
              <div>
                <label htmlFor="harvestingDate" style={{
                  display: "block",
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 8
                }}>
                  {t('harvestingDate', 'Harvesting Date')}
                </label>
                <input
                  type="date"
                  id="harvestingDate"
                  value={harvestingDate}
                  onChange={(e) => setHarvestingDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 16,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#16a34a";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    padding: "12px 0",
                    border: "none",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px #bbf7d0",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {t('getPricePrediction')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    flex: 1,
                    background: "#f1f5f9",
                    color: "#16a34a",
                    fontWeight: 700,
                    fontSize: 16,
                    padding: "12px 0",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px #e0f2fe",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {t('reset')}
                </button>
              </div>
            </form>
          </section>
        </main>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button
                onClick={() => setShowAdminLoginModal(true)}
                style={{
                    background: 'transparent',
                    color: '#16a34a',
                    fontWeight: 600,
                    fontSize: 16,
                    padding: '10px 20px',
                    border: '1px solid #16a34a',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                Admin Login
            </button>
        </div>

        <footer style={{
            textAlign: 'center',
            padding: '40px 20px',
            marginTop: '40px',
            borderTop: '1px solid #e2e8f0'
        }}>
            <h2 style={{
                color: '#16a34a',
                fontWeight: 700,
                fontSize: 24,
                marginBottom: 24
            }}>
                Support
            </h2>
            <p style={{
                color: '#6B7280',
                fontSize: 16,
                lineHeight: 1.6,
                margin: '0 auto',
                maxWidth: '600px',
                marginBottom: 24
            }}>
                Have questions or need help? Our support team is here for you.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email Us</h3>
                    <a href="mailto:support@intellifarmsystems.com" style={{ color: '#16a34a', textDecoration: 'none' }}>support@intellifarmsystems.com</a>
                </div>
                <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Call Us</h3>
                    <p style={{ margin: 0, color: '#6B7280' }}>+91-123-456-7890</p>
                </div>
            </div>
        </footer>
      </div>

      {/* Admin Login Modal */}
      {showAdminLoginModal && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: 32,
                width: '100%',
                maxWidth: 400,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                position: 'relative'
            }}>
                <button
                    onClick={() => setShowAdminLoginModal(false)}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'none',
                        border: 'none',
                        fontSize: 24,
                        color: '#6B7280',
                        cursor: 'pointer',
                    }}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 style={{
                    color: '#16a34a',
                    fontWeight: 700,
                    fontSize: 24,
                    marginBottom: 24,
                    textAlign: 'center'
                }}>
                    Admin Login
                </h2>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            fontSize: 16,
                            boxSizing: 'border-box'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: 8,
                            fontSize: 16,
                            boxSizing: 'border-box'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 16,
                            padding: '12px 0',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer',
                            marginTop: 8
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Features Drawer/Modal */}
      {showFeatures && (
        <div
          style={{
            position: "fixed",
            top: 0, right: 0, bottom: 0,
            width: 420,
            background: "rgba(255, 255, 255, 0.98)",
            borderLeft: "1px solid rgba(34, 197, 94, 0.1)",
            boxShadow: "-4px 0 24px rgba(34, 197, 94, 0.1)",
            zIndex: 100,
            padding: 32,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ color: "#8B4513", fontWeight: 700, fontSize: 20, margin: 0 }}>{t('features')}</h2>
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
                borderRadius: 6
              }}
              aria-label="Close"
            >×</button>
          </div>
          <ul style={{ listStyle: "none", padding: "0 10px 0 0", margin: 0, display: "flex", flexDirection: "column", gap: 16, flex: 1, overflowY: 'auto' }}>
            {features.map((feature, idx) => (
              <li 
                key={idx} 
                onClick={() => {
                  if (feature.name === "Government Schemes") {
                    handleShowSchemes();
                  } else if (feature.name === "Irrigation Advice") {
                    handleShowIrrigation();
                  } else if (feature.name === "Crop Suggestions") {
                    handleShowCropSuggestions();
                  } else if (feature.name === "Equipment Guide") {
                    handleShowEquipment();
                  } else if (feature.name === "Cost Analysis") {
                    handleShowCostAnalysis();
                  } else if (feature.name === "Yield Prediction") {
                    handleShowYieldPrediction();
                  } else if (feature.name === "Weather Updates") {
                    handleShowWeatherUpdates();
                  } else if (feature.name === "Harvest Planning") {
                    handleShowHarvestPlanning();
                  } else if (feature.name === "Nearby Marketplace/Mandi") {
                    handleShowMarketplace();
                  }
                }}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "28px 0",
                  background: "rgba(139, 69, 19, 0.07)",
                  borderRadius: 16,
                  border: "1px solid rgba(139, 69, 19, 0.13)",
                  cursor: "pointer",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  justifyContent: 'center',
                }}>
                <span style={{ fontSize: 36, marginRight: 16 }}>{feature.icon}</span>
                <span style={{ fontWeight: 700, color: "#8B4513", fontSize: 20, letterSpacing: '-0.01em' }}>{t(feature.name.replace(/ /g, '').replace('/', ''), feature.name)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Government Schemes Modal */}
      {showSchemesModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            width: "90%",
            maxWidth: "1000px",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px",
              borderBottom: "1px solid #e2e8f0"
            }}>
              <h2 style={{ color: "#16a34a", fontWeight: 700, fontSize: 24, margin: 0 }}>🏛️ Government Schemes</h2>
              <button
                onClick={handleCloseSchemes}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 28,
                  color: "#8B4513",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8
                }}
                aria-label="Close"
              >×</button>
            </div>
            
            <div style={{
              padding: "24px",
              display: "flex",
              gap: "20px",
              borderBottom: "1px solid #e2e8f0"
            }}>
              <select 
                value={schemesCategory} 
                onChange={e => setSchemesCategory(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 16,
                }}
              >
                {schemeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input 
                type="text"
                placeholder="Search schemes..."
                value={schemesSearch}
                onChange={e => setSchemesSearch(e.target.value)}
                style={{
                  flex: 2,
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 16,
                }}
              />
            </div>

            <div style={{
              overflowY: "auto",
              padding: "24px",
              flex: 1
            }}>
              {filteredSchemes.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {filteredSchemes.map((scheme, idx) => (
                    <div key={idx} style={{
                      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                      borderRadius: 12,
                      border: "1px solid #bae6fd",
                      padding: 24,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                        <span style={{ fontSize: 32, marginRight: 12 }}>{scheme.icon}</span>
                        <div>
                          <h4 style={{
                            color: "#16a34a",
                            fontWeight: 700,
                            fontSize: 18,
                            margin: 0,
                            marginBottom: 4
                          }}>
                            {scheme.name}
                          </h4>
                          <span style={{
                            background: "#16a34a",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            {scheme.category}
                          </span>
                        </div>
                      </div>
                      
                      <p style={{
                        color: "#374151",
                        fontSize: 14,
                        lineHeight: 1.6,
                        marginBottom: 16
                      }}>
                        {scheme.description}
                      </p>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <strong style={{ color: "#16a34a", fontSize: 13 }}>Eligibility:</strong>
                          <p style={{ fontSize: 13, margin: "4px 0 0 0", color: "#6B7280" }}>{scheme.eligibility}</p>
                        </div>
                        <div>
                          <strong style={{ color: "#16a34a", fontSize: 13 }}>Benefits:</strong>
                          <p style={{ fontSize: 13, margin: "4px 0 0 0", color: "#6B7280" }}>{scheme.benefits}</p>
                        </div>
                        <div>
                          <strong style={{ color: "#16a34a", fontSize: 13 }}>Application:</strong>
                          <p style={{ fontSize: 13, margin: "4px 0 0 0", color: "#6B7280" }}>{scheme.applicationProcess}</p>
                        </div>
                        <div>
                          <strong style={{ color: "#16a34a", fontSize: 13 }}>Status:</strong>
                          <span style={{
                            background: "#dcfce7",
                            color: "#16a34a",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            {scheme.status}
                          </span>
                        </div>
                      </div>
                      
                      <a
                        href={scheme.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                          color: "#fff",
                          textDecoration: "none",
                          padding: "8px 16px",
                          borderRadius: 6,
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          transition: "all 0.2s ease"
                        }}
                      >
                        Visit Website →
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280", fontSize: 16 }}>
                  No schemes found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Irrigation Advice Modal */}
      <IrrigationAdviceModal 
        show={showIrrigationModal} 
        onClose={handleCloseIrrigation} 
        advice={irrigationAdvice} 
        categories={irrigationCategories} 
      />

      {/* Crop Suggestions Modal */}
      <CropSuggestionsModal 
        show={showCropSuggestionsModal} 
        onClose={handleCloseCropSuggestions} 
        crops={cropDatabase} 
        categories={cropCategories} 
      />

      {/* Equipment Guide Modal */}
      <EquipmentGuideModal
        show={showEquipmentModal}
        onClose={handleCloseEquipment}
        equipment={equipmentGuide}
        categories={equipmentCategories}
      />

      {/* Cost Analysis Modal */}
      <CostAnalysisModal
        show={showCostAnalysisModal}
        onClose={handleCloseCostAnalysis}
        crops={cropDatabase}
        categories={cropCategories}
      />

      {/* Yield Prediction Modal */}
      <YieldPredictionModal
        show={showYieldPredictionModal}
        onClose={handleCloseYieldPrediction}
        crops={cropDatabase}
        categories={cropCategories}
      />

      {/* Weather Updates Modal */}
      <WeatherUpdatesModal
        show={showWeatherUpdatesModal}
        onClose={handleCloseWeatherUpdates}
        crops={cropDatabase}
        categories={cropCategories}
      />

      {/* Harvest Planning Modal */}
      <HarvestPlanningModal
        show={showHarvestPlanningModal}
        onClose={handleCloseHarvestPlanning}
        crops={cropDatabase}
        categories={cropCategories}
      />

      {/* Nearby Marketplace Modal */}
      <NearbyMarketplaceModal
        show={showMarketplaceModal}
        onClose={handleCloseMarketplace}
      />

    </div>
  );
};

export default App;
