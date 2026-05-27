import React, { useState } from 'react';
import { Lock, User, ShieldAlert } from 'lucide-react';
import { SEO } from '../components/SEO';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
      const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

      if (username === expectedUsername && password === expectedPassword) {
        sessionStorage.setItem('hecate_admin_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hecate-cream px-4 relative overflow-hidden font-sans">
      <SEO pageKey="admin" />
      {/* Decorative ambient glowing background circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-hecate-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-hecate-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo or Brand Label */}
        <div className="text-center mb-8">
          <span className="text-3xl font-serif font-bold text-hecate-primary tracking-tight">
            hecate
          </span>
          <p className="text-xs uppercase tracking-widest text-hecate-muted mt-1 font-medium">
            Management Portal
          </p>
        </div>

        {/* Glassmorphic Login Form */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-hecate-border/60">
          <h2 className="text-xl font-serif font-bold text-hecate-primary text-center mb-6">
            Admin Authenticator
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5 text-red-800 text-xs mb-5">
              <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-sm">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-hecate-text mb-1">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-hecate-muted pointer-events-none">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm text-hecate-text"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-hecate-text mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-hecate-muted pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-hecate-border bg-hecate-ivory focus:outline-none focus:ring-2 focus:ring-hecate-secondary/20 focus:border-hecate-secondary transition-colors font-light text-sm text-hecate-text"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-sm uppercase tracking-wider font-semibold mt-6 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-hecate-muted hover:text-hecate-secondary transition-colors"
          >
            ← Back to Hecate Storefront
          </a>
        </div>
      </div>
    </div>
  );
};
