import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FunnelBuilder from './pages/FunnelBuilder';
import Analytics from './pages/Analytics';
import Templates from './pages/Templates';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/builder" element={<FunnelBuilder />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </motion.div>
      </Layout>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;