import React from 'react';
import { X, Trash2, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { AIProvider } from '../types/chat';

interface ConfigPanelProps {
  aiProvider: AIProvider;
  setAiProvider: (provider: AIProvider) => void;
  onClose: () => void;
  onClearHistory: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  aiProvider,
  setAiProvider,
  onClose,
  onClearHistory
}) => {
  const handleProviderChange = (provider: AIProvider) => {
    setAiProvider(provider);
    localStorage.setItem('easitex-ai-provider', provider);
  };

  const isGeminiConfigured = Boolean(import.meta.env.VITE_GEMINI_API_KEY);
  const isOpenAIConfigured = Boolean(import.meta.env.VITE_OPENAI_API_KEY);

  const getProviderStatus = (provider: AIProvider) => {
    switch (provider) {
      case 'gemini':
        return isGeminiConfigured ? 'configured' : 'not-configured';
      case 'openai':
        return isOpenAIConfigured ? 'configured' : 'not-configured';
      default:
        return 'not-configured';
    }
  };

  return (
    <div className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Settings</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* AI Provider Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Provider
          </label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border dark:border-gray-600 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="provider"
                  value="gemini"
                  checked={aiProvider === 'gemini'}
                  onChange={() => handleProviderChange('gemini')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-900 dark:text-white">Google Gemini</span>
              </label>
              <div className="flex items-center">
                {getProviderStatus('gemini') === 'configured' ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <AlertCircle size={16} className="text-red-500" />
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 border dark:border-gray-600 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="provider"
                  value="openai"
                  checked={aiProvider === 'openai'}
                  onChange={() => handleProviderChange('openai')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-900 dark:text-white">OpenAI</span>
              </label>
              <div className="flex items-center">
                {getProviderStatus('openai') === 'configured' ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <AlertCircle size={16} className="text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
          <div className="flex items-start">
            <Key size={16} className="text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                API Key Setup
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                {getProviderStatus(aiProvider) === 'configured' 
                  ? `${aiProvider.charAt(0).toUpperCase() + aiProvider.slice(1)} is configured and ready to use.`
                  : `Add VITE_${aiProvider.toUpperCase()}_API_KEY to your .env file to enable AI responses.`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Clear History */}
        <div>
          <button
            onClick={onClearHistory}
            className="flex items-center justify-center w-full p-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
          >
            <Trash2 size={16} className="mr-2" />
            Clear Chat History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;