import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  Plus,
  ArrowUpRight,
  BarChart3,
  Zap,
  Target,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Conversions',
      value: '2,847',
      change: '+8.2%',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Visitors',
      value: '12,459',
      change: '+15.3%',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Page Views',
      value: '89,432',
      change: '+23.1%',
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentFunnels = [
    { name: 'E-commerce Checkout', status: 'Active', conversions: '12.4%', revenue: '$8,450' },
    { name: 'Lead Generation', status: 'Active', conversions: '8.7%', revenue: '$3,200' },
    { name: 'Product Launch', status: 'Draft', conversions: '0%', revenue: '$0' },
    { name: 'Newsletter Signup', status: 'Active', conversions: '15.2%', revenue: '$1,800' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with your funnels.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Funnel</span>
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-slate-600 text-sm">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-slate-400" />
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-xl flex items-end justify-center">
            <div className="text-slate-400 text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <p>Chart visualization would go here</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200 text-left">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Create Funnel</p>
                <p className="text-sm text-slate-600">Start from scratch</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-200 text-left">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Use Template</p>
                <p className="text-sm text-slate-600">Choose from library</p>
              </div>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200 text-left">
              <div className="p-2 bg-green-600 rounded-lg">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">View Analytics</p>
                <p className="text-sm text-slate-600">Check performance</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Funnels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent Funnels</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Conversion Rate</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentFunnels.map((funnel, index) => (
                <motion.tr
                  key={funnel.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900">{funnel.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      funnel.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {funnel.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-900">{funnel.conversions}</td>
                  <td className="py-4 px-4 font-medium text-slate-900">{funnel.revenue}</td>
                  <td className="py-4 px-4 text-slate-600 flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>2 hours ago</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;