import { ArrowLeft, Brain, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { UserProfileMenu } from './UserProfileMenu';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface AIBuddyProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

export function AIBuddy({ onNavigate, user, onLogout }: AIBuddyProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: 'Namaste! How can I help you on your spiritual journey today?'
    }
  ]);

  const suggestions = [
    'Navigate a lifelong plan',
    'Ask AI Buddy',
    'Select device',
    'Today\'s reflection'
  ];

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'ai',
          text: 'That\'s a wonderful question! In the Bhagavad Gita, Krishna teaches us that...'
        }]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="min-h-screen bg-blue-950/50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('home')}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-white text-lg">AI Buddy</h1>
                <p className="text-blue-200 text-xs">Spiritual Guidance</p>
              </div>
            </div>
            <UserProfileMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4">
          {/* AI Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-4 border-blue-800">
              <img 
                src="https://images.unsplash.com/photo-1629639083646-9120347a4ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmlzaG5hJTIwZmx1dGUlMjBibHVlfGVufDF8fHx8MTc2NTczOTgwMHww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="AI Buddy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-blue-900/70 text-white border border-blue-800/50'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-400">AI Buddy</span>
                    </div>
                  )}
                  <p className="text-xs">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="mb-3">
            <p className="text-blue-200 text-xs mb-2">Suggestions:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-2 text-xs transition-colors text-left flex items-center gap-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-blue-900/70 border border-blue-800/50 rounded-2xl p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent px-2 py-2 outline-none text-white placeholder:text-blue-300 text-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}