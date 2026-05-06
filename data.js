// Static portfolio data for Netlify deployment
const portfolioData = {
    personalInfo: {
        name: 'Merci Niyonizeye',
        title: 'Software Developer & UI/UX Designer',
        bio: 'Passionate about creating beautiful, functional digital experiences that blend creativity with technical excellence.',
        email: 'niyonizeyemerci@gmail.com',
        phone: '+250 78 117 4865 / +250 72 520 5015',
        linkedin: 'https://linkedin.com/in/niyonizeyemerci',
        github: 'https://github.com/merci-niyonizeye',
        location: 'Kigali, Rwanda'
    },
    skills: [
        { name: 'Figma', category: 'design', level: 'expert' },
        { name: 'Adobe XD', category: 'design', level: 'advanced' },
        { name: 'Sketch', category: 'design', level: 'intermediate' },
        { name: 'JavaScript', category: 'development', level: 'expert' },
        { name: 'React', category: 'development', level: 'advanced' },
        { name: 'Node.js', category: 'development', level: 'advanced' },
        { name: 'Vue.js', category: 'development', level: 'intermediate' },
        { name: 'Python', category: 'development', level: 'intermediate' },
        { name: 'Git', category: 'tools', level: 'expert' },
        { name: 'VS Code', category: 'tools', level: 'expert' },
        { name: 'Docker', category: 'tools', level: 'intermediate' },
        { name: 'Webpack', category: 'tools', level: 'advanced' },
        { name: 'Tailwind CSS', category: 'design', level: 'expert' },
        { name: 'Bootstrap', category: 'design', level: 'advanced' },
        { name: 'Sass', category: 'design', level: 'advanced' }
    ],
    projects: [
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
            liveUrl: 'https://your-netlify-site.netlify.app',
            githubUrl: 'https://github.com/merci-niyonizeye/portfolio',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: false,
            category: 'web-design'
        },
        {
            title: 'Mobile Banking App',
            description: 'Secure and user-friendly mobile banking application with biometric authentication.',
            technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
            liveUrl: 'https://banking-demo.example.com',
            githubUrl: 'https://github.com/merci-niyonizeye/mobile-banking',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: false,
            category: 'mobile'
        },
        {
            title: 'Analytics Dashboard',
            description: 'Real-time analytics dashboard with data visualization and reporting features.',
            technologies: ['Vue.js', 'D3.js', 'Node.js', 'MongoDB'],
            liveUrl: 'https://analytics-demo.example.com',
            githubUrl: 'https://github.com/merci-niyonizeye/analytics-dashboard',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: false,
            category: 'full-stack'
        },
        {
            title: 'Social Platform',
            description: 'Modern social networking platform with real-time messaging and content sharing.',
            technologies: ['React', 'Node.js', 'Socket.io', 'Redis'],
            liveUrl: 'https://social-demo.example.com',
            githubUrl: 'https://github.com/merci-niyonizeye/social-platform',
            imageUrl: 'https://via.placeholder.com/400x300',
            featured: false,
            category: 'full-stack'
        }
    ]
};

// Make data available globally
window.portfolioData = portfolioData;
