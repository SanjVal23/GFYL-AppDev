import { ArrowLeft, PlaySquare, Clock, Eye, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { UserProfileMenu } from './UserProfileMenu';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface VideosProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

const videos = [
  {
    title: 'Introduction to Bhagavad Gita',
    duration: '15:30',
    views: '12.5k',
    thumbnail: 'https://images.unsplash.com/photo-1715628283743-00a42c986339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkJTIwa3Jpc2huYSUyMHBhaW50aW5nfGVufDF8fHx8MTc2NTczOTc5OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Life of Krishna - Early Years',
    duration: '22:45',
    views: '18.2k',
    thumbnail: 'https://images.unsplash.com/photo-1629639083646-9120347a4ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmlzaG5hJTIwZmx1dGUlMjBibHVlfGVufDF8fHx8MTc2NTczOTgwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Understanding Karma Yoga',
    duration: '18:20',
    views: '9.8k',
    thumbnail: 'https://images.unsplash.com/photo-1713986719526-8c44918a9688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWRoYSUyMGtyaXNobmElMjBhcnR8ZW58MXx8fHwxNzY1NzM5ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Daily Meditation Practice',
    duration: '12:15',
    views: '15.3k',
    thumbnail: 'https://images.unsplash.com/photo-1563261961-ad042ae05568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmlzaG5hJTIwZGVpdHklMjBzdGF0dWV8ZW58MXx8fHwxNzY1NzM5NTA1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Temple Tour - Radha Govind Dham',
    duration: '25:00',
    views: '22.1k',
    thumbnail: 'https://images.unsplash.com/photo-1715628283743-00a42c986339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkJTIwa3Jpc2huYSUyMHBhaW50aW5nfGVufDF8fHx8MTc2NTczOTc5OXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function Videos({ onNavigate, user, onLogout }: VideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
    setTimeout(() => {
      onNavigate('ai-video');
    }, 300);
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
                <h1 className="text-white text-lg">Video Library</h1>
                <p className="text-blue-200 text-xs">{videos.length} videos available</p>
              </div>
            </div>
            <UserProfileMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-6">
          {videos.map((video, index) => (
            <div 
              key={index}
              onClick={() => handleVideoClick(index)}
              className={`bg-blue-900/50 hover:bg-blue-900/70 rounded-xl overflow-hidden cursor-pointer transition-colors border border-blue-800/50 ${
                selectedVideo === index ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <PlaySquare className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm mb-1 truncate">{video.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-blue-300">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}