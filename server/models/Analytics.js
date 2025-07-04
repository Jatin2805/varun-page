import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  funnel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Funnel',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  metrics: {
    visitors: {
      type: Number,
      default: 0
    },
    pageViews: {
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
    bounceRate: {
      type: Number,
      default: 0
    },
    avgSessionDuration: {
      type: Number,
      default: 0
    }
  },
  stepAnalytics: [{
    stepId: String,
    stepType: String,
    visitors: Number,
    conversions: Number,
    dropoffRate: Number
  }],
  trafficSources: [{
    source: String,
    visitors: Number,
    conversions: Number
  }],
  deviceBreakdown: {
    desktop: Number,
    mobile: Number,
    tablet: Number
  },
  geoData: [{
    country: String,
    visitors: Number,
    conversions: Number
  }]
}, {
  timestamps: true
});

// Index for efficient querying
analyticsSchema.index({ funnel: 1, date: 1 });
analyticsSchema.index({ user: 1, date: 1 });

export default mongoose.model('Analytics', analyticsSchema);