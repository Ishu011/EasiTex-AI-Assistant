import { Message, AIProvider } from '../types/chat';

class AIServiceClass {
  private readonly EASITEX_CONTEXT = `
You are an intelligent, friendly, and helpful AI assistant for Easitex readers. This system was built by Ishu.

COMPANY INFO:
Easitex by DFU Publications is a niche B2B platform focused on the textile and fashion industry, leveraging over 35 years of expertise to deliver AI-driven, sustainability-focused insights and build connected trade communities.

Vision: To be the leading information hub for textile and fashion professionals, driving innovation and global excellence.
Mission: Deliver accurate, timely, and relevant content to empower industry stakeholders.

SERVICES:
- Digital-first, AI-powered platform
- Real-time industry updates
- Tailored B2B content
- Sustainability-focused reporting
- Industry counseling and upskilling
- Connected trade communities

TARGET MARKET:
Textile manufacturers, retailers, professionals, trade associations, and media consumers.

GUIDELINES:
- Always provide clear, simple, and professional answers
- For product or service queries, give concise info and guide users to explore more on easitex.co
- If the query is unrelated, politely redirect users to relevant sections of the website
- Answer in a conversational, human-like tone, not robotic
- Summarize complex answers in bullet points if possible
- Always end with a helpful suggestion like: "Would you like me to show you related links?"
  `;

  async sendMessage(message: string, history: Message[], provider: AIProvider): Promise<string> {
    try {
      switch (provider) {
        case 'gemini':
          return await this.sendToGemini(message, history);
        case 'openai':
          return await this.sendToOpenAI(message, history);
        default:
          throw new Error('Unsupported AI provider');
      }
    } catch (error) {
      console.error('AI Service error:', error);
      return this.getFallbackResponse(message);
    }
  }

  private async sendToGemini(message: string, history: Message[]): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const conversation = this.formatHistoryForGemini(history.slice(-10));
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: this.EASITEX_CONTEXT }]
            },
            ...conversation,
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
  }

  private async sendToOpenAI(message: string, history: Message[]): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const messages = [
      { role: 'system', content: this.EASITEX_CONTEXT },
      ...this.formatHistoryForOpenAI(history.slice(-10)),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
  }

  private formatHistoryForGemini(history: Message[]) {
    return history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
  }

  private formatHistoryForOpenAI(history: Message[]) {
    return history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
  }

  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return `Easitex offers comprehensive textile industry solutions including:

• Real-time industry updates and insights
• AI-powered B2B content tailored for professionals  
• Sustainability-focused reporting and analysis
• Industry counseling and upskilling programs
• Connected trade communities for networking

With over 35 years of expertise, we're your trusted partner in textile innovation. Would you like to explore more details about any specific service on easitex.co?`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return `You can reach our team through several channels:

• Visit easitex.co for our complete contact information
• Check our contact section for phone and email details
• Connect with us on our social media platforms
• Visit our office locations listed on our website

Our team is ready to assist you with any textile industry inquiries. Would you like me to guide you to specific contact information?`;
    }
    
    if (lowerMessage.includes('sustainability') || lowerMessage.includes('environment')) {
      return `Easitex is committed to driving sustainability in the textile industry:

• Comprehensive sustainability reporting and analysis
• Latest innovations in eco-friendly textile practices
• Industry best practices for environmental responsibility
• Insights on sustainable supply chain management

We help businesses adopt greener practices while maintaining profitability. Would you like to explore our sustainability resources on easitex.co?`;
    }
    
    return `Thank you for your question! I'm here to help you learn more about Easitex and our textile industry expertise.

For detailed information about our services, latest insights, and industry updates, I recommend visiting easitex.co. Our platform offers comprehensive resources for textile professionals.

Would you like me to help you with information about our specific services or direct you to relevant sections of our website?`;
  }
}

const AIService = new AIServiceClass();
export default AIService;