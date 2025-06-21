# 🌾 AI Farmer - Intelligent Farming Platform

A comprehensive web application that provides smart farming solutions, crop recommendations, government schemes, and real-time analytics for farmers.

## 🚀 Live Demo

- **Frontend**: https://arnavgarhwal.github.io/ai-farmer-/
- **Backend API**: https://ai-farmer-new.onrender.com

## ✨ Features

### 🌱 **For Farmers:**
- **Crop Suggestions** - Get personalized crop recommendations
- **Yield Prediction** - AI-powered yield forecasting
- **Irrigation Advice** - Smart irrigation recommendations
- **Equipment Guide** - Comprehensive farming equipment information
- **Cost Analysis** - Detailed cost breakdown for different crops
- **Government Schemes** - Complete database of agricultural schemes
- **Weather Updates** - Real-time weather information
- **Harvest Planning** - Optimal harvest timing recommendations
- **Marketplace** - Nearby mandi and market information

### 👨‍💼 **Admin Dashboard:**
- **Real-time Visitor Analytics** - Track website visitors
- **System Statistics** - Monitor application performance
- **User Management** - Manage farmer accounts
- **Content Management** - Update schemes and information

### 🎨 **UI/UX Features:**
- **🐒 Monkey Password Input** - Interactive password field with animated monkey
  - Eyes close when typing for privacy
  - Eyes open when password is shown
  - Smooth animations and hover effects
  - Makes password input more engaging and fun

## 🛠️ Technology Stack

### Frontend:
- **React 19** with TypeScript
- **Vite** for build tooling
- **React i18next** for internationalization
- **GitHub Pages** for hosting

### Backend:
- **Python Flask** API
- **File-based storage** (no database required)
- **CORS enabled** for cross-origin requests
- **Render** for hosting

## 📊 Real-time Analytics

The admin dashboard provides:
- **Today's Visitors** - Real-time daily visitor count
- **Weekly Analytics** - 7-day visitor trends
- **Monthly Statistics** - 30-day visitor data
- **Yearly Overview** - Annual visitor metrics
- **Total Visitors** - All-time visitor count

## 🔐 Admin Access

**Credentials:**
- Username: `arnavgarhwal`
- Password: `@Ag12345`

## 🚀 Deployment

### Frontend Deployment (GitHub Pages):
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch
4. Deploy using: `npm run deploy`

### Backend Deployment (Render):
1. Connect GitHub repository to Render
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `python app.py`
4. Set root directory to `backend`
5. Deploy automatically on push

## 📁 Project Structure

```
AIFarmerSoftware/
├── aifarmerUI/                 # Frontend React App
│   ├── src/
│   │   ├── App.tsx            # Main application
│   │   ├── AdminDashboard.tsx # Admin interface
│   │   ├── MonkeyPasswordInput.tsx # Interactive password input with monkey animation
│   │   ├── MonkeyPasswordDemo.tsx # Demo component for password input
│   │   ├── *.Modal.tsx        # Feature modals
│   │   └── i18n.ts           # Internationalization
│   ├── package.json
│   └── vite.config.ts
├── backend/                   # Python Flask API
│   ├── app.py                # Main Flask application
│   ├── requirements.txt      # Python dependencies
│   ├── Procfile             # Render deployment config
│   ├── data.json            # Application data
│   └── visitor_log.json     # Visitor analytics
└── README.md
```

## 🌐 API Endpoints

### Public Endpoints:
- `GET /` - Health check
- `POST /api/track-visit` - Track visitor
- `GET /api/visitor-stats` - Get visitor statistics
- `GET /api/schemes` - Government schemes
- `GET /api/crops` - Crop recommendations
- `GET /api/weather` - Weather data
- `GET /api/market-prices` - Market prices

### Admin Endpoints:
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Admin dashboard data

## 🔧 Local Development

### Prerequisites:
- Node.js 18+
- Python 3.8+
- Git

### Frontend Setup:
```bash
cd aifarmerUI
npm install
npm run dev
```

### Backend Setup:
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Access:
- Frontend: http://localhost:5173/ai-farmer-/
- Backend: http://localhost:5000

## 📈 Analytics & Monitoring

The application includes:
- **Real-time visitor tracking**
- **Admin dashboard analytics**
- **System performance monitoring**
- **Error logging and debugging**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Email**: support@intellifarmsystems.com
- **Phone**: +91-123-456-7890

## 🎯 Future Enhancements

- [ ] Mobile app development
- [ ] AI-powered disease detection
- [ ] Blockchain-based supply chain
- [ ] IoT sensor integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support expansion

---

**Built with ❤️ for Indian Farmers** 