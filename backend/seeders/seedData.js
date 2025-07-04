import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from '../models/Template.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config({ path: '../.env' });

const templates = [
  {
    name: 'E-commerce Checkout Flow',
    description: 'Complete checkout funnel with cart abandonment recovery and upsells',
    category: 'E-commerce',
    preview: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    steps: [
      {
        type: 'landing',
        title: 'Product Landing Page',
        description: 'Showcase your product with compelling copy and visuals',
        settings: { template: 'product-showcase' },
        order: 1
      },
      {
        type: 'checkout',
        title: 'Checkout Page',
        description: 'Secure payment processing with multiple payment options',
        settings: { paymentMethods: ['stripe', 'paypal'] },
        order: 2
      },
      {
        type: 'upsell',
        title: 'Order Bump',
        description: 'Increase average order value with relevant upsells',
        settings: { upsellType: 'order-bump' },
        order: 3
      },
      {
        type: 'thank-you',
        title: 'Thank You Page',
        description: 'Confirmation and next steps',
        settings: {},
        order: 4
      }
    ],
    rating: 4.8,
    downloads: 1247,
    featured: true,
    tags: ['ecommerce', 'checkout', 'upsell', 'conversion'],
    difficulty: 'intermediate',
    estimatedTime: '45 minutes'
  },
  {
    name: 'Lead Magnet Funnel',
    description: 'High-converting lead capture with automated email sequence',
    category: 'Lead Generation',
    preview: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    steps: [
      {
        type: 'landing',
        title: 'Lead Magnet Landing Page',
        description: 'Compelling offer to capture email addresses',
        settings: { template: 'lead-capture' },
        order: 1
      },
      {
        type: 'form',
        title: 'Email Capture Form',
        description: 'Simple form to collect contact information',
        settings: { fields: ['email', 'firstName'] },
        order: 2
      },
      {
        type: 'email',
        title: 'Welcome Email Sequence',
        description: 'Automated email nurture sequence',
        settings: { sequenceLength: 5 },
        order: 3
      },
      {
        type: 'thank-you',
        title: 'Download Page',
        description: 'Deliver the lead magnet',
        settings: {},
        order: 4
      }
    ],
    rating: 4.9,
    downloads: 892,
    featured: true,
    tags: ['lead-generation', 'email-marketing', 'automation'],
    difficulty: 'beginner',
    estimatedTime: '30 minutes'
  },
  {
    name: 'SaaS Trial Signup',
    description: 'Free trial funnel with onboarding and conversion sequence',
    category: 'SaaS',
    preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    steps: [
      {
        type: 'landing',
        title: 'SaaS Landing Page',
        description: 'Feature-focused landing page with trial CTA',
        settings: { template: 'saas-trial' },
        order: 1
      },
      {
        type: 'form',
        title: 'Trial Signup Form',
        description: 'Collect user information for trial account',
        settings: { fields: ['email', 'company', 'phone'] },
        order: 2
      },
      {
        type: 'email',
        title: 'Onboarding Sequence',
        description: 'Guide users through product features',
        settings: { sequenceLength: 7 },
        order: 3
      }
    ],
    rating: 4.7,
    downloads: 634,
    featured: true,
    tags: ['saas', 'trial', 'onboarding', 'conversion'],
    difficulty: 'intermediate',
    estimatedTime: '60 minutes'
  },
  {
    name: 'Webinar Registration',
    description: 'Complete webinar funnel with automated follow-up sequences',
    category: 'Education',
    preview: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    steps: [
      {
        type: 'landing',
        title: 'Webinar Registration Page',
        description: 'Compelling webinar registration page',
        settings: { template: 'webinar-registration' },
        order: 1
      },
      {
        type: 'form',
        title: 'Registration Form',
        description: 'Collect attendee information',
        settings: { fields: ['email', 'firstName', 'phone'] },
        order: 2
      },
      {
        type: 'email',
        title: 'Webinar Sequence',
        description: 'Reminder and follow-up emails',
        settings: { sequenceLength: 4 },
        order: 3
      },
      {
        type: 'thank-you',
        title: 'Confirmation Page',
        description: 'Registration confirmation and calendar link',
        settings: {},
        order: 4
      }
    ],
    rating: 4.6,
    downloads: 445,
    featured: false,
    tags: ['webinar', 'education', 'registration', 'email-sequence'],
    difficulty: 'beginner',
    estimatedTime: '40 minutes'
  },
  {
    name: 'Product Launch',
    description: 'Pre-launch buzz building and launch day conversion funnel',
    category: 'Marketing',
    preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    steps: [
      {
        type: 'landing',
        title: 'Coming Soon Page',
        description: 'Build anticipation for your product launch',
        settings: { template: 'coming-soon' },
        order: 1
      },
      {
        type: 'form',
        title: 'Early Access Signup',
        description: 'Capture early bird subscribers',
        settings: { fields: ['email', 'firstName'] },
        order: 2
      },
      {
        type: 'email',
        title: 'Launch Sequence',
        description: 'Pre-launch and launch day emails',
        settings: { sequenceLength: 6 },
        order: 3
      }
    ],
    rating: 4.8,
    downloads: 723,
    featured: true,
    tags: ['product-launch', 'marketing', 'pre-launch', 'buzz'],
    difficulty: 'advanced',
    estimatedTime: '90 minutes'
  },
  {
    name: 'Course Sales Funnel',
    description: 'Educational content sales with payment processing and access',
    category: 'Education',
    preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    steps: [
      {
        type: 'landing',
        title: 'Course Sales Page',
        description: 'Detailed course information and benefits',
        settings: { template: 'course-sales' },
        order: 1
      },
      {
        type: 'checkout',
        title: 'Course Checkout',
        description: 'Secure payment for course access',
        settings: { paymentMethods: ['stripe'] },
        order: 2
      },
      {
        type: 'email',
        title: 'Course Access Sequence',
        description: 'Welcome and course access emails',
        settings: { sequenceLength: 3 },
        order: 3
      }
    ],
    rating: 4.5,
    downloads: 356,
    featured: false,
    tags: ['course', 'education', 'sales', 'online-learning'],
    difficulty: 'intermediate',
    estimatedTime: '50 minutes'
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing templates
    await Template.deleteMany({});
    console.log('🗑️ Cleared existing templates');

    // Insert new templates
    const createdTemplates = await Template.insertMany(templates);
    console.log(`✅ Seeded ${createdTemplates.length} templates`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();