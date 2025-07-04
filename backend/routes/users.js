import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone, bio } = req.body;

    // Validate required fields
    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name are required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        firstName: firstName.trim(), 
        lastName: lastName.trim(), 
        phone: phone?.trim(), 
        bio: bio?.trim() 
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ Profile updated successfully for:', user.email);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        plan: user.plan,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/users/password
// @desc    Update user password
// @access  Private
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    console.log('✅ Password updated successfully for:', user.email);

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('❌ Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const Funnel = (await import('../models/Funnel.js')).default;
    const Analytics = (await import('../models/Analytics.js')).default;

    // Get user's funnel count by status
    const funnelStats = await Funnel.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get total analytics for user
    const analyticsStats = await Analytics.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: null,
          totalVisitors: { $sum: '$metrics.visitors' },
          totalConversions: { $sum: '$metrics.conversions' },
          totalRevenue: { $sum: '$metrics.revenue' }
        }
      }
    ]);

    const stats = {
      funnels: funnelStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, { draft: 0, active: 0, paused: 0, archived: 0 }),
      analytics: analyticsStats[0] || {
        totalVisitors: 0,
        totalConversions: 0,
        totalRevenue: 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('❌ Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;