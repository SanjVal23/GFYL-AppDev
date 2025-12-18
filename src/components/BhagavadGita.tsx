import { ArrowLeft, BookOpen, Play, Award, LogOut, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface BhagavadGitaProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

const chapters = [
  { number: 1, title: 'Arjuna Vishada Yoga', verses: 47, completed: false },
  { number: 2, title: 'Sankhya Yoga', verses: 72, completed: true },
  { number: 3, title: 'Karma Yoga', verses: 43, completed: true },
  { number: 4, title: 'Jnana Karma Sanyasa Yoga', verses: 42, completed: false },
  { number: 5, title: 'Karma Sanyasa Yoga', verses: 29, completed: false },
  { number: 6, title: 'Dhyana Yoga', verses: 47, completed: false },
  { number: 7, title: 'Jnana Vijnana Yoga', verses: 30, completed: false },
  { number: 8, title: 'Aksara Brahma Yoga', verses: 28, completed: false },
];

export function BhagavadGita({ onNavigate, user, onLogout }: BhagavadGitaProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [modalChapter, setModalChapter] = useState<typeof chapters[0] | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleChapterClick = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
    const chapter = chapters.find(c => c.number === chapterNumber);
    setModalChapter(chapter || null);
    setShowChapterModal(true);
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
                <h1 className="text-white text-lg">Bhagavad Gita</h1>
                <p className="text-blue-200 text-xs">18 Chapters • 700 Verses</p>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="bg-blue-800/50 hover:bg-blue-800/70 rounded-lg p-2 transition-colors"
              >
                <UserCircle className="w-5 h-5 text-orange-400" />
              </button>

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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
          {chapters.map((chapter) => (
            <div 
              key={chapter.number}
              onClick={() => handleChapterClick(chapter.number)}
              className={`bg-blue-900/50 hover:bg-blue-900/70 rounded-xl p-3 cursor-pointer transition-colors border border-blue-800/50 ${
                selectedChapter === chapter.number ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 flex-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">{chapter.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm mb-1">{chapter.title}</h3>
                    <p className="text-blue-300 text-xs">{chapter.verses} verses</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {chapter.completed && (
                    <Award className="w-4 h-4 text-green-400" />
                  )}
                  <Play className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Bottom Button */}
        <div className="bg-blue-950/80 backdrop-blur-sm p-4 border-t border-blue-800/50">
          <button 
            onClick={() => handleChapterClick(1)}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-3 transition-colors"
          >
            Start Reading
          </button>
        </div>
      </div>

      {/* Chapter Modal */}
      <Modal 
        isOpen={showChapterModal} 
        onClose={() => {
          setShowChapterModal(false);
          setSelectedChapter(null);
        }}
        title={modalChapter ? `Chapter ${modalChapter.number}` : 'Chapter'}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-white mb-2">{modalChapter?.title}</h3>
            <p className="text-blue-200 text-sm mb-4">{modalChapter?.verses} verses</p>
          </div>
          
          <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-800/50">
            <p className="text-blue-100 text-sm mb-3">
              In this chapter, Lord Krishna teaches Arjuna about the eternal nature of the soul and the principles of dharma.
            </p>
            <p className="text-blue-200 text-xs italic">
              "You have the right to perform your duty, but you are not entitled to the fruits of your actions."
            </p>
          </div>

          {modalChapter?.completed && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-300">
                <Award className="w-4 h-4" />
                <span className="text-sm">You've completed this chapter!</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors">
              {modalChapter?.completed ? 'Review Chapter' : 'Start Reading'}
            </button>
            <button className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 text-white rounded-xl py-3 transition-colors">
              Listen to Audio
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}