import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Check,
  Plus,
  Settings,
  Zap,
  Mail,
  CreditCard,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Database
} from 'lucide-react';

const Integrations = () => {
  const categories = [
    { name: 'All', count: 24, active: true },
    { name: 'Email Marketing', count: 6, active: false },
    { name: 'Payment', count: 4, active: false },
    { name: 'Analytics', count: 5, active: false },
    { name: 'CRM', count: 4, active: false },
    { name: 'Communication', count: 5, active: false }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Mailchimp',
      description: 'Email marketing and automation platform',
      category: 'Email Marketing',
      rating: 4.8,
      users: '10k+',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Mail,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      connected: true,
      featured: true
    },
    {
      id: 2,
      name: 'Stripe',
      description: 'Online payment processing platform',
      category: 'Payment',
      rating: 4.9,
      users: '15k+',
      logo: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: CreditCard,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50',
      connected: true,
      featured: true
    },
    {
      id: 3,
      name: 'Google Analytics',
      description: 'Web analytics and reporting platform',
      category: 'Analytics',
      rating: 4.7,
      users: '20k+',
      logo: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: BarChart3,
      color: 'from-green-500 to-blue-500',
      bgColor: 'bg-green-50',
      connected: false,
      featured: true
    },
    {
      id: 4,
      name: 'HubSpot',
      description: 'CRM and marketing automation platform',
      category: 'CRM',
      rating: 4.6,
      users: '8k+',
      logo: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      connected: false,
      featured: false
    },
    {
      id: 5,
      name: 'Slack',
      description: 'Team communication and collaboration',
      category: 'Communication',
      rating: 4.8,
      users: '12k+',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      connected: true,
      featured: false
    },
    {
      id: 6,
      name: 'Calendly',
      description: 'Appointment scheduling and booking',
      category: 'Communication',
      rating: 4.5,
      users: '5k+',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      connected: false,
      featured: false
    },
    {
      id: 7,
      name: 'Zapier',
      description: 'Automation platform connecting apps',
      category: 'Automation',
      rating: 4.7,
      users: '18k+',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Zap,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50',
      connected: false,
      featured: true
    },
    {
      id: 8,
      name: 'Airtable',
      description: 'Database and project management platform',
      category: 'Database',
      rating: 4.4,
      users: '6k+',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
      icon: Database,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      connected: false,
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Integrations</h1>
          <p className="text-slate-600">Connect your favorite tools to supercharge your funnels.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search integrations..."
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

      {/* Connected Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Connected Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.filter(integration => integration.connected).map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${integration.bgColor}`}>
                    <integration.icon className={`h-6 w-6 bg-gradient-to-r ${integration.color} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                    <p className="text-sm text-slate-500">{integration.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">{integration.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-600">{integration.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">{integration.users} users</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
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

      {/* Available Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${integration.bgColor}`}>
                    <integration.icon className={`h-6 w-6 bg-gradient-to-r ${integration.color} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                    <p className="text-sm text-slate-500">{integration.category}</p>
                  </div>
                </div>
                {integration.featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">{integration.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-600">{integration.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">{integration.users} users</span>
                </div>
                {integration.connected && (
                  <div className="flex items-center space-x-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Connected</span>
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  integration.connected
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {integration.connected ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Configure</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Connect</span>
                  </div>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Integrations;