import { ArrowLeft, HelpCircle, Trophy, Star, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';
import { UserProfileMenu } from './UserProfileMenu';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface QuizzesProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

const quizzes = [
  {
    title: 'Chapter 1 Quiz',
    subtitle: 'Arjuna Vishada Yoga',
    questions: 10,
    difficulty: 'Easy',
    score: 85,
    completed: true
  },
  {
    title: 'Chapter 2 Quiz',
    subtitle: 'Sankhya Yoga fundamentals',
    questions: 15,
    difficulty: 'Medium',
    score: 92,
    completed: true
  },
  {
    title: 'Krishna Leelas',
    subtitle: 'Stories from Krishna\'s life',
    questions: 12,
    difficulty: 'Easy',
    score: null,
    completed: false
  },
  {
    title: 'Daily Practice',
    subtitle: 'Understanding Hindu rituals',
    questions: 8,
    difficulty: 'Easy',
    score: null,
    completed: false
  },
  {
    title: 'Advanced Philosophy',
    subtitle: 'Deep Vedantic concepts',
    questions: 20,
    difficulty: 'Hard',
    score: null,
    completed: false
  }
];

const sampleQuestions = [
  {
    question: 'What is the main message of the Bhagavad Gita?',
    options: ['Performing one\'s duty', 'Achieving wealth', 'Avoiding conflict', 'Seeking pleasure'],
    correct: 0
  },
  {
    question: 'Who spoke the Bhagavad Gita?',
    options: ['Arjuna', 'Lord Krishna', 'Vyasa', 'Sanjaya'],
    correct: 1
  }
];

export function Quizzes({ onNavigate, user, onLogout }: QuizzesProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [modalQuiz, setModalQuiz] = useState<typeof quizzes[0] | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleQuizClick = (index: number) => {
    setSelectedQuiz(index);
    setModalQuiz(quizzes[index]);
    setShowQuizModal(true);
  };

  const handleStartQuiz = () => {
    setShowQuizModal(false);
    setShowQuestionModal(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuestionModal(false);
      alert('Quiz completed! Your score: 85%');
    }
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
                <h1 className="text-white text-lg">Quizzes</h1>
                <p className="text-blue-200 text-xs">Test your knowledge</p>
              </div>
            </div>
            <UserProfileMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-900/50 border border-blue-800/50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">🏆</div>
              <div className="text-blue-200 text-xs">Total Score</div>
              <div className="text-orange-400 text-sm">88.5%</div>
            </div>
            <div className="bg-blue-900/50 border border-blue-800/50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">⭐</div>
              <div className="text-blue-200 text-xs">Completed</div>
              <div className="text-orange-400 text-sm">2/5</div>
            </div>
          </div>

          <div className="space-y-3">
            {quizzes.map((quiz, index) => (
              <div 
                key={index}
                onClick={() => handleQuizClick(index)}
                className={`bg-blue-900/50 hover:bg-blue-900/70 rounded-xl p-3 cursor-pointer transition-colors border border-blue-800/50 ${
                  selectedQuiz === index ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        quiz.difficulty === 'Easy' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                        quiz.difficulty === 'Medium' ? 'bg-blue-800/50 text-blue-200 border border-blue-600' :
                        'bg-red-900/50 text-red-300 border border-red-700'
                      }`}>
                        {quiz.difficulty}
                      </span>
                      <span className="text-xs text-blue-300">{quiz.questions} questions</span>
                    </div>
                    
                    <h3 className="text-white text-sm mb-1 truncate">{quiz.title}</h3>
                    <p className="text-blue-300 text-xs mb-2 truncate">{quiz.subtitle}</p>

                    {quiz.completed ? (
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-orange-400" />
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-blue-200">Score:</span>
                          <span className="text-xs text-orange-400">{quiz.score}%</span>
                        </div>
                        {quiz.score && quiz.score >= 90 && (
                          <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                        )}
                      </div>
                    ) : (
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs transition-colors">
                        Start Quiz
                      </button>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Info Modal */}
      <Modal 
        isOpen={showQuizModal} 
        onClose={() => {
          setShowQuizModal(false);
          setSelectedQuiz(null);
        }}
        title={modalQuiz?.title || 'Quiz'}
      >
        <div className="space-y-4">
          <div>
            <p className="text-blue-200 text-sm mb-3">{modalQuiz?.subtitle}</p>
            <div className="flex items-center gap-4 text-sm text-blue-200">
              <span>📝 {modalQuiz?.questions} questions</span>
              <span className={`px-2 py-1 rounded text-xs ${
                modalQuiz?.difficulty === 'Easy' ? 'bg-green-900/50 text-green-300' :
                modalQuiz?.difficulty === 'Medium' ? 'bg-blue-800/50 text-blue-200' :
                'bg-red-900/50 text-red-300'
              }`}>
                {modalQuiz?.difficulty}
              </span>
            </div>
          </div>

          {modalQuiz?.completed ? (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-orange-400" />
                <span className="text-white">Your Score: {modalQuiz.score}%</span>
              </div>
              <p className="text-green-300 text-sm">Great job! You've completed this quiz.</p>
            </div>
          ) : (
            <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-800/50">
              <p className="text-blue-100 text-sm">
                Test your knowledge on {modalQuiz?.subtitle}. Answer all questions to complete the quiz.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <button 
              onClick={handleStartQuiz}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors"
            >
              {modalQuiz?.completed ? 'Retake Quiz' : 'Start Quiz'}
            </button>
            {modalQuiz?.completed && (
              <button className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 text-white rounded-xl py-3 transition-colors">
                View Results
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* Question Modal */}
      <Modal 
        isOpen={showQuestionModal} 
        onClose={() => setShowQuestionModal(false)}
        title={`Question ${currentQuestion + 1}/${sampleQuestions.length}`}
      >
        <div className="space-y-4">
          <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-800/50">
            <p className="text-white">{sampleQuestions[currentQuestion]?.question}</p>
          </div>

          <div className="space-y-2">
            {sampleQuestions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? 'bg-orange-500 text-white'
                    : 'bg-blue-900/50 hover:bg-blue-900/70 text-blue-100 border border-blue-800/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </Modal>
    </div>
  );
}