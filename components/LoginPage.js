'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === 'admin@mail.com' && password === 'adminpass@57') {
      console.log('Login successful - Redirecting to dashboard');
      router.push('/admin/dashboard');
    } else {
      console.log('Invalid credentials');
      // Optional: Add toast or alert for failure
      alert('Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-900 via-amber-800 to-yellow-900 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/AdminLognBG.png')",
      }}
    >
      {/* Optional subtle overlay for modern depth */}
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="w-full max-w-md mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 relative z-10 transform transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600 text-sm">Enter your credentials to access the dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 bg-gray-50/50"
              placeholder="admin@mail.com"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 bg-gray-50/50"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <FiLock className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 text-lg" />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-linear-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>
        
        <p className="mt-6 text-center">
          <a href="#" className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors duration-200">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;