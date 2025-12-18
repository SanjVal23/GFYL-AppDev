import { LogOut, UserCircle } from 'lucide-react';
import { useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface UserProfileMenuProps {
  user: User;
  onLogout: () => void;
}

export function UserProfileMenu({ user, onLogout }: UserProfileMenuProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="bg-blue-800/50 hover:bg-blue-800/70 rounded-lg p-2 transition-colors"
      >
        <UserCircle className="w-5 h-5 text-orange-400" />
      </button>

      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-blue-900 border border-blue-700 rounded-lg shadow-xl overflow-hidden z-50">
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
  );
}
