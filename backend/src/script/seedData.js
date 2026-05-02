import { PersonalInfo, Skill, Project, sequelize } from '../database/models.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Create personal info
    const personalInfo = await PersonalInfo.create({
      name: 'Merci Niyonizeye',
      title: 'Software Developer & UI/UX Designer',
      bio: 'Passionate software developer with a keen eye for design. I specialize in creating beautiful, functional web applications that provide exceptional user experiences. My expertise combines technical proficiency with creative problem-solving to deliver innovative digital solutions.',
      email: 'niyonizeyemerci@gmail.com',
      phone: '+250 78 117 4865 / +250 72 520 5015',
      linkedin: 'https://linkedin.com/in/niyonizeyemerci',
      github: 'https://github.com/merci-niyonizeye',
      location: 'Kigali, Rwanda'
    });

    console.log('Personal info created:', personalInfo.name);

    // Create skills
    const skills = [
      // Design Skills
      { name: 'Figma', category: 'design', level: 'expert' },
      { name: 'Adobe XD', category: 'design', level: 'advanced' },
      { name: 'Sketch', category: 'design', level: 'intermediate' },
      { name: 'Adobe Photoshop', category: 'design', level: 'advanced' },
      { name: 'Adobe Illustrator', category: 'design', level: 'intermediate' },
      
      // Development Skills
      { name: 'JavaScript', category: 'development', level: 'expert' },
      { name: 'TypeScript', category: 'development', level: 'advanced' },
      { name: 'React', category: 'development', level: 'expert' },
      { name: 'Vue.js', category: 'development', level: 'advanced' },
      { name: 'Node.js', category: 'development', level: 'advanced' },
      { name: 'Express.js', category: 'development', level: 'advanced' },
      { name: 'HTML5', category: 'development', level: 'expert' },
      { name: 'CSS3', category: 'development', level: 'expert' },
      { name: 'Tailwind CSS', category: 'development', level: 'expert' },
      { name: 'MongoDB', category: 'development', level: 'intermediate' },
      { name: 'MySQL', category: 'development', level: 'advanced' },
      { name: 'PostgreSQL', category: 'development', level: 'intermediate' },
      
      // Tools
      { name: 'Git', category: 'tools', level: 'expert' },
      { name: 'VS Code', category: 'tools', level: 'expert' },
      { name: 'Webpack', category: 'tools', level: 'intermediate' },
      { name: 'Docker', category: 'tools', level: 'intermediate' },
      { name: 'Jest', category: 'tools', level: 'advanced' },
      { name: 'npm', category: 'tools', level: 'expert' },
      { name: 'Chrome DevTools', category: 'tools', level: 'expert' }
    ];

    for (const skillData of skills) {
      await Skill.create(skillData);
    }
    console.log(`${skills.length} skills created`);

    // Create projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A modern, fully-featured e-commerce platform with beautiful UI and seamless user experience.',
        longDescription: 'This e-commerce platform features a responsive design, product catalog, shopping cart, user authentication, payment integration, and admin dashboard. Built with modern technologies and best practices for scalability and performance.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
        designTools: ['Figma', 'Adobe XD'],
        liveUrl: 'https://ecommerce-demo.example.com',
        githubUrl: 'https://github.com/merci-niyonizeye/ecommerce-platform',
        imageUrl: '/uploads/ecommerce-project.jpg',
        featured: true,
        category: 'full-stack',
        completedAt: new Date('2024-01-15')
      },
      {
        title: 'Task Management App',
        description: 'Intuitive task management application with drag-and-drop functionality and real-time collaboration.',
        longDescription: 'A collaborative task management tool featuring drag-and-drop interface, real-time updates, team collaboration, project templates, and analytics dashboard. Designed with focus on user experience and productivity.',
        technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
        designTools: ['Figma', 'Sketch'],
        liveUrl: 'https://taskapp-demo.example.com',
        githubUrl: 'https://github.com/merci-niyonizeye/task-management',
        imageUrl: '/uploads/taskapp-project.jpg',
        featured: true,
        category: 'web-design',
        completedAt: new Date('2024-02-20')
      },
      {
        title: 'Portfolio Website',
        description: 'Responsive portfolio website showcasing design and development skills with smooth animations.',
        longDescription: 'A personal portfolio website featuring modern design, smooth animations, project showcase, contact form, and blog section. Optimized for performance and SEO with responsive design for all devices.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
        designTools: ['Figma', 'Adobe Photoshop'],
        liveUrl: 'http://localhost:5000',
        githubUrl: 'https://github.com/merci-niyonizeye/portfolio',
        imageUrl: '/uploads/portfolio-project.jpg',
        featured: false,
        category: 'web-design',
        completedAt: new Date('2024-03-10')
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure and user-friendly mobile banking application with biometric authentication.',
        longDescription: 'A comprehensive mobile banking solution featuring secure authentication, account management, transfers, bill payments, and financial insights. Designed with security and user experience as top priorities.',
        technologies: ['React Native', 'Node.js', 'MySQL', 'Biometric API'],
        designTools: ['Figma', 'Adobe XD'],
        liveUrl: 'https://banking-demo.example.com',
        githubUrl: 'https://github.com/merci-niyonizeye/mobile-banking',
        imageUrl: '/uploads/banking-project.jpg',
        featured: true,
        category: 'mobile',
        completedAt: new Date('2023-12-05')
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard with interactive charts and data visualization.',
        longDescription: 'A powerful analytics dashboard featuring real-time data updates, interactive charts, customizable widgets, export functionality, and responsive design. Built for data-driven decision making.',
        technologies: ['React', 'D3.js', 'Node.js', 'WebSocket'],
        designTools: ['Figma', 'Adobe Illustrator'],
        liveUrl: 'https://analytics-demo.example.com',
        githubUrl: 'https://github.com/merci-niyonizeye/analytics-dashboard',
        imageUrl: '/uploads/analytics-project.jpg',
        featured: false,
        category: 'ui-ux',
        completedAt: new Date('2023-11-20')
      },
      {
        title: 'Social Media Platform',
        description: 'Modern social media platform with real-time messaging and content sharing.',
        longDescription: 'A feature-rich social media platform with user profiles, real-time messaging, content sharing, notifications, and privacy controls. Designed for engagement and community building.',
        technologies: ['React', 'Socket.io', 'MongoDB', 'Redis'],
        designTools: ['Figma', 'Sketch'],
        liveUrl: 'https://social-demo.example.com',
        githubUrl: 'https://github.com/merci-niyonizeye/social-platform',
        imageUrl: '/uploads/social-project.jpg',
        featured: false,
        category: 'full-stack',
        completedAt: new Date('2023-10-15')
      }
    ];

    for (const projectData of projects) {
      await Project.create(projectData);
    }
    console.log(`${projects.length} projects created`);

    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seeding script
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
