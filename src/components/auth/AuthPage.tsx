import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Marketing content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Build High-Converting
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Marketing Funnels
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Create, optimize, and scale your marketing funnels with our powerful drag-and-drop builder. 
            Turn visitors into customers with proven templates and advanced analytics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Easy Builder</h3>
              <p className="text-sm text-slate-600">Drag & drop interface</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Analytics</h3>
              <p className="text-sm text-slate-600">Track performance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Integrations</h3>
              <p className="text-sm text-slate-600">Connect your tools</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Auth forms */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;