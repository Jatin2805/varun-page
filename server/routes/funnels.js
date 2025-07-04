import express from 'express';
import Funnel from '../models/Funnel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/funnels
// @desc    Get all funnels for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const funnels = await Funnel.find({ user: req.user.id })
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: funnels.length,
      data: funnels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/funnels/:id
// @desc    Get single funnel
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/funnels
// @desc    Create new funnel
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const funnelData = {
      ...req.body,
      user: req.user.id
    };

    const funnel = await Funnel.create(funnelData);

    res.status(201).json({
      success: true,
      data: funnel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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

    funnel = await Funnel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: funnel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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

    res.json({
      success: true,
      message: 'Funnel deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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

    funnel.isPublished = !funnel.isPublished;
    funnel.status = funnel.isPublished ? 'active' : 'draft';
    if (funnel.isPublished) {
      funnel.publishedAt = new Date();
    }

    await funnel.save();

    res.json({
      success: true,
      data: funnel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;