const mongoose = require('mongoose');

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
    enum: ['E-commerce', 'Lead Generation', 'SaaS', 'Education', 'Marketing', 'Healthcare', 'Real Estate']
  },
  preview: {
    type: String,
    required: true
  },
  steps: [{
    type: {
      type: String,
      required: true
    },
    title: String,
    description: String,
    settings: mongoose.Schema.Types.Mixed
  }],
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Template', templateSchema);