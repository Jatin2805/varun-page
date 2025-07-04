import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { testConnection } from '../../services/api';

const ConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    status: 'testing' | 'success' | 'error';
    message: string;
    details?: any;
  }>({
    status: 'testing',
    message: 'Testing connection...'
  });

  const runConnectionTest = async () => {
    setConnectionStatus({ status: 'testing', message: 'Testing connection...' });
    
    const result = await testConnection();
    
    if (result.success) {
      setConnectionStatus({
        status: 'success',
        message: 'API connection successful!',
        details: result.data
      });
    } else {
      setConnectionStatus({
        status: 'error',
        message: 'API connection failed',
        details: result.error
      });
    }
  };

  useEffect(() => {
    runConnectionTest();
  }, []);

  const getStatusIcon = () => {
    switch (connectionStatus.status) {
      case 'testing':
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus.status) {
      case 'testing':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-yellow-200 bg-yellow-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border-2 ${getStatusColor()} transition-all duration-200`}
    >
      <div className="flex items-center space-x-3 mb-3">
        {getStatusIcon()}
        <h3 className="font-semibold text-slate-900">API Connection Status</h3>
        <button
          onClick={runConnectionTest}
          className="ml-auto px-3 py-1 text-sm bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
      
      <p className="text-slate-700 mb-2">{connectionStatus.message}</p>
      
      {connectionStatus.details && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800">
            View Details
          </summary>
          <pre className="mt-2 p-3 bg-white rounded border text-xs overflow-auto">
            {JSON.stringify(connectionStatus.details, null, 2)}
          </pre>
        </details>
      )}
      
      <div className="mt-3 text-xs text-slate-500">
        <p>API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</p>
        <p>Environment: {import.meta.env.MODE}</p>
      </div>
    </motion.div>
  );
};

export default ConnectionTest;