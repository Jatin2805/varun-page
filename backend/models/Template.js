import mongoose from 'mongoose';

const templateStepSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['landing', 'form', 'checkout', 'email', 'upsell', 'community', 'analytics', 'thank-you']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  order: {
    type: Number,
    required: true
  }
});

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Template description is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['E-commerce', 'Lead Generation', 'SaaS', 'Education', 'Marketing', 'Healthcare', 'Real Estate', 'Consulting']
  },
  preview: {
    type: String,
    required: true
  },
  steps: [templateStepSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  downloads: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedTime: {
    type: String,
    default: '30 minutes'
  }
}, {
  timestamps: true
});

// Index for search functionality
templateSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Template', templateSchema);