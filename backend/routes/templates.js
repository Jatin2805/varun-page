import express from 'express';
import Template from '../models/Template.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all templates with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      search, 
      difficulty,
      page = 1, 
      limit = 12 
    } = req.query;
    
    // Build query
    let query = { isActive: true };

    if (category && category !== 'All Templates') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const templates = await Template.find(query)
      .sort({ featured: -1, downloads: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'firstName lastName');

    const total = await Template.countDocuments(query);

    res.json({
      success: true,
      count: templates.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: templates
    });
  } catch (error) {
    console.error('❌ Get templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/templates/categories
// @desc    Get template categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Template.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const totalCount = await Template.countDocuments({ isActive: true });

    const result = [
      { name: 'All Templates', count: totalCount },
      ...categories.map(cat => ({ name: cat._id, count: cat.count }))
    ];

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('❌ Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/templates/:id
// @desc    Get single template by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
      .populate('createdBy', 'firstName lastName');

    if (!template || !template.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('❌ Get template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/templates/:id/use
// @desc    Use template (increment download count and create funnel)
// @access  Private
router.post('/:id/use', auth, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template || !template.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Increment download count
    template.downloads += 1;
    await template.save();

    // Create funnel from template
    const Funnel = (await import('../models/Funnel.js')).default;
    
    const funnelData = {
      name: `${template.name} - ${new Date().toLocaleDateString()}`,
      description: template.description,
      user: req.user.id,
      template: template._id,
      steps: template.steps.map((step, index) => ({
        id: `step-${Date.now()}-${index}`,
        type: step.type,
        title: step.title,
        description: step.description,
        settings: step.settings,
        order: step.order || index + 1,
        isActive: true
      })),
      settings: {
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#8B5CF6',
          fontFamily: 'Inter'
        }
      }
    };

    const funnel = await Funnel.create(funnelData);

    console.log('✅ Template used successfully:', template.name);

    res.json({
      success: true,
      message: 'Template used successfully',
      data: {
        template,
        funnel
      }
    });
  } catch (error) {
    console.error('❌ Use template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to use template',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/templates/featured/list
// @desc    Get featured templates
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const templates = await Template.find({ 
      isActive: true, 
      featured: true 
    })
    .sort({ downloads: -1 })
    .limit(6)
    .populate('createdBy', 'firstName lastName');

    res.json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    console.error('❌ Get featured templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured templates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;