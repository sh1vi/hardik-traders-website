import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || '';
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : '';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_ENABLED = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

const translations = {
  en: {
    companyName: 'Hardik Traders',
    brandSubtitle: 'Rice • Pulses • Paddy • Bulk Supply',
    tagline: 'Bulk Rice, Pulses & Paddy Supply You Can Trust',
    heroDescription:
      'We deal in a wide variety of rice, pulses, and paddy, purchased and sold in bulk. We also deliver to different cities based on customer demand with reliable service and quality-focused sourcing.',
    aboutTitle: 'About Hardik Traders',
    aboutDescription:
      'Hardik Traders is a trusted bulk trading business offering quality rice, pulses, and paddy for wholesalers, retailers, food businesses, and institutional buyers. We focus on consistency, competitive pricing, timely deliveries, and long-term customer relationships.',
    whyChooseUs: [
      'Wide variety of rice, pulses, and paddy',
      'Bulk purchase and supply support',
      'City-to-city delivery based on demand',
      'Quality-focused sourcing and handling',
      'Transparent communication and dependable service',
    ],
    ctaText: 'Get Bulk Quotes',
    contactPhone: '+91 98765 43210',
    whatsappNumber: '919876543210',
    contactEmail: 'sales@hardiktraders.com',
    location: 'India',
    deliveryText: 'Deliveries available across different cities based on order demand.',
    footerNote: 'Reliable bulk grain trading for retailers, wholesalers, and food businesses.',
    navHome: 'Home',
    navAbout: 'About',
    navProducts: 'Products',
    navContact: 'Contact',
    trustedTrader: 'Trusted Bulk Trader',
    exploreProducts: 'Explore Products',
    contactUs: 'Contact Us',
    whatsappUs: 'WhatsApp Us',
    variety: 'Variety',
    varietyDesc: 'Rice, pulses & paddy',
    bulkOrders: 'Bulk Orders',
    bulkOrdersDesc: 'Wholesale focused',
    delivery: 'Delivery',
    deliveryDesc: 'Across cities on demand',
    fastSummary: 'Fast summary',
    fastSummaryText: 'Reliable supply for traders, retailers, and food businesses.',
    aboutUsLabel: 'About Us',
    whyChooseTitle: 'Why choose us?',
    ourProducts: 'Our Products',
    productsTitle: 'Sample bulk trading products',
    productsDescription:
      'Explore sample products below. Each item is clickable and redirects to a dedicated product details page using hash routing.',
    searchPlaceholder: 'Search rice, pulses, paddy...',
    noProducts: 'No products found. Try another search term.',
    contactLabel: 'Contact',
    contactTitle: 'Need a bulk quote or product information?',
    contactDescription:
      'Reach out for pricing, availability, delivery support, and custom demand-based orders across cities.',
    requestQuote: 'Request Quote',
    callNow: 'Call Now',
    phone: 'Phone',
    email: 'Email',
    locationLabel: 'Location',
    editTip: 'Update translations in src/App.jsx and set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env to enable the live contact form email flow.',
    backToProducts: '← Back to Products',
    origin: 'Origin',
    packaging: 'Packaging',
    availability: 'Availability',
    requestBulkQuote: 'Request Bulk Quote',
    viewDetails: 'View Details',
    enquire: 'Enquire',
    footerRights: 'All rights reserved.',
    languageLabel: 'Language',
    imageCreditLabel: 'Image source',
    formTitle: 'Send us a message',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formCity: 'City',
    formProduct: 'Product of interest',
    formMessage: 'Message',
    formSubmit: 'Send Enquiry',
    formSending: 'Sending...',
    formSuccess: 'Thanks! Your enquiry has been sent successfully.',
    formError: 'Something went wrong while sending the form. Please try again.',
    formNotConfigured: 'Form email integration is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env to enable live submissions.',
    formRequired: 'Please fill in your name, email, and message.',
    formEmailInvalid: 'Please enter a valid email address.',
    formMobile: 'Mobile Number',
    formMobileInvalid: 'Please enter a valid mobile number.',
    selectProduct: 'Select a product',
    whatsappMessage: 'Hello Hardik Traders, I would like to enquire about bulk supply.',
    whatsappProductMessage: 'Hello Hardik Traders, I am interested in bulk supply for',
    imageFooterText: 'Real product image',
    imageCredits: [
      'Premium Basmati Rice image: Raw Basmati Rice.jpg (Wikimedia Commons)',
      'Sona Masoori Rice image: Basmati rice from India.jpg (Wikimedia Commons)',
      'Pulse images: 3 types of lentil.png (Wikimedia Commons)',
      'Raw Paddy image: Rice Field.jpg (Wikimedia Commons)',
    ],
    products: [
      {
        id: 1,
        name: 'Premium Basmati Rice',
        category: 'Rice',
        shortDescription: 'Long-grain aromatic rice ideal for premium retail and hospitality supply.',
        description:
          'Our Premium Basmati Rice is known for its aroma, long grain size, and excellent cooking quality. It is a preferred choice for hotels, caterers, wholesalers, and traders looking for consistency and premium appearance.',
        origin: 'North India',
        packaging: '25kg / 50kg bags',
        availability: 'Bulk orders available',
        cityDelivery: 'Available on demand',
        color: '#8b5cf6',
        badge: 'Top Seller',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raw%20Basmati%20Rice.jpg',
      },
      {
        id: 2,
        name: 'Sona Masoori Rice',
        category: 'Rice',
        shortDescription: 'Lightweight, medium-grain rice suitable for daily use and bulk grocery distribution.',
        description:
          'Sona Masoori Rice is a widely preferred everyday rice variety with soft texture and balanced taste. Suitable for retailers, local distributors, mess facilities, and family consumption in bulk quantities.',
        origin: 'South India',
        packaging: '25kg / 50kg bags',
        availability: 'Bulk orders available',
        cityDelivery: 'Available on demand',
        color: '#10b981',
        badge: 'Popular Choice',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Basmati%20rice%20from%20India.jpg',
      },
      {
        id: 3,
        name: 'Toor Dal',
        category: 'Pulses',
        shortDescription: 'High-quality split pigeon peas supplied for wholesale, kitchens, and retailers.',
        description:
          'Toor Dal is sourced with quality checks to ensure clean grains, uniform size, and dependable stock availability. Ideal for wholesale dealers, food service businesses, and daily market supply.',
        origin: 'Central India',
        packaging: '30kg / 50kg bags',
        availability: 'Bulk orders available',
        cityDelivery: 'Available on demand',
        color: '#f59e0b',
        badge: 'High Demand',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/3%20types%20of%20lentil.png',
      },
      {
        id: 4,
        name: 'Moong Dal',
        category: 'Pulses',
        shortDescription: 'Clean and nutritious pulse variety with excellent demand across retail and food service.',
        description:
          'Moong Dal is appreciated for its freshness, taste, and versatility. We supply quality stock for stores, catering units, and wholesalers requiring dependable pulse inventory in larger quantities.',
        origin: 'Western India',
        packaging: '30kg / 50kg bags',
        availability: 'Bulk orders available',
        cityDelivery: 'Available on demand',
        color: '#16a34a',
        badge: 'Best Quality',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/3%20types%20of%20lentil.png',
      },
      {
        id: 5,
        name: 'Raw Paddy',
        category: 'Paddy',
        shortDescription: 'Procurement and bulk supply of raw paddy for traders and processing units.',
        description:
          'We deal in raw paddy for buyers who need dependable procurement support for milling, storage, or onward trading. Supply can be arranged based on season, volume, and delivery requirement.',
        origin: 'Multiple sourcing regions',
        packaging: 'Loose / bulk lot',
        availability: 'Seasonal and bulk based',
        cityDelivery: 'Available on demand',
        color: '#f97316',
        badge: 'Trade Supply',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rice%20Field.jpg',
      },
      {
        id: 6,
        name: 'Chana Dal',
        category: 'Pulses',
        shortDescription: 'Bulk stock of chana dal for retail chains, wholesalers, and food businesses.',
        description:
          'Chana Dal is supplied in bulk with focus on quality, cleanliness, and consistency in every lot. Well-suited for wholesale supply, grocery channels, and commercial kitchens.',
        origin: 'India',
        packaging: '30kg / 50kg bags',
        availability: 'Bulk orders available',
        cityDelivery: 'Available on demand',
        color: '#ef4444',
        badge: 'Steady Supply',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/3%20types%20of%20lentil.png',
      },
    ],
  },
  hi: {
    companyName: 'हार्दिक ट्रेडर्स',
    brandSubtitle: 'चावल • दालें • धान • थोक आपूर्ति',
    tagline: 'भरोसेमंद थोक चावल, दालें और धान की आपूर्ति',
    heroDescription:
      'हम विभिन्न प्रकार के चावल, दालें और धान की थोक खरीद और बिक्री करते हैं। ग्राहकों की मांग के अनुसार अलग-अलग शहरों में विश्वसनीय डिलीवरी भी उपलब्ध कराते हैं।',
    aboutTitle: 'हार्दिक ट्रेडर्स के बारे में',
    aboutDescription:
      'हार्दिक ट्रेडर्स एक विश्वसनीय थोक व्यापार व्यवसाय है, जो थोक विक्रेताओं, खुदरा विक्रेताओं, फूड बिज़नेस और संस्थागत खरीदारों के लिए गुणवत्तापूर्ण चावल, दालें और धान उपलब्ध कराता है। हमारा ध्यान स्थिर गुणवत्ता, प्रतिस्पर्धी कीमत, समय पर डिलीवरी और लंबे समय के संबंधों पर है।',
    whyChooseUs: [
      'चावल, दालें और धान की विस्तृत रेंज',
      'थोक खरीद और आपूर्ति में सहायता',
      'मांग के अनुसार शहर-से-शहर डिलीवरी',
      'गुणवत्ता पर केंद्रित सोर्सिंग और हैंडलिंग',
      'पारदर्शी संवाद और भरोसेमंद सेवा',
    ],
    ctaText: 'थोक कोटेशन प्राप्त करें',
    contactPhone: '+91 98765 43210',
    whatsappNumber: '919876543210',
    contactEmail: 'sales@hardiktraders.com',
    location: 'भारत',
    deliveryText: 'ऑर्डर की मांग के अनुसार विभिन्न शहरों में डिलीवरी उपलब्ध है।',
    footerNote: 'रिटेलर, होलसेलर और फूड बिज़नेस के लिए विश्वसनीय थोक अनाज व्यापार।',
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navProducts: 'उत्पाद',
    navContact: 'संपर्क',
    trustedTrader: 'विश्वसनीय थोक व्यापारी',
    exploreProducts: 'उत्पाद देखें',
    contactUs: 'संपर्क करें',
    whatsappUs: 'व्हाट्सऐप करें',
    variety: 'विविधता',
    varietyDesc: 'चावल, दालें और धान',
    bulkOrders: 'थोक ऑर्डर',
    bulkOrdersDesc: 'होलसेल सप्लाई केंद्रित',
    delivery: 'डिलीवरी',
    deliveryDesc: 'मांग पर विभिन्न शहरों में',
    fastSummary: 'त्वरित सारांश',
    fastSummaryText: 'व्यापारियों, रिटेलर और फूड बिज़नेस के लिए विश्वसनीय आपूर्ति।',
    aboutUsLabel: 'हमारे बारे में',
    whyChooseTitle: 'हमें क्यों चुनें?',
    ourProducts: 'हमारे उत्पाद',
    productsTitle: 'थोक व्यापार के नमूना उत्पाद',
    productsDescription:
      'नीचे दिए गए नमूना उत्पाद देखें। प्रत्येक आइटम क्लिक करने योग्य है और हैश रूटिंग के माध्यम से समर्पित उत्पाद विवरण पेज पर ले जाता है।',
    searchPlaceholder: 'चावल, दालें, धान खोजें...',
    noProducts: 'कोई उत्पाद नहीं मिला। कोई दूसरा शब्द आज़माएँ।',
    contactLabel: 'संपर्क',
    contactTitle: 'थोक कोटेशन या उत्पाद जानकारी चाहिए?',
    contactDescription:
      'कीमत, उपलब्धता, डिलीवरी सहायता और मांग-आधारित कस्टम ऑर्डर के लिए हमसे संपर्क करें।',
    requestQuote: 'कोटेशन मांगें',
    callNow: 'अभी कॉल करें',
    phone: 'फोन',
    email: 'ईमेल',
    locationLabel: 'स्थान',
    editTip: 'लाइव ईमेल फॉर्म सक्षम करने के लिए .env में VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID और VITE_EMAILJS_PUBLIC_KEY सेट करें और src/App.jsx में ट्रांसलेशन अपडेट करें।',
    backToProducts: '← उत्पादों पर वापस जाएँ',
    origin: 'उत्पत्ति',
    packaging: 'पैकेजिंग',
    availability: 'उपलब्धता',
    requestBulkQuote: 'थोक कोटेशन मांगें',
    viewDetails: 'विवरण देखें',
    enquire: 'पूछताछ करें',
    footerRights: 'सर्वाधिकार सुरक्षित।',
    languageLabel: 'भाषा',
    imageCreditLabel: 'इमेज स्रोत',
    formTitle: 'हमें संदेश भेजें',
    formName: 'पूरा नाम',
    formEmail: 'ईमेल पता',
    formCity: 'शहर',
    formProduct: 'रुचि का उत्पाद',
    formMessage: 'संदेश',
    formSubmit: 'पूछताछ भेजें',
    formSending: 'भेजा जा रहा है...',
    formSuccess: 'धन्यवाद! आपकी पूछताछ सफलतापूर्वक भेज दी गई है।',
    formError: 'फॉर्म भेजते समय कुछ गड़बड़ी हुई। कृपया फिर से प्रयास करें।',
    formNotConfigured: 'ईमेल फॉर्म इंटीग्रेशन अभी कॉन्फ़िगर नहीं है। लाइव सबमिशन सक्षम करने के लिए .env में VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID और VITE_EMAILJS_PUBLIC_KEY जोड़ें।',
    formRequired: 'कृपया अपना नाम, ईमेल और संदेश भरें।',
    formEmailInvalid: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
    formMobile: 'मोबाइल नंबर',
    formMobileInvalid: 'कृपया एक मान्य मोबाइल नंबर दर्ज करें।',
    selectProduct: 'उत्पाद चुनें',
    whatsappMessage: 'नमस्ते हार्दिक ट्रेडर्स, मुझे थोक आपूर्ति के बारे में जानकारी चाहिए।',
    whatsappProductMessage: 'नमस्ते हार्दिक ट्रेडर्स, मुझे इस उत्पाद की थोक आपूर्ति में रुचि है:',
    imageFooterText: 'वास्तविक उत्पाद छवि',
    imageCredits: [
      'प्रीमियम बासमती चावल इमेज: Raw Basmati Rice.jpg (Wikimedia Commons)',
      'सोना मसूरी चावल इमेज: Basmati rice from India.jpg (Wikimedia Commons)',
      'दाल इमेज: 3 types of lentil.png (Wikimedia Commons)',
      'कच्चा धान इमेज: Rice Field.jpg (Wikimedia Commons)',
    ],
    products: [
      {
        id: 1,
        name: 'प्रीमियम बासमती चावल',
        category: 'चावल',
        shortDescription: 'लंबे दाने वाला सुगंधित चावल, प्रीमियम रिटेल और हॉस्पिटैलिटी सप्लाई के लिए उपयुक्त।',
        description:
          'हमारा प्रीमियम बासमती चावल अपनी सुगंध, लंबे दाने और बेहतरीन पकने की गुणवत्ता के लिए जाना जाता है। यह होटल, कैटरर, होलसेलर और ट्रेडर के लिए एक पसंदीदा विकल्प है।',
        origin: 'उत्तर भारत',
        packaging: '25 किग्रा / 50 किग्रा बैग',
        availability: 'थोक ऑर्डर उपलब्ध',
        cityDelivery: 'मांग पर उपलब्ध',
        color: '#8b5cf6',
        badge: 'सबसे अधिक बिकने वाला',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raw%20Basmati%20Rice.jpg',
      },
      {
        id: 2,
        name: 'सोना मसूरी चावल',
        category: 'चावल',
        shortDescription: 'हल्का, मध्यम दाने वाला चावल, दैनिक उपयोग और थोक किराना वितरण के लिए उपयुक्त।',
        description:
          'सोना मसूरी चावल रोजमर्रा के उपयोग के लिए लोकप्रिय है। इसका स्वाद संतुलित और बनावट नरम होती है, जो रिटेलर, स्थानीय वितरक और परिवारों की थोक जरूरतों के लिए उपयुक्त है।',
        origin: 'दक्षिण भारत',
        packaging: '25 किग्रा / 50 किग्रा बैग',
        availability: 'थोक ऑर्डर उपलब्ध',
        cityDelivery: 'मांग पर उपलब्ध',
        color: '#10b981',
        badge: 'लोकप्रिय विकल्प',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Basmati%20rice%20from%20India.jpg',
      },
      {
        id: 3,
        name: 'तूर दाल',
        category: 'दालें',
        shortDescription: 'उच्च गुणवत्ता वाली अरहर दाल, होलसेल, रसोई और रिटेल के लिए उपयुक्त।',
        description:
          'तूर दाल गुणवत्ता जांच के साथ उपलब्ध कराई जाती है, जिससे साफ दाने, समान आकार और भरोसेमंद स्टॉक सुनिश्चित होता है। यह होलसेल डीलर और फूड सर्विस बिज़नेस के लिए आदर्श है।',
        origin: 'मध्य भारत',
        packaging: '30 किग्रा / 50 किग्रा बैग',
        availability: 'थोक ऑर्डर उपलब्ध',
        cityDelivery: 'मांग पर उपलब्ध',
        color: '#f59e0b',
        badge: 'उच्च मांग',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/3%20types%20of%20lentil.png',
      },
      {
        id: 4,
        name: 'मूंग दाल',
        category: 'दालें',
        shortDescription: 'साफ और पौष्टिक दाल, रिटेल और फूड सर्विस में अच्छी मांग के साथ।',
        description:
          'मूंग दाल अपनी ताजगी, स्वाद और उपयोगिता के लिए जानी जाती है। हम स्टोर, कैटरिंग यूनिट और होलसेलर के लिए बड़े पैमाने पर गुणवत्तापूर्ण स्टॉक उपलब्ध कराते हैं।',
        origin: 'पश्चिम भारत',
        packaging: '30 किग्रा / 50 किग्रा बैग',
        availability: 'थोक ऑर्डर उपलब्ध',
        cityDelivery: 'मांग पर उपलब्ध',
        color: '#16a34a',
        badge: 'उत्तम गुणवत्ता',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/3%20types%20of%20lentil.png',
      },
      {
        id: 5,
        name: 'कच्चा धान',
        category: 'धान',
        shortDescription: 'ट्रेडर और प्रोसेसिंग यूनिट के लिए कच्चे धान की खरीद और थोक आपूर्ति।',
        description:
          'हम कच्चे धान में व्यापार करते हैं, जो मिलिंग, स्टोरेज या आगे की ट्रेडिंग के लिए भरोसेमंद खरीद सहायता चाहता है। आपूर्ति मौसम, मात्रा और डिलीवरी आवश्यकताओं के अनुसार की जा सकती है।',
        origin: 'विभिन्न सोर्सिंग क्षेत्र',
        packaging: 'लूज / थोक लॉट',
        availability: 'मौसमी और थोक आधारित',
        cityDelivery: 'मांग पर उपलब्ध',
        color: '#f97316',
        badge: 'व्यापार आपूर्ति',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rice%20Field.jpg',
      },
      {
        id: 6,
        name: 'चना दाल',
        category: 'दालें',
        shortDescription: 'रिटेल चेन, होलसेलर और फूड बिज़नेस के लिए चना दाल का थोक स्टॉक।',
        description:
          'चना दाल की आपूर्ति प्रत्येक लॉट में गुणवत्ता, सफाई और स्थिरता पर ध्यान रखते हुए की जाती है। यह होलसेल सप्लाई, किराना चैनल और कमर्शियल किचन के लिए उपयुक्त है।',
        origin: 'भारत',
        packaging: '30 किग्रा / 50 किग्रा बैग',
        availability: 'थोक ऑर्डर उपलब्ध',
        cityDelivery: 'मांग पर उपलब्ध',
        color: '#ef4444',
        badge: 'निरंतर आपूर्ति',
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/3%20types%20of%20lentil.png',
      },
    ],
  },
};

function getCurrentView() {
  const hash = window.location.hash || '#/';
  const productMatch = hash.match(/^#\/product\/(\d+)$/);
  if (productMatch) return { type: 'product', id: Number(productMatch[1]) };
  return { type: 'home' };
}

function navigateTo(hash) {
  window.location.hash = hash;
}

function getInitialLanguage() {
  const saved = window.localStorage.getItem('hardik-traders-lang');
  if (saved === 'en' || saved === 'hi') return saved;
  const browserLang = (navigator.language || '').toLowerCase();
  return browserLang.startsWith('hi') ? 'hi' : 'en';
}

function createWhatsAppLink(number, message) {
  const digits = (number || '').replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function Header({ t, lang, onChangeLanguage }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#/">
          <span className="brand-title">{t.companyName}</span>
          <span className="brand-subtitle">{t.brandSubtitle}</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">{t.navHome}</a>
          <a href="#about">{t.navAbout}</a>
          <a href="#products">{t.navProducts}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label={t.languageLabel}>
            <button type="button" className={lang === 'en' ? 'lang-btn active' : 'lang-btn'} onClick={() => onChangeLanguage('en')}>EN</button>
            <button type="button" className={lang === 'hi' ? 'lang-btn active' : 'lang-btn'} onClick={() => onChangeLanguage('hi')}>हिंदी</button>
          </div>
          <a className="button button-primary header-cta" href="#contact">{t.ctaText}</a>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const whatsappUrl = createWhatsAppLink(t.whatsappNumber, t.whatsappMessage);
  return (
    <section id="home" className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy fade-up">
          <span className="pill">{t.trustedTrader}</span>
          <h1>{t.tagline}</h1>
          <p>{t.heroDescription}</p>
          <div className="action-row">
            <a className="button button-primary" href="#products">{t.exploreProducts}</a>
            <a className="button button-secondary" href="#contact">{t.contactUs}</a>
            <a className="button button-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">{t.whatsappUs}</a>
          </div>
          <div className="stats-grid">
            <div className="info-card">
              <div className="info-icon">🌾</div>
              <div>
                <strong>{t.variety}</strong>
                <span>{t.varietyDesc}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📦</div>
              <div>
                <strong>{t.bulkOrders}</strong>
                <span>{t.bulkOrdersDesc}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">🚚</div>
              <div>
                <strong>{t.delivery}</strong>
                <span>{t.deliveryDesc}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-visual fade-up delay-1">
          <div className="hero-image-card real-photo-wrap">
            <img src={t.products[0].image} alt={t.products[0].name} />
          </div>
          <div className="floating-note">
            <small>{t.fastSummary}</small>
            <strong>{t.fastSummaryText}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" className="section">
      <div className="container two-column">
        <div className="fade-up">
          <span className="section-label green">{t.aboutUsLabel}</span>
          <h2>{t.aboutTitle}</h2>
          <p className="section-text">{t.aboutDescription}</p>
          <p className="section-text">{t.deliveryText}</p>
        </div>
        <div className="feature-box fade-up delay-1">
          <h3>{t.whyChooseTitle}</h3>
          <div className="feature-list">
            {t.whyChooseUs.map((item) => (
              <div className="feature-item" key={item}>
                <span className="dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, t }) {
  return (
    <article className="product-card fade-up">
      <button type="button" className="image-button" onClick={() => navigateTo(`#/product/${product.id}`)} aria-label={`${t.viewDetails}: ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </button>
      <div className="product-body">
        <div className="product-meta">
          <span className="tag dark">{product.category}</span>
          <span className="tag light">{product.badge}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="action-row compact">
          <button type="button" className="button button-primary" onClick={() => navigateTo(`#/product/${product.id}`)}>{t.viewDetails}</button>
          <a className="button button-secondary" href={createWhatsAppLink(t.whatsappNumber, `${t.whatsappProductMessage} ${product.name}`)} target="_blank" rel="noreferrer">{t.enquire}</a>
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ t }) {
  const [search, setSearch] = useState('');
  const filteredProducts = t.products.filter((product) => {
    const q = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <section id="products" className="section products-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label amber">{t.ourProducts}</span>
            <h2>{t.productsTitle}</h2>
            <p className="section-text narrow">{t.productsDescription}</p>
          </div>
          <label className="search-wrap" aria-label={t.searchPlaceholder}>
            <span>🔎</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder={t.searchPlaceholder}
            />
          </label>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} t={t} />
          ))}
        </div>
        {!filteredProducts.length && <div className="empty-state">{t.noProducts}</div>}
      </div>
    </section>
  );
}

function Contact({ t }) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', city: '', product: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const whatsappUrl = createWhatsAppLink(t.whatsappNumber, t.whatsappMessage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: t.formRequired });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!validEmail) {
      setStatus({ type: 'error', message: t.formEmailInvalid });
      return;
    }

    const digitsOnlyPhone = formData.mobile.replace(/\D/g, '');
    if (digitsOnlyPhone.length < 7 || digitsOnlyPhone.length > 15) {
      setStatus({ type: 'error', message: t.formMobileInvalid });
      return;
    }

    if (!EMAILJS_ENABLED) {
      setStatus({ type: 'error', message: t.formNotConfigured });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);

      setFormData({ name: '', email: '', mobile: '', city: '', product: '', message: '' });
      setStatus({ type: 'success', message: t.formSuccess });
      if (formRef.current) formRef.current.reset();
    } catch (error) {
      setStatus({ type: 'error', message: t.formError });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-box enhanced-contact-box">
          <div>
            <span className="section-label mint">{t.contactLabel}</span>
            <h2>{t.contactTitle}</h2>
            <p className="section-text light-text narrow">{t.contactDescription}</p>
            <div className="action-row">
              <a className="button button-primary" href={`mailto:${t.contactEmail}`}>{t.requestQuote}</a>
              <a className="button button-secondary light" href={`tel:${t.contactPhone.replace(/\s+/g, '')}`}>{t.callNow}</a>
              <a className="button button-whatsapp-outline" href={whatsappUrl} target="_blank" rel="noreferrer">{t.whatsappUs}</a>
            </div>

            <div className="contact-list top-gap">
              <div className="contact-item">
                <strong>{t.phone}</strong>
                <a href={`tel:${t.contactPhone.replace(/\s+/g, '')}`}>{t.contactPhone}</a>
              </div>
              <div className="contact-item">
                <strong>{t.email}</strong>
                <a href={`mailto:${t.contactEmail}`}>{t.contactEmail}</a>
              </div>
              <div className="contact-item">
                <strong>{t.locationLabel}</strong>
                <span>{t.location}</span>
              </div>
              <div className="contact-item small">{t.editTip}</div>
            </div>
          </div>

          <div className="form-panel">
            <h3>{t.formTitle}</h3>
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label>
                  <span>{t.formName}</span>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.formName} />
                </label>
                <label>
                  <span>{t.formEmail}</span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.formEmail} />
                </label>
                <label>
                  <span>{t.formMobile}</span>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder={t.formMobile} />
                </label>
                <label>
                  <span>{t.formCity}</span>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder={t.formCity} />
                </label>
                <label>
                  <span>{t.formProduct}</span>
                  <select name="product" value={formData.product} onChange={handleChange}>
                    <option value="">{t.selectProduct}</option>
                    {t.products.map((product) => (
                      <option key={product.id} value={product.name}>{product.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>{t.formMessage}</span>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder={t.formMessage} />
              </label>

              {status.message ? <div className={status.type === 'success' ? 'form-status success' : 'form-status error'}>{status.message}</div> : null}

              <button type="submit" className="button button-primary submit-button" disabled={isSubmitting}>
                {isSubmitting ? t.formSending : t.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-inner footer-stack">
        <div className="footer-top-line">
          <span>© 2026 {t.companyName}. {t.footerRights}</span>
          <span>{t.footerNote}</span>
        </div>
        <div className="image-credits">
          <strong>{t.imageCreditLabel}:</strong>
          <ul>
            {t.imageCredits.map((credit) => (
              <li key={credit}>{credit}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ProductDetails({ product, t, onChangeLanguage, lang }) {
  return (
    <div className="details-page">
      <Header t={t} lang={lang} onChangeLanguage={onChangeLanguage} />
      <main className="section">
        <div className="container details-grid">
          <div className="fade-up">
            <img className="details-image" src={product.image} alt={product.name} />
          </div>
          <div className="fade-up delay-1">
            <button type="button" className="back-link" onClick={() => navigateTo('#/')}>{t.backToProducts}</button>
            <div className="product-meta top-gap">
              <span className="tag green">{product.category}</span>
              <span className="tag light">{product.badge}</span>
            </div>
            <h1 className="details-title">{product.name}</h1>
            <p className="section-text">{product.description}</p>
            <div className="details-cards">
              <div className="detail-card"><span>{t.origin}</span><strong>{product.origin}</strong></div>
              <div className="detail-card"><span>{t.packaging}</span><strong>{product.packaging}</strong></div>
              <div className="detail-card"><span>{t.availability}</span><strong>{product.availability}</strong></div>
              <div className="detail-card"><span>{t.delivery}</span><strong>{product.cityDelivery}</strong></div>
            </div>
            <div className="action-row top-gap">
              <a className="button button-primary" href={`mailto:${t.contactEmail}?subject=${encodeURIComponent(`${t.requestBulkQuote} - ${product.name}`)}`}>{t.requestBulkQuote}</a>
              <a className="button button-secondary" href={`tel:${t.contactPhone.replace(/\s+/g, '')}`}>{t.callNow}</a>
              <a className="button button-whatsapp" href={createWhatsAppLink(t.whatsappNumber, `${t.whatsappProductMessage} ${product.name}`)} target="_blank" rel="noreferrer">{t.whatsappUs}</a>
            </div>
          </div>
        </div>
      </main>
      <Footer t={t} />
    </div>
  );
}

function HomePage({ t, onChangeLanguage, lang }) {
  return (
    <>
      <Header t={t} lang={lang} onChangeLanguage={onChangeLanguage} />
      <Hero t={t} />
      <About t={t} />
      <ProductGrid t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
}

export default function App() {
  const [view, setView] = useState(getCurrentView());
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    const onHashChange = () => setView(getCurrentView());
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('hardik-traders-lang', lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  const t = translations[lang] || translations.en;

  if (view.type === 'product') {
    const product = t.products.find((item) => item.id === view.id);
    if (product) return <ProductDetails product={product} t={t} lang={lang} onChangeLanguage={setLang} />;
  }

  return <HomePage t={t} lang={lang} onChangeLanguage={setLang} />;
}
