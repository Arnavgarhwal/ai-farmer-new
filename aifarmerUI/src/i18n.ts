import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Select Your State': 'Select Your State',
      'Enter your district': 'Enter your district',
      'Crop Name': 'Crop Name',
      'Harvesting Date': 'Harvesting Date',
      'Get Market Analysis': 'Get Market Analysis',
      'Reset Form': 'Reset Form',
      'Language:': 'Language:',
      // Features
      'Crop Suggestions': 'Crop Suggestions',
      'Get AI-powered crop recommendations based on soil, climate, and market conditions': 'Get AI-powered crop recommendations based on soil, climate, and market conditions',
      'Yield Prediction': 'Yield Prediction',
      'Predict crop yields using advanced AI algorithms and historical data': 'Predict crop yields using advanced AI algorithms and historical data',
      'Irrigation Advice': 'Irrigation Advice',
      'Smart irrigation recommendations for optimal water usage and crop health': 'Smart irrigation recommendations for optimal water usage and crop health',
      'Equipment Guide': 'Equipment Guide',
      'Comprehensive guide to farming equipment, prices, and maintenance': 'Comprehensive guide to farming equipment, prices, and maintenance',
      'Cost Analysis': 'Cost Analysis',
      'Detailed cost breakdown and financial analysis for different crops': 'Detailed cost breakdown and financial analysis for different crops',
      'Fertilizer Details': 'Fertilizer Details',
      'Comprehensive information on fertilizers, usage, and best practices': 'Comprehensive information on fertilizers, usage, and best practices',
      'Government Schemes': 'Government Schemes',
      'Information about government subsidies and support programs': 'Information about government subsidies and support programs',
      'Harvest Planning': 'Harvest Planning',
      'Optimal harvest timing, storage, and post-harvest management strategies': 'Optimal harvest timing, storage, and post-harvest management strategies',
      'Weather Updates': 'Weather Updates',
      'Real-time weather data, forecasts, and farming-specific weather alerts': 'Real-time weather data, forecasts, and farming-specific weather alerts',
    }
  },
  hi: {
    translation: {
      'Select Your State': 'अपना राज्य चुनें',
      'Enter your district': 'अपना जिला दर्ज करें',
      'Crop Name': 'फसल का नाम',
      'Harvesting Date': 'कटाई की तिथि',
      'Get Market Analysis': 'बाजार विश्लेषण प्राप्त करें',
      'Reset Form': 'फॉर्म रीसेट करें',
      'Language:': 'भाषा:',
      // Features
      'Crop Suggestions': 'फसल सुझाव',
      'Get AI-powered crop recommendations based on soil, climate, and market conditions': 'मिट्टी, जलवायु और बाजार की स्थिति के आधार पर एआई-संचालित फसल सिफारिशें प्राप्त करें',
      'Yield Prediction': 'उपज पूर्वानुमान',
      'Predict crop yields using advanced AI algorithms and historical data': 'एआई और ऐतिहासिक डेटा से फसल की उपज का पूर्वानुमान लगाएं',
      'Irrigation Advice': 'सिंचाई सलाह',
      'Smart irrigation recommendations for optimal water usage and crop health': 'सर्वोत्तम जल उपयोग और फसल स्वास्थ्य के लिए स्मार्ट सिंचाई सलाह',
      'Equipment Guide': 'उपकरण गाइड',
      'Comprehensive guide to farming equipment, prices, and maintenance': 'कृषि उपकरण, कीमतें और रखरखाव के लिए व्यापक गाइड',
      'Cost Analysis': 'लागत विश्लेषण',
      'Detailed cost breakdown and financial analysis for different crops': 'विभिन्न फसलों के लिए लागत और वित्तीय विश्लेषण',
      'Fertilizer Details': 'उर्वरक विवरण',
      'Comprehensive information on fertilizers, usage, and best practices': 'उर्वरकों, उपयोग और सर्वोत्तम प्रथाओं की पूरी जानकारी',
      'Government Schemes': 'सरकारी योजनाएँ',
      'Information about government subsidies and support programs': 'सरकारी सब्सिडी और सहायता कार्यक्रमों की जानकारी',
      'Harvest Planning': 'कटाई योजना',
      'Optimal harvest timing, storage, and post-harvest management strategies': 'सर्वोत्तम कटाई समय, भंडारण और प्रबंधन रणनीतियाँ',
      'Weather Updates': 'मौसम अपडेट',
      'Real-time weather data, forecasts, and farming-specific weather alerts': 'रीयल-टाइम मौसम डेटा, पूर्वानुमान और कृषि अलर्ट',
    }
  },
  bn: {
    translation: {
      'Select Your State': 'আপনার রাজ্য নির্বাচন করুন',
      'Enter your district': 'আপনার জেলা লিখুন',
      'Crop Name': 'ফসলের নাম',
      'Harvesting Date': 'কাটার তারিখ',
      'Get Market Analysis': 'বাজার বিশ্লেষণ পান',
      'Reset Form': 'ফর্ম রিসেট করুন',
      'Language:': 'ভাষা:',
    }
  },
  ta: {
    translation: {
      'Select Your State': 'உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
      'Enter your district': 'உங்கள் மாவட்டத்தை உள்ளிடவும்',
      'Crop Name': 'பயிர் பெயர்',
      'Harvesting Date': 'விளை அறுவடை தேதி',
      'Get Market Analysis': 'சந்தை பகுப்பாய்வைப் பெறுங்கள்',
      'Reset Form': 'படிவத்தை மீட்டமை',
      'Language:': 'மொழி:',
    }
  },
  te: {
    translation: {
      'Select Your State': 'మీ రాష్ట్రాన్ని ఎంచుకోండి',
      'Enter your district': 'మీ జిల్లా నమోదు చేయండి',
      'Crop Name': 'పంట పేరు',
      'Harvesting Date': 'కత్తిరింపు తేదీ',
      'Get Market Analysis': 'మార్కెట్ విశ్లేషణ పొందండి',
      'Reset Form': 'ఫారమ్ రీసెట్ చేయండి',
      'Language:': 'భాష:',
    }
  },
  mr: {
    translation: {
      'Select Your State': 'आपले राज्य निवडा',
      'Enter your district': 'आपला जिल्हा प्रविष्ट करा',
      'Crop Name': 'पिकाचे नाव',
      'Harvesting Date': 'कापणीची तारीख',
      'Get Market Analysis': 'बाजार विश्लेषण मिळवा',
      'Reset Form': 'फॉर्म रीसेट करा',
      'Language:': 'भाषा:',
    }
  },
  gu: {
    translation: {
      'Select Your State': 'તમારું રાજ્ય પસંદ કરો',
      'Enter your district': 'તમારો જિલ્લો દાખલ કરો',
      'Crop Name': 'પાકનું નામ',
      'Harvesting Date': 'કાપણી તારીખ',
      'Get Market Analysis': 'બજાર વિશ્લેષણ મેળવો',
      'Reset Form': 'ફોર્મ રીસેટ કરો',
      'Language:': 'ભાષા:',
    }
  },
  ml: {
    translation: {
      'Select Your State': 'നിങ്ങളുടെ സംസ്ഥാനം തിരഞ്ഞെടുക്കുക',
      'Enter your district': 'നിങ്ങളുടെ ജില്ല നൽകുക',
      'Crop Name': 'വിളയുടെ പേര്',
      'Harvesting Date': 'വാരിക തീയതി',
      'Get Market Analysis': 'മാർക്കറ്റ് വിശകലനം നേടുക',
      'Reset Form': 'ഫോം റീസെറ്റ് ചെയ്യുക',
      'Language:': 'ഭാഷ:',
    }
  },
  kn: {
    translation: {
      'Select Your State': 'ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      'Enter your district': 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ನಮೂದಿಸಿ',
      'Crop Name': 'ಬೆಳೆ ಹೆಸರು',
      'Harvesting Date': 'ಕಟಾವು ದಿನಾಂಕ',
      'Get Market Analysis': 'ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ',
      'Reset Form': 'ಫಾರ್ಮ್ ರೀಸೆಟ್ ಮಾಡಿ',
      'Language:': 'ಭಾಷೆ:',
    }
  },
  or: {
    translation: {
      'Select Your State': 'ଆପଣଙ୍କର ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ',
      'Enter your district': 'ଆପଣଙ୍କର ଜିଲ୍ଲା ଦିଅନ୍ତୁ',
      'Crop Name': 'ଫସଲର ନାମ',
      'Harvesting Date': 'କଟାଇ ତାରିଖ',
      'Get Market Analysis': 'ବଜାର ବିଶ୍ଲେଷଣ ପାଆନ୍ତୁ',
      'Reset Form': 'ଫର୍ମ ରିସେଟ୍ କରନ୍ତୁ',
      'Language:': 'ଭାଷା:',
    }
  },
  pa: {
    translation: {
      'Select Your State': 'ਆਪਣਾ ਰਾਜ ਚੁਣੋ',
      'Enter your district': 'ਆਪਣਾ ਜ਼ਿਲ੍ਹਾ ਦਰਜ ਕਰੋ',
      'Crop Name': 'ਫਸਲ ਦਾ ਨਾਮ',
      'Harvesting Date': 'ਕਟਾਈ ਦੀ ਤਾਰੀਖ',
      'Get Market Analysis': 'ਬਾਜ਼ਾਰ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ',
      'Reset Form': 'ਫਾਰਮ ਰੀਸੈਟ ਕਰੋ',
      'Language:': 'ਭਾਸ਼ਾ:',
    }
  },
  as: {
    translation: {
      'Select Your State': 'আপোনাৰ ৰাজ্য বাছনি কৰক',
      'Enter your district': 'আপোনাৰ জিলা লিখক',
      'Crop Name': 'শস্যৰ নাম',
      'Harvesting Date': 'কটা তাৰিখ',
      'Get Market Analysis': 'বজাৰ বিশ্লেষণ পাওক',
      'Reset Form': 'ফৰ্ম ৰিছেট কৰক',
      'Language:': 'ভাষা:',
    }
  },
  ur: {
    translation: {
      'Select Your State': 'اپنی ریاست منتخب کریں',
      'Enter your district': 'اپنا ضلع درج کریں',
      'Crop Name': 'فصل کا نام',
      'Harvesting Date': 'کٹائی کی تاریخ',
      'Get Market Analysis': 'مارکیٹ تجزیہ حاصل کریں',
      'Reset Form': 'فارم ری سیٹ کریں',
      'Language:': 'زبان:',
    }
  },
  ne: {
    translation: {
      'Select Your State': 'आफ्नो राज्य छान्नुहोस्',
      'Enter your district': 'आफ्नो जिल्ला लेख्नुहोस्',
      'Crop Name': 'बालीको नाम',
      'Harvesting Date': 'कटनी मिति',
      'Get Market Analysis': 'बजार विश्लेषण प्राप्त गर्नुहोस्',
      'Reset Form': 'फारम रिसेट गर्नुहोस्',
      'Language:': 'भाषा:',
    }
  },
  ks: {
    translation: {
      'Select Your State': 'اپنۍ ریاست چھنو',
      'Enter your district': 'اپنۍ ضلع لکھو',
      'Crop Name': 'فصل ناو',
      'Harvesting Date': 'کٹائی تاریخ',
      'Get Market Analysis': 'مارکیٹ تجزیہ حاصل کرو',
      'Reset Form': 'فارم ری سیٹ کرو',
      'Language:': 'زبان:',
    }
  },
  kok: {
    translation: {
      'Select Your State': 'तुमचो राज्य निवडात',
      'Enter your district': 'तुमचो तालुका दयात',
      'Crop Name': 'पिकाचो नाव',
      'Harvesting Date': 'कापणी तारीक',
      'Get Market Analysis': 'बाजार विश्लेषण मेळयात',
      'Reset Form': 'फॉर्म रीसेट करात',
      'Language:': 'भाषा:',
    }
  },
  sd: {
    translation: {
      'Select Your State': 'پنهنجي رياست چونڊيو',
      'Enter your district': 'پنهنجو ضلعو داخل ڪريو',
      'Crop Name': 'فصل جو نالو',
      'Harvesting Date': 'ڪٽائي جي تاريخ',
      'Get Market Analysis': 'مارڪيٽ تجزيو حاصل ڪريو',
      'Reset Form': 'فارم ري سيٽ ڪريو',
      'Language:': 'ٻولي:',
    }
  },
  doi: {
    translation: {
      'Select Your State': 'अपना राज्य चुनो',
      'Enter your district': 'अपना जिला लिखो',
      'Crop Name': 'फसल दा नां',
      'Harvesting Date': 'कटाई दी तारीख',
      'Get Market Analysis': 'बाजार विश्लेषण प्राप्त करो',
      'Reset Form': 'फार्म रीसेट करो',
      'Language:': 'भाषा:',
    }
  },
  mni: {
    translation: {
      'Select Your State': 'ꯑꯃꯅꯤ ꯑꯃꯥ ꯑꯃꯁꯤꯡ ꯑꯃꯅꯤꯗꯤ ꯑꯃꯁꯤꯡ ꯑꯃꯅꯤꯗꯤ',
      'Enter your district': 'ꯑꯃꯅꯤ ꯑꯃꯥ ꯑꯃꯁꯤꯡ ꯑꯃꯅꯤꯗꯤ',
      'Crop Name': 'ꯀꯣꯞꯄ ꯅꯥꯝ',
      'Harvesting Date': 'ꯍꯥꯔꯚꯁꯤꯡ ꯗꯦꯠ',
      'Get Market Analysis': 'ꯃꯥꯔꯀꯦꯠ ꯑꯦꯅꯦꯜꯤꯁꯤꯡ ꯑꯃꯅꯤꯗꯤ',
      'Reset Form': 'ꯐꯣꯝ ꯔꯤꯁꯦꯠ ꯑꯃꯅꯤꯗꯤ',
      'Language:': 'ꯂꯦꯡꯒꯁꯤ:',
    }
  },
  brx: {
    translation: {
      'Select Your State': 'निजार राज्य सायखौ',
      'Enter your district': 'निजार जिल्हा दिहौ',
      'Crop Name': 'फसलाय मोन',
      'Harvesting Date': 'कटायनि दिन',
      'Get Market Analysis': 'बजार विश्लेषण लाबो',
      'Reset Form': 'फार्म रीसेट खालाम',
      'Language:': 'बर',
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 