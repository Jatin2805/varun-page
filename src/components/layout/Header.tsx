import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Settings,
  HelpCircle,
  ChevronDown,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </motion.button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search funnels, templates..."
              className="pl-10 pr-4 py-2 w-80 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
          >
            <HelpCircle className="h-5 w-5 text-slate-600" />
          </motion.button>

          <div className="relative group">
            <div className="flex items-center space-x-3 bg-slate-100 rounded-xl px-3 py-2 hover:bg-slate-200 transition-colors duration-200 cursor-pointer">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-700">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500">{user?.plan} Plan</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button
                onClick={logout}
                className="w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 text-slate-500" />
                <span className="text-slate-700">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;