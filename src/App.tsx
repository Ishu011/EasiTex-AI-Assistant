import React from 'react';
import { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import Chatbot from './components/Chatbot';
import SearchEngine from './components/SearchEngine';
import { ThemeProvider } from './contexts/ThemeContext';
import { AIProvider } from './types/chat';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search'>('home');
  const [aiProvider] = useState<AIProvider>('gemini');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Easitex AI Platform
                </h1>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'home'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Home
                  </button>
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'search'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    <Search size={16} className="mr-2" />
                    Sustainability Search
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
              
              </div>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="container mx-auto px-4 py-8">
              <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to Easitex
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Your AI-Powered Textile & Fashion Industry Hub
                </p>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-2">35+ Years of Industry Expertise</h2>
                  <p className="text-lg">
                    Delivering AI-driven, sustainability-focused insights for textile professionals worldwide
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Real-time Updates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Stay informed with the latest trends and developments in the textile industry
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Sustainability Search
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI-powered search engine for circular economy and recyclability insights
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    AI Assistant
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get instant help with voice support, smart suggestions, and expert guidance
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Explore our AI-powered tools for textile sustainability research!
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Use the Sustainability Search for research or chat with our AI assistant.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="py-8">
              <SearchEngine aiProvider={aiProvider} />
            </div>
          )}
        </main>

        {/* Floating Chatbot Widget - only show on home page */}
        {activeTab === 'home' && (
          <div className="fixed bottom-6 right-6 z-50">
            <Chatbot />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;