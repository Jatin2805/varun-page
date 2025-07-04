import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Download,
  ShoppingCart,
  Mail,
  Users,
  Zap,
  TrendingUp,
  Heart,
  BookOpen
} from 'lucide-react';

const Templates = () => {
  const categories = [
    { name: 'All Templates', count: 24, active: true },
    { name: 'E-commerce', count: 8, active: false },
    { name: 'Lead Generation', count: 6, active: false },
    { name: 'SaaS', count: 4, active: false },
    { name: 'Education', count: 3, active: false },
    { name: 'Marketing', count: 3, active: false }
  ];

  const templates = [
    {
      id: 1,
      name: 'E-commerce Checkout Flow',
      description: 'Complete checkout funnel with cart abandonment recovery',
      category: 'E-commerce',
      rating: 4.8,
      downloads: 1247,
      preview: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      featured: true
    },
    {
      id: 2,
      name: 'Lead Magnet Funnel',
      description: 'High-converting lead capture with email sequence',
      category: 'Lead Generation',
      rating: 4.9,
      downloads: 892,
      preview: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Mail,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      featured: false
    },
    {
      id: 3,
      name: 'SaaS Trial Signup',
      description: 'Free trial funnel with onboarding sequence',
      category: 'SaaS',
      rating: 4.7,
      downloads: 634,
      preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      featured: true
    },
    {
      id: 4,
      name: 'Webinar Registration',
      description: 'Complete webinar funnel with automated follow-up',
      category: 'Education',
      rating: 4.6,
      downloads: 445,
      preview: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      featured: false
    },
    {
      id: 5,
      name: 'Product Launch',
      description: 'Pre-launch buzz building and launch day funnel',
      category: 'Marketing',
      rating: 4.8,
      downloads: 723,
      preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      featured: true
    },
    {
      id: 6,
      name: 'Course Sales Funnel',
      description: 'Educational content sales with payment processing',
      category: 'Education',
      rating: 4.5,
      downloads: 356,
      preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: BookOpen,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      featured: false
    }
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Templates</h1>
          <p className="text-slate-600">Choose from our collection of proven funnel templates.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="pl-10 pr-4 py-2 w-64 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
          >
            <Filter className="h-4 w-4 text-slate-600" />
            <span className="text-slate-700">Filter</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              category.active
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {category.name} ({category.count})
          </motion.button>
        ))}
      </motion.div>

      {/* Featured Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.filter(template => template.featured).map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200">
                    <Heart className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${template.bgColor}`}>
                    <template.icon className={`h-5 w-5 bg-gradient-to-r ${template.color} bg-clip-text text-transparent`} />
                  </div>
                  <span className="text-sm text-slate-500">{template.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700">{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">{template.downloads}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Use Template
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4 text-slate-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* All Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">All Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {template.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200">
                    <Heart className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${template.bgColor}`}>
                    <template.icon className={`h-5 w-5 bg-gradient-to-r ${template.color} bg-clip-text text-transparent`} />
                  </div>
                  <span className="text-sm text-slate-500">{template.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700">{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">{template.downloads}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Use Template
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4 text-slate-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Templates;