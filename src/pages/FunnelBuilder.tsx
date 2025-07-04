import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Plus, 
  Settings, 
  Eye, 
  Save, 
  Play,
  MousePointer,
  FileText,
  CreditCard,
  Mail,
  Gift,
  Users,
  BarChart3,
  Trash2,
  Copy,
  Edit3
} from 'lucide-react';

interface FunnelStep {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const FunnelBuilder = () => {
  const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([
    {
      id: '1',
      type: 'landing',
      title: 'Landing Page',
      description: 'Capture visitor attention',
      icon: MousePointer,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '2',
      type: 'form',
      title: 'Lead Capture',
      description: 'Collect contact information',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '3',
      type: 'checkout',
      title: 'Checkout',
      description: 'Process payment',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]);

  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const availableSteps = [
    { type: 'landing', title: 'Landing Page', icon: MousePointer, color: 'text-blue-600' },
    { type: 'form', title: 'Lead Form', icon: FileText, color: 'text-green-600' },
    { type: 'checkout', title: 'Checkout', icon: CreditCard, color: 'text-purple-600' },
    { type: 'email', title: 'Email Sequence', icon: Mail, color: 'text-orange-600' },
    { type: 'upsell', title: 'Upsell Page', icon: Gift, color: 'text-pink-600' },
    { type: 'community', title: 'Community', icon: Users, color: 'text-indigo-600' },
    { type: 'analytics', title: 'Analytics', icon: BarChart3, color: 'text-slate-600' }
  ];

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(funnelSteps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFunnelSteps(items);
  };

  const addStep = (stepType: string) => {
    const stepTemplate = availableSteps.find(step => step.type === stepType);
    if (!stepTemplate) return;

    const newStep: FunnelStep = {
      id: Date.now().toString(),
      type: stepTemplate.type,
      title: stepTemplate.title,
      description: 'Configure this step',
      icon: stepTemplate.icon,
      color: stepTemplate.color,
      bgColor: `bg-${stepTemplate.color.split('-')[1]}-50`
    };

    setFunnelSteps([...funnelSteps, newStep]);
  };

  const removeStep = (stepId: string) => {
    setFunnelSteps(funnelSteps.filter(step => step.id !== stepId));
  };

  const duplicateStep = (step: FunnelStep) => {
    const newStep = {
      ...step,
      id: Date.now().toString(),
      title: `${step.title} (Copy)`
    };
    const stepIndex = funnelSteps.findIndex(s => s.id === step.id);
    const newSteps = [...funnelSteps];
    newSteps.splice(stepIndex + 1, 0, newStep);
    setFunnelSteps(newSteps);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar - Step Library */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-80 bg-white border-r border-slate-200 p-6 overflow-y-auto"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Funnel Steps</h2>
          <p className="text-sm text-slate-600">Drag and drop to build your funnel</p>
        </div>

        <div className="space-y-3">
          {availableSteps.map((step, index) => (
            <motion.div
              key={step.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => addStep(step.type)}
              className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
            >
              <div className={`p-2 rounded-lg bg-slate-100 group-hover:bg-white transition-colors duration-200`}>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>
              <div>
                <p className="font-medium text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-600">Click to add</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-2">Pro Tip</h3>
          <p className="text-sm text-slate-600">
            Start with a landing page to capture attention, then add forms and checkout steps to convert visitors.
          </p>
        </div>
      </motion.div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-b border-slate-200 p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-slate-900">Funnel Builder</h1>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Steps: {funnelSteps.length}</span>
              <span>•</span>
              <span>Last saved: 2 minutes ago</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <Play className="h-4 w-4" />
              <span>Publish</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Canvas */}
        <div className="flex-1 p-8 bg-slate-50 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="funnel-steps">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-6"
                  >
                    <AnimatePresence>
                      {funnelSteps.map((step, index) => (
                        <Draggable key={step.id} draggableId={step.id} index={index}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className={`relative ${snapshot.isDragging ? 'z-50' : ''}`}
                            >
                              <div className="flex items-center space-x-4">
                                {/* Step Number */}
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                  {index + 1}
                                </div>

                                {/* Step Card */}
                                <div 
                                  className={`flex-1 bg-white rounded-xl border-2 transition-all duration-200 ${
                                    selectedStep === step.id 
                                      ? 'border-blue-500 shadow-lg' 
                                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                                  }`}
                                  onClick={() => setSelectedStep(step.id)}
                                >
                                  <div className="p-6">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <div 
                                          {...provided.dragHandleProps}
                                          className={`p-3 rounded-xl ${step.bgColor} cursor-grab active:cursor-grabbing`}
                                        >
                                          <step.icon className={`h-6 w-6 ${step.color}`} />
                                        </div>
                                        <div>
                                          <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                                          <p className="text-slate-600">{step.description}</p>
                                        </div>
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            duplicateStep(step);
                                          }}
                                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                        >
                                          <Copy className="h-4 w-4" />
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                        >
                                          <Edit3 className="h-4 w-4" />
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                                        >
                                          <Settings className="h-4 w-4" />
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeStep(step.id);
                                          }}
                                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </motion.button>
                                      </div>
                                    </div>

                                    {selectedStep === step.id && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 pt-4 border-t border-slate-200"
                                      >
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                              Step Title
                                            </label>
                                            <input
                                              type="text"
                                              value={step.title}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                              Description
                                            </label>
                                            <input
                                              type="text"
                                              value={step.description}
                                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Connection Arrow */}
                              {index < funnelSteps.length - 1 && (
                                <div className="flex justify-center my-4">
                                  <div className="w-px h-8 bg-slate-300"></div>
                                  <div className="absolute w-2 h-2 bg-slate-300 rounded-full transform translate-y-3"></div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}

                    {/* Add Step Button */}
                    {funnelSteps.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Start Building Your Funnel</h3>
                        <p className="text-slate-600 mb-6">Add your first step from the sidebar to get started</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="flex justify-center"
                      >
                        <button className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all duration-200 text-slate-600 hover:text-blue-600">
                          <Plus className="h-5 w-5" />
                          <span>Add Another Step</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelBuilder;