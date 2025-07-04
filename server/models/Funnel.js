import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['landing', 'form', 'checkout', 'email', 'upsell', 'community', 'analytics']
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

const funnelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Funnel name is required'],
    trim: true,
    maxlength: [100, 'Funnel name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  steps: [stepSchema],
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'archived'],
    default: 'draft'
  },
  template: {
    type: String,
    default: null
  },
  settings: {
    domain: String,
    customCss: String,
    analytics: {
      googleAnalytics: String,
      facebookPixel: String
    },
    integrations: [{
      type: String,
      config: mongoose.Schema.Types.Mixed
    }]
  },
  stats: {
    visitors: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    revenue: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate conversion rate before saving
funnelSchema.pre('save', function(next) {
  if (this.stats.visitors > 0) {
    this.stats.conversionRate = (this.stats.conversions / this.stats.visitors) * 100;
  }
  next();
});

export default mongoose.model('Funnel', funnelSchema);