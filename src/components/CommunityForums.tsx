import { ArrowLeft, Users, MessageSquare, ThumbsUp, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';
import { UserProfileMenu } from './UserProfileMenu';

type Screen = 'home' | 'bhagavad-gita' | 'ai-buddy' | 'courses' | 'community' | 'quizzes' | 'videos' | 'ai-video' | 'profile';

interface User {
  name: string;
  email: string;
}

interface CommunityForumsProps {
  onNavigate: (screen: Screen) => void;
  user: User;
  onLogout: () => void;
}

const forums = [
  {
    title: 'Understanding Karma',
    category: 'Q&A',
    author: 'Priya S.',
    replies: 24,
    likes: 56,
    time: '2h ago',
    preview: 'Can someone explain the concept of karma in simple terms? How does it affect our daily lives?'
  },
  {
    title: 'Daily Reflections',
    category: 'Discussion',
    author: 'Amit K.',
    replies: 18,
    likes: 42,
    time: '5h ago',
    preview: 'I\'ve been practicing daily meditation and it has transformed my perspective...'
  },
  {
    title: 'Inspiring stories from the Gita',
    category: 'Stories',
    author: 'Radha M.',
    replies: 31,
    likes: 89,
    time: '1d ago',
    preview: 'The story of Arjuna and Krishna on the battlefield teaches us so much about duty and purpose.'
  },
  {
    title: 'Service Info',
    category: 'Info',
    author: 'Temple Admin',
    replies: 12,
    likes: 34,
    time: '2d ago',
    preview: 'Temple timings for Janmashtami celebration: Morning aarti at 5 AM, special darshan at 12 PM...'
  },
  {
    title: 'Sharing Experiences',
    category: 'Discussion',
    author: 'Krishna D.',
    replies: 45,
    likes: 102,
    time: '3d ago',
    preview: 'After attending the last course on Chapter 2, I feel more connected to the teachings...'
  }
];

export function CommunityForums({ onNavigate, user, onLogout }: CommunityForumsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalPost, setModalPost] = useState<typeof forums[0] | null>(null);
  const [newDiscussionText, setNewDiscussionText] = useState('');

  const categories = ['All', 'Q&A', 'Discussion', 'Stories', 'Volunteer'];

  const handlePostClick = (index: number) => {
    setSelectedPost(index);
    setModalPost(forums[index]);
    setShowPostModal(true);
  };

  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const handleSubmitPost = () => {
    if (newDiscussionText.trim()) {
      setShowNewPostModal(false);
      setNewDiscussionText('');
      // Show success feedback
      setTimeout(() => {
        alert('Discussion created successfully!');
      }, 300);
    }
  };

  const filteredForums = selectedCategory === 'All' 
    ? forums 
    : forums.filter(f => f.category === selectedCategory);

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
                <h1 className="text-white text-lg">Community</h1>
                <p className="text-blue-200 text-xs">Join the discussion</p>
              </div>
            </div>
            <UserProfileMenu user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Forum Categories */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-blue-900/50 text-blue-200 border border-blue-800/50 hover:bg-blue-900/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Forum Posts */}
          <div className="space-y-3">
            {filteredForums.map((forum, index) => (
              <div 
                key={index}
                onClick={() => handlePostClick(index)}
                className={`bg-blue-900/50 hover:bg-blue-900/70 rounded-xl p-3 cursor-pointer transition-colors border border-blue-800/50 ${
                  selectedPost === index ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">
                        {forum.category}
                      </span>
                      <span className="text-xs text-blue-400">{forum.time}</span>
                    </div>
                    <h3 className="text-white text-sm mb-1 truncate">{forum.title}</h3>
                    <p className="text-blue-300 text-xs truncate">by {forum.author}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                </div>
                
                <div className="flex items-center gap-3 text-xs text-blue-300">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{forum.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{forum.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="bg-blue-950/80 backdrop-blur-sm p-4 border-t border-blue-800/50">
          <button 
            onClick={handleNewPost}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-3 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Start New Discussion</span>
          </button>
        </div>
      </div>

      {/* New Post Modal */}
      <Modal 
        isOpen={showNewPostModal} 
        onClose={() => {
          setShowNewPostModal(false);
          setNewDiscussionText('');
        }}
        title="Create new discussion"
      >
        <div className="space-y-4">
          <div>
            <label className="text-blue-200 text-sm mb-2 block">Discussion Title</label>
            <input
              type="text"
              value={newDiscussionText}
              onChange={(e) => setNewDiscussionText(e.target.value)}
              placeholder="What would you like to discuss?"
              className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-blue-200 text-sm mb-2 block">Category</label>
            <select className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors">
              <option>Q&A</option>
              <option>Discussion</option>
              <option>Stories</option>
              <option>Volunteer</option>
            </select>
          </div>

          <div>
            <label className="text-blue-200 text-sm mb-2 block">Description</label>
            <textarea
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg px-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors resize-none"
            />
          </div>

          <button 
            onClick={handleSubmitPost}
            disabled={!newDiscussionText.trim()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Discussion
          </button>
        </div>
      </Modal>

      {/* Post Detail Modal */}
      <Modal 
        isOpen={showPostModal} 
        onClose={() => {
          setShowPostModal(false);
          setSelectedPost(null);
        }}
        title={modalPost?.category || ''}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-white mb-2">{modalPost?.title}</h3>
            <p className="text-blue-300 text-xs mb-3">by {modalPost?.author} • {modalPost?.time}</p>
          </div>
          
          <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-800/50">
            <p className="text-blue-100 text-sm">
              {modalPost?.preview}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{modalPost?.replies} replies</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{modalPost?.likes} likes</span>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition-colors">
              Join Discussion
            </button>
            <button className="w-full bg-blue-900/50 hover:bg-blue-900/70 border border-blue-800/50 text-white rounded-xl py-3 transition-colors flex items-center justify-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>Like</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}