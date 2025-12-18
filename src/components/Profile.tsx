import { UserCircle, Mail, Award, BookOpen, Trophy, Video, MessageSquare, Settings, LogOut, ChevronRight, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

export function Profile({ onNavigate, user, onLogout }: ProfileProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const stats = [
    { icon: BookOpen, label: 'Chapters Read', value: '3', color: 'text-blue-400' },
    { icon: Trophy, label: 'Quizzes Passed', value: '2', color: 'text-orange-400' },
    { icon: Award, label: 'Certificates', value: '1', color: 'text-green-400' },
    { icon: Video, label: 'Videos Watched', value: '5', color: 'text-purple-400' },
  ];

  const activities = [
    { title: 'Completed Chapter 2 Quiz', time: '2 hours ago', icon: Trophy },
    { title: 'Started Bhagavad Gita Course', time: '1 day ago', icon: GraduationCap },
    { title: 'Joined Community Discussion', time: '2 days ago', icon: MessageSquare },
    { title: 'Watched Krishna Leelas Video', time: '3 days ago', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="min-h-screen bg-blue-950/50 flex flex-col pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-500 bg-blue-800">
              <img 
                src="https://images.unsplash.com/photo-1715628283743-00a42c986339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkJTIwa3Jpc2huYSUyMHBhaW50aW5nfGVufDF8fHx8MTc2NTczOTc5OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-white text-xl mb-1">{user.name}</h1>
            <div className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-4">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-blue-900/50 border border-blue-800/50 rounded-xl p-4 text-center"
                >
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-white text-2xl mb-1">{stat.value}</div>
                  <div className="text-blue-300 text-xs">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h2 className="text-white mb-3">Recent Activity</h2>
            <div className="space-y-2">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={index}
                    className="bg-blue-900/50 border border-blue-800/50 rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{activity.title}</p>
                      <p className="text-blue-300 text-xs">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings & Actions */}
          <div className="space-y-2 mb-6">
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 rounded-xl p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-blue-300" />
                <span className="text-white">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </button>

            <button 
              onClick={() => onNavigate('courses')}
              className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 rounded-xl p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-300" />
                <span className="text-white">My Certificates</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </button>

            <button 
              onClick={onLogout}
              className="w-full bg-red-900/30 hover:bg-red-900/50 border border-red-700/50 rounded-xl p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-300">Logout</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <div>
            <label className="text-blue-200 text-sm mb-2 block">Full Name</label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-blue-200 text-sm mb-2 block">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-blue-200 text-sm mb-2 block">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button 
            onClick={() => {
              setShowEditModal(false);
              alert('Profile updated successfully!');
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)}
        title="Settings"
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-950/50 rounded-lg border border-blue-800/50">
              <span className="text-white text-sm">Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-blue-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-950/50 rounded-lg border border-blue-800/50">
              <span className="text-white text-sm">Email Updates</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-blue-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-950/50 rounded-lg border border-blue-800/50">
              <span className="text-white text-sm">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-blue-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          <div>
            <label className="text-blue-200 text-sm mb-2 block">Language</label>
            <select className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors">
              <option>English</option>
              <option>Hindi</option>
              <option>Sanskrit</option>
            </select>
          </div>

          <button 
            onClick={() => setShowSettingsModal(false)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </Modal>
    </div>
  );
}