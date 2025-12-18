import { BookOpen, MessageSquare, GraduationCap, Brain, PlaySquare, HelpCircle, Users, LogOut, UserCircle } from 'lucide-react';
import { useState } from 'react';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

export function Home({ onNavigate, user, onLogout }: HomeProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="min-h-screen bg-blue-950/50 flex flex-col pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400">
                <img 
                  src="https://images.unsplash.com/photo-1715628283743-00a42c986339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkJTIwa3Jpc2huYSUyMHBhaW50aW5nfGVufDF8fHx8MTc2NTczOTc5OXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Krishna"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-white text-lg">Radha Govind Dham</h1>
                <p className="text-blue-200 text-xs">Gita For Your Life</p>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-blue-800/50 hover:bg-blue-800/70 rounded-lg px-3 py-2 transition-colors"
              >
                <UserCircle className="w-5 h-5 text-orange-400" />
                <span className="text-white text-sm hidden sm:block">{user.name}</span>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-900 border border-blue-700 rounded-lg shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-blue-700">
                    <p className="text-white text-sm">{user.name}</p>
                    <p className="text-blue-300 text-xs truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-white hover:bg-blue-800/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 pb-6 overflow-y-auto flex-1">
          {/* Bhagavad Gita Card */}
          <div 
            onClick={() => onNavigate('bhagavad-gita')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">Bhagavad Gita</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white bg-blue-800/40 rounded-lg p-2">
                <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs">Introduction to Hinduism</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-blue-800/40 rounded-lg p-2">
                <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs">Life of Krishna</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-blue-800/40 rounded-lg p-2">
                <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs">Daily Practices</span>
              </div>
            </div>
          </div>

          {/* AI Buddy Card */}
          <div 
            onClick={() => onNavigate('ai-buddy')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">AI Buddy</h2>
            </div>
            <p className="text-blue-200 text-xs">
              Your AI companion for spiritual guidance
            </p>
          </div>

          {/* Courses Card */}
          <div 
            onClick={() => onNavigate('courses')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">Courses</h2>
            </div>
            <p className="text-blue-200 text-xs">
              Structured learning paths
            </p>
          </div>

          {/* Quizzes Card */}
          <div 
            onClick={() => onNavigate('quizzes')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">Quizzes</h2>
            </div>
            <p className="text-blue-200 text-xs">
              Test your knowledge
            </p>
          </div>

          {/* Videos Card */}
          <div 
            onClick={() => onNavigate('videos')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <PlaySquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">Videos</h2>
            </div>
            <p className="text-blue-200 text-xs">
              Watch spiritual teachings
            </p>
          </div>

          {/* Community Forums Card */}
          <div 
            onClick={() => onNavigate('community')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">Community Forums</h2>
            </div>
            <p className="text-blue-200 text-xs">
              Connect with fellow seekers
            </p>
          </div>

          {/* Curated Content Card */}
          <div 
            onClick={() => onNavigate('ai-video')}
            className="bg-blue-900/50 hover:bg-blue-900/70 rounded-2xl p-4 cursor-pointer transition-colors border border-blue-800/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-base">Curated Content</h2>
            </div>
            <p className="text-blue-200 text-xs">
              Personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}