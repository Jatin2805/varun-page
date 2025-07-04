import express from 'express';
import Analytics from '../models/Analytics.js';
import Funnel from '../models/Funnel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics for user
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get user's funnels
    const funnels = await Funnel.find({ user: req.user.id });
    const funnelIds = funnels.map(f => f._id);

    // Aggregate analytics data
    const analytics = await Analytics.aggregate([
      {
        $match: {
          user: req.user.id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalVisitors: { $sum: '$metrics.visitors' },
          totalPageViews: { $sum: '$metrics.pageViews' },
          totalConversions: { $sum: '$metrics.conversions' },
          totalRevenue: { $sum: '$metrics.revenue' },
          avgBounceRate: { $avg: '$metrics.bounceRate' },
          avgSessionDuration: { $avg: '$metrics.avgSessionDuration' }
        }
      }
    ]);

    const stats = analytics[0] || {
      totalVisitors: 0,
      totalPageViews: 0,
      totalConversions: 0,
      totalRevenue: 0,
      avgBounceRate: 0,
      avgSessionDuration: 0
    };

    // Calculate conversion rate
    const conversionRate = stats.totalVisitors > 0 
      ? (stats.totalConversions / stats.totalVisitors * 100).toFixed(1)
      : 0;

    // Get daily analytics for chart
    const dailyAnalytics = await Analytics.aggregate([
      {
        $match: {
          user: req.user.id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          visitors: { $sum: '$metrics.visitors' },
          conversions: { $sum: '$metrics.conversions' },
          revenue: { $sum: '$metrics.revenue' },
          pageViews: { $sum: '$metrics.pageViews' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get top performing funnels
    const topFunnels = await Funnel.find({ user: req.user.id })
      .sort({ 'stats.conversionRate': -1 })
      .limit(5)
      .select('name stats');

    res.json({
      success: true,
      data: {
        stats: {
          totalRevenue: stats.totalRevenue,
          totalVisitors: stats.totalVisitors,
          totalConversions: stats.totalConversions,
          totalPageViews: stats.totalPageViews,
          conversionRate: parseFloat(conversionRate),
          avgBounceRate: stats.avgBounceRate,
          avgSessionDuration: stats.avgSessionDuration
        },
        dailyAnalytics,
        topFunnels,
        period: days
      }
    });
  } catch (error) {
    console.error('❌ Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/analytics/funnel/:id
// @desc    Get funnel-specific analytics
// @access  Private
router.get('/funnel/:id', auth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Verify funnel ownership
    const funnel = await Funnel.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!funnel) {
      return res.status(404).json({
        success: false,
        message: 'Funnel not found'
      });
    }

    // Get analytics for this funnel
    const analytics = await Analytics.find({
      funnel: req.params.id,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    // Aggregate funnel analytics
    const funnelStats = await Analytics.aggregate([
      {
        $match: {
          funnel: req.params.id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalVisitors: { $sum: '$metrics.visitors' },
          totalConversions: { $sum: '$metrics.conversions' },
          totalRevenue: { $sum: '$metrics.revenue' },
          avgBounceRate: { $avg: '$metrics.bounceRate' }
        }
      }
    ]);

    const stats = funnelStats[0] || {
      totalVisitors: 0,
      totalConversions: 0,
      totalRevenue: 0,
      avgBounceRate: 0
    };

    res.json({
      success: true,
      data: {
        funnel: {
          id: funnel._id,
          name: funnel.name,
          status: funnel.status
        },
        stats,
        analytics,
        period: days
      }
    });
  } catch (error) {
    console.error('❌ Funnel analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch funnel analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/analytics/track
// @desc    Track analytics event
// @access  Public (for tracking)
router.post('/track', async (req, res) => {
  try {
    const { funnelId, event, data = {} } = req.body;

    if (!funnelId || !event) {
      return res.status(400).json({
        success: false,
        message: 'funnelId and event are required'
      });
    }

    // Find the funnel
    const funnel = await Funnel.findById(funnelId);
    if (!funnel) {
      return res.status(404).json({
        success: false,
        message: 'Funnel not found'
      });
    }

    // Get today's analytics record
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let analytics = await Analytics.findOne({
      funnel: funnelId,
      user: funnel.user,
      date: today
    });

    if (!analytics) {
      analytics = new Analytics({
        funnel: funnelId,
        user: funnel.user,
        date: today,
        metrics: {
          visitors: 0,
          pageViews: 0,
          conversions: 0,
          revenue: 0,
          bounceRate: 0,
          avgSessionDuration: 0
        }
      });
    }

    // Update metrics based on event type
    switch (event) {
      case 'page_view':
        analytics.metrics.pageViews += 1;
        break;
      case 'visitor':
        analytics.metrics.visitors += 1;
        break;
      case 'conversion':
        analytics.metrics.conversions += 1;
        if (data.revenue) {
          analytics.metrics.revenue += parseFloat(data.revenue);
        }
        break;
      case 'bounce':
        // Update bounce rate calculation
        break;
      case 'session_duration':
        if (data.duration) {
          analytics.metrics.avgSessionDuration = 
            (analytics.metrics.avgSessionDuration + parseFloat(data.duration)) / 2;
        }
        break;
    }

    await analytics.save();

    // Update funnel stats
    const updateData = {};
    if (event === 'visitor') updateData['stats.visitors'] = funnel.stats.visitors + 1;
    if (event === 'conversion') {
      updateData['stats.conversions'] = funnel.stats.conversions + 1;
      if (data.revenue) {
        updateData['stats.revenue'] = funnel.stats.revenue + parseFloat(data.revenue);
      }
    }

    if (Object.keys(updateData).length > 0) {
      await Funnel.findByIdAndUpdate(funnelId, { $inc: updateData });
    }

    res.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error) {
    console.error('❌ Track event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track event',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;