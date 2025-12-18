import { ArrowLeft, GraduationCap, Clock, Award, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';
import { UserProfileMenu } from './UserProfileMenu';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface CoursesProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

const courses = [
  {
    title: 'Bhagavad Gita - Introduction',
    subtitle: 'Understanding the context',
    duration: '2 hours',
    lessons: 8,
    progress: 75,
    icon: '📖'
  },
  {
    title: 'Bhagavad Gita - Chapter 2',
    subtitle: 'Reflections on Chapter 2',
    duration: '3 hours',
    lessons: 12,
    progress: 40,
    icon: '📖'
  },
  {
    title: 'Daily Reflections',
    subtitle: 'Daily inspiration',
    duration: '1 hour',
    lessons: 5,
    progress: 100,
    icon: '🧘'
  },
  {
    title: 'Ramayana Stories',
    subtitle: 'Epic tales of Lord Rama',
    duration: '4 hours',
    lessons: 15,
    progress: 0,
    icon: '📚'
  },
  {
    title: 'Festival Prep',
    subtitle: 'Janmashtami and more',
    duration: '2 hours',
    lessons: 6,
    progress: 0,
    icon: '🎉'
  }
];

export function Courses({ onNavigate, user, onLogout }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [modalCourse, setModalCourse] = useState<typeof courses[0] | null>(null);

  const handleCourseClick = (index: number) => {
    setSelectedCourse(index);
    setModalCourse(courses[index]);
    setShowCourseModal(true);
  };

  const handleStartCourse = () => {
    setShowCourseModal(false);
    alert(`Starting: ${modalCourse?.title}`);
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
                <h1 className="text-white text-lg">Courses</h1>
                <p className="text-blue-200 text-xs">{courses.length} courses available</p>
              </div>
            </div>
            <UserProfileMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
          {courses.map((course, index) => (
            <div 
              key={index}
              onClick={() => handleCourseClick(index)}
              className={`bg-blue-900/50 hover:bg-blue-900/70 rounded-xl p-3 cursor-pointer transition-colors border border-blue-800/50 ${
                selectedCourse === index ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{course.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm mb-1 truncate">{course.title}</h3>
                      <p className="text-blue-300 text-xs mb-2 truncate">{course.subtitle}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0 ml-2" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-blue-300 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-blue-300">Progress</span>
                        <span className="text-xs text-blue-300">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-blue-950 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      {course.progress === 100 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Award className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400">Completed</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Bottom Button */}
        <div className="bg-blue-950/80 backdrop-blur-sm p-4 border-t border-blue-800/50">
          <button 
            onClick={() => alert('View your certificates')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-3 transition-colors text-sm"
          >
            Earn Certificate
          </button>
        </div>
      </div>

      {/* Course Detail Modal */}
      <Modal 
        isOpen={showCourseModal} 
        onClose={() => {
          setShowCourseModal(false);
          setSelectedCourse(null);
        }}
        title={modalCourse?.title || 'Course'}
      >
        <div className="space-y-4">
          <div>
            <div className="text-3xl mb-3">{modalCourse?.icon}</div>
            <p className="text-blue-200 text-sm mb-3">{modalCourse?.subtitle}</p>
            <div className="flex items-center gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{modalCourse?.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>{modalCourse?.lessons} lessons</span>
              </div>
            </div>
          </div>

          {modalCourse && modalCourse.progress > 0 && (
            <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-200 text-sm">Your Progress</span>
                <span className="text-orange-400">{modalCourse.progress}%</span>
              </div>
              <div className="w-full bg-blue-950 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all"
                  style={{ width: `${modalCourse.progress}%` }}
                />
              </div>
              {modalCourse.progress === 100 && (
                <div className="flex items-center gap-2 mt-3 text-green-300">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Course Completed!</span>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-800/50">
            <p className="text-blue-100 text-sm">
              This course will guide you through fundamental concepts and provide deep insights into spiritual teachings.
            </p>
          </div>

          <div className="space-y-2">
            <button 
              onClick={handleStartCourse}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors"
            >
              {modalCourse && modalCourse.progress > 0 ? 'Continue Course' : 'Start Course'}
            </button>
            <button className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 text-white rounded-xl py-3 transition-colors">
              View Syllabus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}