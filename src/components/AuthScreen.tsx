import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: { name: string; email: string }) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Login
      if (email && password) {
        onLogin({ name: email.split('@')[0], email });
      }
    } else {
      // Signup
      if (email && password && name) {
        onLogin({ name, email });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-500">
            <img 
              src="https://images.unsplash.com/photo-1715628283743-00a42c986339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkJTIwa3Jpc2huYSUyMHBhaW50aW5nfGVufDF8fHx8MTc2NTczOTc5OXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Krishna"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-white text-2xl mb-2">Radha Govind Dham</h1>
          <p className="text-blue-200 text-sm">Gita For Your Life</p>
        </div>

        {/* Auth Form */}
        <div className="bg-blue-900/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-800/50">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                isLogin
                  ? 'bg-orange-500 text-white'
                  : 'text-blue-200 hover:bg-blue-800/30'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                !isLogin
                  ? 'bg-orange-500 text-white'
                  : 'text-blue-200 hover:bg-blue-800/30'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-blue-200 text-sm mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-blue-200 text-sm mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-blue-200 text-sm mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-blue-950/50 border border-blue-800/50 rounded-lg pl-10 pr-12 py-3 text-white placeholder:text-blue-400 outline-none focus:border-orange-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-3 transition-colors"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-blue-900/50 text-blue-300">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-blue-950/50 border border-blue-800/50 hover:bg-blue-900/70 text-white rounded-lg py-3 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-950/50 border border-blue-800/50 hover:bg-blue-900/70 text-white rounded-lg py-3 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          )}

          {/* Demo Login */}
          <div className="mt-4 pt-4 border-t border-blue-700">
            <p className="text-blue-300 text-xs text-center mb-2">Quick Demo Login:</p>
            <button
              type="button"
              onClick={() => onLogin({ name: 'Demo User', email: 'demo@radhagovind.com' })}
              className="w-full bg-blue-800/50 hover:bg-blue-800/70 border border-blue-700 text-blue-200 rounded-lg py-2 text-sm transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        <p className="text-center text-blue-300 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
