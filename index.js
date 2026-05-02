import express from 'express';
import cors from 'cors';
import { sequelize, syncModels } from './backend/src/database/models.js';
import portfolioRoutes from './backend/src/routes/portfolio.js';
import { sendContactEmail } from './backend/src/services/emailService.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for images, etc.)
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Database connection and sync
const startServer = async () => {
  try {
    // Try database connection but don't fail if it's not available
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      await syncModels();
      app.use('/api/portfolio', portfolioRoutes);
    } catch (dbError) {
      console.log('Database not available - running with sample data');
      // Create mock routes for frontend demo
      app.get('/api/portfolio/personal-info', (req, res) => {
        res.json({
          name: 'Merci Niyonizeye',
          title: 'Software Developer & UI/UX Designer',
          bio: 'Passionate about creating beautiful, functional digital experiences that blend creativity with technical excellence.',
          email: 'niyonizeyemerci@gmail.com',
          phone: '+250 78 117 4865 / +250 72 520 5015',
          linkedin: 'https://linkedin.com/in/niyonizeyemerci',
          github: 'https://github.com/merci-niyonizeye',
          location: 'Kigali, Rwanda'
        });
      });
      
      app.get('/api/portfolio/skills', (req, res) => {
        res.json([
          { name: 'Figma', category: 'design', level: 'expert' },
          { name: 'Adobe XD', category: 'design', level: 'advanced' },
          { name: 'JavaScript', category: 'development', level: 'expert' },
          { name: 'React', category: 'development', level: 'advanced' },
          { name: 'Node.js', category: 'development', level: 'advanced' },
          { name: 'Git', category: 'tools', level: 'expert' },
          { name: 'VS Code', category: 'tools', level: 'expert' }
        ]);
      });
      
      app.get('/api/portfolio/projects', (req, res) => {
        res.json([
          {
            title: 'E-Commerce Platform',
            description: 'A modern, fully-featured e-commerce platform with beautiful UI and seamless user experience.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
            liveUrl: 'https://ecommerce-demo.example.com',
            githubUrl: 'https://github.com/merci-niyonizeye/ecommerce-platform',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: true,
            category: 'full-stack'
          },
          {
            title: 'Task Management App',
            description: 'Intuitive task management application with drag-and-drop functionality and real-time collaboration.',
            technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
            liveUrl: 'https://taskapp-demo.example.com',
            githubUrl: 'https://github.com/merci-niyonizeye/task-management',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: true,
            category: 'web-design'
          },
          {
            title: 'Portfolio Website',
            description: 'Responsive portfolio website showcasing design and development skills with smooth animations.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
            liveUrl: 'http://localhost:5000',
            githubUrl: 'https://github.com/merci-niyonizeye/portfolio',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: false,
            category: 'web-design'
          }
        ]);
      });
      
      app.post('/api/portfolio/contact', async (req, res) => {
        try {
          console.log('Contact form submission:', req.body);
          
          // Send email notification
          const emailResult = await sendContactEmail(req.body);
          
          if (emailResult.success) {
            res.json({ 
              message: 'Message sent successfully!',
              emailSent: true 
            });
          } else {
            res.json({ 
              message: 'Message received but email failed',
              emailSent: false 
            });
          }
        } catch (error) {
          console.error('Contact form error:', error);
          res.status(500).json({ error: 'Failed to send message' });
        }
      });
    }
    
    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    
    app.listen(PORT, '127.0.0.1', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Frontend available at: http://localhost:${PORT}`);
      console.log(`API available at: http://localhost:${PORT}/api/portfolio`);
      console.log(`Local-only access configured`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();