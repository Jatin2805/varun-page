const express = require('express');
const Analytics = require('../models/Analytics');
const Funnel = require('../models/Funnel');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
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
          totalRevenue: { $sum: '$metrics.revenue' }
        }
      }
    ]);

    const stats = analytics[0] || {
      totalVisitors: 0,
      totalPageViews: 0,
      totalConversions: 0,
      totalRevenue: 0
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
          revenue: { $sum: '$metrics.revenue' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalRevenue: stats.totalRevenue,
          totalVisitors: stats.totalVisitors,
          totalConversions: stats.totalConversions,
          totalPageViews: stats.totalPageViews,
          conversionRate: parseFloat(conversionRate)
        },
        dailyAnalytics,
        period: days
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/analytics/track
// @desc    Track analytics event
// @access  Public (for tracking)
router.post('/track', async (req, res) => {
  try {
    const { funnelId, event, data } = req.body;

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
          revenue: 0
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
          analytics.metrics.revenue += data.revenue;
        }
        break;
    }

    await analytics.save();

    // Update funnel stats
    await Funnel.findByIdAndUpdate(funnelId, {
      $inc: {
        'stats.visitors': event === 'visitor' ? 1 : 0,
        'stats.conversions': event === 'conversion' ? 1 : 0,
        'stats.revenue': event === 'conversion' && data.revenue ? data.revenue : 0
      }
    });

    res.json({
      success: true,
      message: 'Event tracked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;