import { Home, GraduationCap, Users, PlaySquare, UserCircle } from 'lucide-react';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'courses' as Screen, icon: GraduationCap, label: 'Courses' },
    { id: 'community' as Screen, icon: Users, label: 'Community' },
    { id: 'videos' as Screen, icon: PlaySquare, label: 'Videos' },
    { id: 'profile' as Screen, icon: UserCircle, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-blue-950/95 backdrop-blur-sm border-t border-blue-800/50 px-2 py-2 z-20">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-orange-400'
                  : 'text-blue-300 hover:text-blue-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-orange-400/20' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}