import express from 'express';
import Funnel from '../models/Funnel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/funnels
// @desc    Get all funnels for authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { user: req.user.id };
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const funnels = await Funnel.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Funnel.countDocuments(query);

    res.json({
      success: true,
      count: funnels.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: funnels
    });
  } catch (error) {
    console.error('❌ Get funnels error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch funnels',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/funnels/:id
// @desc    Get single funnel by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
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

    res.json({
      success: true,
      data: funnel
    });
  } catch (error) {
    console.error('❌ Get funnel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch funnel',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/funnels
// @desc    Create new funnel
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, steps = [], template, settings = {} } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Funnel name is required'
      });
    }

    // Create funnel data
    const funnelData = {
      name: name.trim(),
      description: description?.trim(),
      user: req.user.id,
      steps: steps.map((step, index) => ({
        ...step,
        order: index + 1,
        id: step.id || `step-${Date.now()}-${index}`
      })),
      template,
      settings: {
        ...settings,
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
          fontFamily: 'Inter',
          ...settings.theme
        }
      }
    };

    const funnel = await Funnel.create(funnelData);

    console.log('✅ Funnel created successfully:', funnel.name);

    res.status(201).json({
      success: true,
      message: 'Funnel created successfully',
      data: funnel
    });
  } catch (error) {
    console.error('❌ Create funnel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create funnel',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/funnels/:id
// @desc    Update funnel
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let funnel = await Funnel.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!funnel) {
      return res.status(404).json({
        success: false,
        message: 'Funnel not found'
      });
    }

    // Update steps with proper ordering
    if (req.body.steps) {
      req.body.steps = req.body.steps.map((step, index) => ({
        ...step,
        order: index + 1,
        id: step.id || `step-${Date.now()}-${index}`
      }));
    }

    funnel = await Funnel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    console.log('✅ Funnel updated successfully:', funnel.name);

    res.json({
      success: true,
      message: 'Funnel updated successfully',
      data: funnel
    });
  } catch (error) {
    console.error('❌ Update funnel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update funnel',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/funnels/:id
// @desc    Delete funnel
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
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

    await Funnel.findByIdAndDelete(req.params.id);

    console.log('✅ Funnel deleted successfully:', funnel.name);

    res.json({
      success: true,
      message: 'Funnel deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete funnel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete funnel',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/funnels/:id/publish
// @desc    Publish/unpublish funnel
// @access  Private
router.put('/:id/publish', auth, async (req, res) => {
  try {
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

    // Toggle publish status
    funnel.isPublished = !funnel.isPublished;
    funnel.status = funnel.isPublished ? 'active' : 'draft';
    
    if (funnel.isPublished) {
      funnel.publishedAt = new Date();
    }

    await funnel.save();

    console.log(`✅ Funnel ${funnel.isPublished ? 'published' : 'unpublished'}:`, funnel.name);

    res.json({
      success: true,
      message: `Funnel ${funnel.isPublished ? 'published' : 'unpublished'} successfully`,
      data: funnel
    });
  } catch (error) {
    console.error('❌ Publish funnel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update funnel status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/funnels/:id/duplicate
// @desc    Duplicate funnel
// @access  Private
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const originalFunnel = await Funnel.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!originalFunnel) {
      return res.status(404).json({
        success: false,
        message: 'Funnel not found'
      });
    }

    // Create duplicate
    const duplicateData = {
      ...originalFunnel.toObject(),
      _id: undefined,
      name: `${originalFunnel.name} (Copy)`,
      isPublished: false,
      publishedAt: undefined,
      slug: undefined,
      stats: {
        visitors: 0,
        conversions: 0,
        revenue: 0,
        conversionRate: 0
      },
      createdAt: undefined,
      updatedAt: undefined
    };

    const duplicateFunnel = await Funnel.create(duplicateData);

    console.log('✅ Funnel duplicated successfully:', duplicateFunnel.name);

    res.status(201).json({
      success: true,
      message: 'Funnel duplicated successfully',
      data: duplicateFunnel
    });
  } catch (error) {
    console.error('❌ Duplicate funnel error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate funnel',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;