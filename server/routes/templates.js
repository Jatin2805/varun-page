import express from 'express';
import Template from '../models/Template.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all templates
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    let query = { isActive: true };

    if (category && category !== 'All Templates') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const templates = await Template.find(query)
      .sort({ featured: -1, downloads: -1 })
      .populate('createdBy', 'firstName lastName');

    res.json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/templates/:id
// @desc    Get single template
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
      .populate('createdBy', 'firstName lastName');

    if (!template) {
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/templates/:id/use
// @desc    Use template (increment download count)
// @access  Private
router.post('/:id/use', auth, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Increment download count
    template.downloads += 1;
    await template.save();

    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;