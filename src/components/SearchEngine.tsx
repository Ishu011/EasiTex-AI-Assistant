import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, BookOpen, Recycle, Leaf, Factory, TrendingUp, Download, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AIService from '../services/AIService';
import { AIProvider } from '../types/chat';

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  category: 'sustainability' | 'circular-economy' | 'recyclability' | 'pre-production' | 'post-production';
  relevanceScore: number;
  source: string;
  date: string;
  tags: string[];
  url?: string;
}

interface SearchEngineProps {
  aiProvider: AIProvider;
}

const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: BookOpen },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'circular-economy', label: 'Circular Economy', icon: Recycle },
  { id: 'recyclability', label: 'Recyclability', icon: TrendingUp },
  { id: 'pre-production', label: 'Pre-Production', icon: Factory },
  { id: 'post-production', label: 'Post-Production', icon: Download }
];

const SAMPLE_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Circular Design Principles in Textile Manufacturing',
    summary: 'Comprehensive guide on implementing circular design principles to reduce waste and improve resource efficiency in textile production.',
    category: 'circular-economy',
    relevanceScore: 95,
    source: 'Easitex Research',
    date: '2024-01-15',
    tags: ['circular design', 'waste reduction', 'efficiency'],
    url: 'https://easitex.co/research/circular-design'
  },
  {
    id: '2',
    title: 'Post-Production Textile Waste Management Solutions',
    summary: 'Innovative approaches to managing textile waste after production, including recycling technologies and waste-to-energy solutions.',
    category: 'post-production',
    relevanceScore: 88,
    source: 'Industry Report',
    date: '2024-01-10',
    tags: ['waste management', 'recycling', 'post-production'],
  },
  {
    id: '3',
    title: 'Sustainable Fiber Selection for Eco-Friendly Manufacturing',
    summary: 'Analysis of sustainable fiber options and their impact on environmental footprint during pre-production phases.',
    category: 'pre-production',
    relevanceScore: 92,
    source: 'Sustainability Journal',
    date: '2024-01-08',
    tags: ['sustainable fibers', 'eco-friendly', 'pre-production'],
  }
];

const SearchEngine: React.FC<SearchEngineProps> = ({ aiProvider }) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load initial results
    setResults(SAMPLE_RESULTS);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setAiInsight('');

    try {
      // Filter results based on query and category
      let filteredResults = SAMPLE_RESULTS.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                           result.summary.toLowerCase().includes(query.toLowerCase()) ||
                           result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'all' || result.category === selectedCategory;
        
        return matchesQuery && matchesCategory;
      });

      // Sort by relevance
      filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
      setResults(filteredResults);

      // Get AI insight about the search
      const aiPrompt = `Provide a brief insight about "${query}" in the context of textile sustainability, circular economy, and recyclability. Focus on key trends, challenges, and opportunities. Keep it concise and actionable.`;
      
      const insight = await AIService.sendMessage(aiPrompt, [], aiProvider);
      setAiInsight(insight);

    } catch (error) {
      console.error('Search error:', error);
      setAiInsight('Unable to generate AI insights at the moment. Please check your AI provider configuration.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = CATEGORIES.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : BookOpen;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'sustainability': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'circular-economy': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'recyclability': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'pre-production': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'post-production': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Sustainability Search Engine
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          AI-Powered Research on Circular Economy & Recyclability in Textiles
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Built by Ishu • Powered by Advanced AI Technology
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for sustainability practices, circular economy solutions, recyclability methods..."
              className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg transition-colors flex items-center"
          >
            <Filter size={20} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-3 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-yellow-400 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Insight */}
      {aiInsight && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg border-l-4 border-yellow-400">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            AI Insight
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300 whitespace-pre-wrap">{aiInsight}</p>
        </div>
      )}

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Search Results ({results.length})
          </h2>
          {selectedCategory !== 'all' && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Filtered by: {CATEGORIES.find(cat => cat.id === selectedCategory)?.label}
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search terms or category filters
            </p>
          </div>
        ) : (
          results.map((result) => {
            const CategoryIcon = getCategoryIcon(result.category);
            return (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getCategoryColor(result.category)}`}>
                      <CategoryIcon size={16} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 cursor-pointer">
                        {result.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{result.source}</span>
                        <span>•</span>
                        <span>{new Date(result.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                          {result.relevanceScore}% relevance
                        </span>
                      </div>
                    </div>
                  </div>
                  {result.url && (
                    <button className="text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                      <ExternalLink size={20} />
                    </button>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {result.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Powered by Easitex AI • Built by Ishu • {results.length} results found
        </p>
      </div>
    </div>
  );
};

export default SearchEngine;