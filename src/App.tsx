import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Home } from './components/Home';
import { BhagavadGita } from './components/BhagavadGita';
import { AIBuddy } from './components/AIBuddy';
import { Courses } from './components/Courses';
import { CommunityForums } from './components/CommunityForums';
import { Quizzes } from './components/Quizzes';
import { Videos } from './components/Videos';
import { AIVideo } from './components/AIVideo';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'bhagavad-gita':
        return <BhagavadGita onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'ai-buddy':
        return <AIBuddy onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'courses':
        return <Courses onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'community':
        return <CommunityForums onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'quizzes':
        return <Quizzes onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'videos':
        return <Videos onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'ai-video':
        return <AIVideo onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      case 'profile':
        return <Profile onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
      default:
        return <Home onNavigate={setCurrentScreen} user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative min-h-screen bg-gradient-to-br from-blue-950 to-blue-900">
        <div className="max-w-md mx-auto min-h-screen bg-blue-950/50 relative">
          {renderScreen()}
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      </div>
    </div>
  );
}