import { ArrowLeft, Play, Pause, Volume2, VolumeX, Download, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { UserProfileMenu } from './UserProfileMenu';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface AIVideoProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

export function AIVideo({ onNavigate, user, onLogout }: AIVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(45);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleDownload = (type: string) => {
    alert(`Downloading ${type}...`);
  };

  const handleCreateVideo = () => {
    alert('Creating personalized AI video...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="min-h-screen bg-blue-950/50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('videos')}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-white text-lg">AI Video Learning</h1>
                <p className="text-blue-200 text-xs">Personalized content</p>
              </div>
            </div>
            <UserProfileMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-6">
          {/* Krishna Image Header */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500">
              <img 
                src="https://images.unsplash.com/photo-1629639083646-9120347a4ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrcmlzaG5hJTIwZmx1dGUlMjBibHVlfGVufDF8fHx8MTc2NTczOTgwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Krishna"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Video Player */}
          <div className="bg-blue-900/50 border border-blue-800/50 rounded-2xl p-4 mb-4">
            <div className="relative bg-blue-950 rounded-xl overflow-hidden mb-3">
              <img 
                src="https://images.unsplash.com/photo-1715628283743-00a42c986339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkJTIwa3Jpc2huYSUyMHBhaW50aW5nfGVufDF8fHx8MTc2NTczOTc5OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Video"
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button 
                  onClick={handlePlayPause}
                  className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1" />
                  )}
                </button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-200 text-xs">0:00</span>
                <div className="flex-1 bg-blue-950 rounded-full h-1.5 cursor-pointer">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-blue-200 text-xs">3:24</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handlePlayPause}
                    className="text-white hover:bg-blue-800/50 p-2 rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={handleMute}
                    className="text-white hover:bg-blue-800/50 p-2 rounded-lg transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Video Ready Progress */}
          <div className="bg-blue-900/50 border border-blue-800/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-white text-sm">AI Video is Ready!</h2>
            </div>

            <div className="mb-3">
              <div className="relative">
                <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - 0.75)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl text-orange-500">75%</span>
                </div>
              </div>
              <p className="text-center text-blue-200 mt-3 text-xs">
                Your personalized AI video is ready
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button 
              onClick={() => handleDownload('Transcript in Hindi')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-3 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Transcript (Hindi)</span>
            </button>
            
            <button 
              onClick={() => handleDownload('Question-answer')}
              className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 text-white rounded-xl px-4 py-3 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Question-answer</span>
            </button>

            <button 
              onClick={handleCreateVideo}
              className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 text-white rounded-xl px-4 py-3 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Create Video</span>
            </button>
            
            <button 
              onClick={() => handleDownload('AI Video')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-3 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download Video</span>
            </button>
          </div>

          <p className="text-xs text-blue-300 mt-4 text-center">
            Ask for another video
          </p>
        </div>
      </div>
    </div>
  );
}