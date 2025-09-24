# 🤖 Easitex AI Chatbot

A production-ready AI chatbot for Easitex textile industry platform with advanced features including voice input/output, persistent chat history, and multiple AI provider support.

## ✨ Features

- **🎯 Smart AI Assistant** - Trained specifically for Easitex textile industry expertise
- **🗣️ Voice Support** - Speech-to-text input and text-to-speech output
- **💾 Persistent History** - Chat conversations saved locally
- **🌓 Dark/Light Theme** - Auto-detect system preference with manual toggle
- **⚙️ Multiple AI Providers** - Support for Google Gemini and OpenAI
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Beautiful UI** - Yellow and white theme matching Easitex branding
- **💬 Quick Suggestions** - FAQ buttons for common questions
- **🔧 Configuration Panel** - Easy setup and provider switching

## 🚀 Quick Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure AI Provider**
   - Copy `.env.example` to `.env`
   - Add your API key:
     - For Gemini: Get key from [Google AI Studio](https://aistudio.google.com/app/apikey)
     - For OpenAI: Get key from [OpenAI Platform](https://platform.openai.com/api-keys)

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

```bash
# Recommended: Google Gemini (cost-effective)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_AI_PROVIDER=gemini

# Alternative: OpenAI
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_AI_PROVIDER=openai
```

### AI Provider Setup

**Google Gemini (Recommended)**
- Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key
- Add to your `.env` file

**OpenAI**
- Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- Create a new API key
- Add to your `.env` file

## 🎮 Usage

1. **Floating Widget** - Click the yellow chat button in bottom-right corner
2. **Voice Input** - Click the microphone icon to speak your question
3. **Quick Suggestions** - Use pre-defined FAQ buttons for common queries
4. **Settings** - Configure AI provider and clear chat history
5. **Theme Toggle** - Switch between light and dark modes

## 🧠 AI Capabilities

The chatbot is trained specifically for Easitex and can help with:

- Company information and services
- Textile industry insights
- Sustainability initiatives
- Contact information
- Latest publications and updates
- Industry trends and analysis

## 🎨 Customization

### Colors
- Primary: Yellow gradients (`from-yellow-400 to-yellow-600`)
- Secondary: White and gray tones
- Theme: Supports both light and dark modes

### Branding
- Easy to customize for other brands
- Modular component structure
- Tailwind CSS for easy styling

## 📱 Browser Support

- **Voice Features**: Chrome, Edge, Safari (modern versions)
- **General Features**: All modern browsers
- **Local Storage**: Supported in all browsers

## 🔒 Security

- API keys stored in environment variables
- No sensitive data in client-side code
- Local storage for chat history only
- HTTPS recommended for production

## 🚀 Deployment

### Frontend Only (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting provider

### With Backend Proxy (Recommended for Production)
1. Set up Node.js/Express server
2. Proxy API calls to keep keys secure
3. Deploy frontend and backend separately

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📞 Support

For technical support or customization requests, contact the Easitex development team.

## 📄 License

© 2024 Easitex by DFU Publications. All rights reserved.