import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Workflow, BarChart3, BookTemplate as FileTemplate, Puzzle, Settings, Zap, X, Crown, TrendingUp } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', color: 'text-blue-600' },
    { icon: Workflow, label: 'Funnel Builder', path: '/builder', color: 'text-purple-600' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'text-green-600' },
    { icon: FileTemplate, label: 'Templates', path: '/templates', color: 'text-orange-600' },
    { icon: Puzzle, label: 'Integrations', path: '/integrations', color: 'text-pink-600' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'text-slate-600' },
  ];

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-white/90 backdrop-blur-xl border-r border-slate-200/60 shadow-xl"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FunnelBuilder
              </h1>
              <p className="text-xs text-slate-500">Pro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm'
                      : 'hover:bg-slate-50 hover:shadow-sm'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      className={`h-5 w-5 transition-colors duration-200 ${
                        isActive ? item.color : 'text-slate-500 group-hover:text-slate-700'
                      }`} 
                    />
                    <span 
                      className={`font-medium transition-colors duration-200 ${
                        isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Upgrade Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="p-4 mx-4 mb-6"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-sm text-blue-100 mb-3">
              Unlock advanced features and unlimited funnels
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Upgrade Now
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="px-4 pb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">This Month</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Conversions</span>
                <span className="font-medium text-slate-900">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Revenue</span>
                <span className="font-medium text-slate-900">$12,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;