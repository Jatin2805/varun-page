import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  BarChart3,
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Conversion Rate',
      value: '8.4%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Visitors',
      value: '45,231',
      change: '-3.2%',
      trend: 'down',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Page Views',
      value: '189,432',
      change: '+15.3%',
      trend: 'up',
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const funnelData = [
    { name: 'E-commerce Checkout', visitors: 12450, conversions: 1547, rate: '12.4%', revenue: '$45,230' },
    { name: 'Lead Generation', visitors: 8930, conversions: 777, rate: '8.7%', revenue: '$23,100' },
    { name: 'Product Launch', visitors: 5670, conversions: 862, rate: '15.2%', revenue: '$67,890' },
    { name: 'Newsletter Signup', visitors: 15230, conversions: 2134, rate: '14.0%', revenue: '$12,450' }
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-600">Track your funnel performance and optimize conversions.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
          >
            <Calendar className="h-4 w-4 text-slate-600" />
            <span className="text-slate-700">Last 30 days</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
          >
            <Filter className="h-4 w-4 text-slate-600" />
            <span className="text-slate-700">Filter</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </motion.button>
        </div>
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
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Revenue Trends</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-slate-400" />
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Revenue</option>
                <option>Conversions</option>
                <option>Visitors</option>
              </select>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-xl flex items-end justify-center">
            <div className="text-slate-400 text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <p>Chart visualization would go here</p>
              <p className="text-xs mt-1">Connect your analytics service to see real data</p>
            </div>
          </div>
        </motion.div>

        {/* Top Performing Funnels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {funnelData.slice(0, 3).map((funnel, index) => (
              <div key={funnel.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{funnel.name}</p>
                  <p className="text-xs text-slate-600">{funnel.visitors} visitors</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 text-sm">{funnel.rate}</p>
                  <p className="text-xs text-green-600">{funnel.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Funnel Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Funnel Performance</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Funnel Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Visitors</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Rate</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {funnelData.map((funnel, index) => (
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
                  <td className="py-4 px-4 text-slate-900">{funnel.visitors.toLocaleString()}</td>
                  <td className="py-4 px-4 text-slate-900">{funnel.conversions.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {funnel.rate}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-900">{funnel.revenue}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;