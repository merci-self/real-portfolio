// Simple static version - works without backend
class Portfolio {
    constructor() {
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.loadStaticData();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling
        document.querySelectorAll('.nav-link, a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    mobileMenu?.classList.add('hidden');
                }
            });
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    loadStaticData() {
        // Static data - no backend needed
        const data = {
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
                { name: 'JavaScript', category: 'development', level: 'expert' },
                { name: 'React', category: 'development', level: 'advanced' },
                { name: 'Node.js', category: 'development', level: 'advanced' },
                { name: 'Git', category: 'tools', level: 'expert' },
                { name: 'VS Code', category: 'tools', level: 'expert' }
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
                    liveUrl: 'https://your-deployment-url.netlify.app',
                    githubUrl: 'https://github.com/merci-niyonizeye/portfolio',
                    imageUrl: 'https://via.placeholder.com/400x300',
                    featured: false,
                    category: 'web-design'
                }
            ]
        };

        this.updatePersonalInfo(data.personalInfo);
        this.updateSkills(data.skills);
        this.updateProjects(data.projects);
    }

    updatePersonalInfo(info) {
        if (!info) return;

        document.getElementById('navName').textContent = info.name || 'Merci Niyonizeye';
        document.getElementById('heroName').textContent = info.name || 'Merci Niyonizeye';
        document.getElementById('heroTitle').textContent = info.title || 'Software Developer & Designer';
        document.getElementById('heroBio').textContent = info.bio || 'Passionate developer with design skills';
        document.getElementById('footerName').textContent = info.name || 'Merci Niyonizeye';

        // Update contact information
        document.getElementById('contactEmail').textContent = info.email || 'niyonizeyemerci@gmail.com';
        document.getElementById('contactEmail').parentElement.href = `mailto:${info.email || 'niyonizeyemerci@gmail.com'}`;
        
        const phones = (info.phone || '+250 78 117 4865 / +250 72 520 5015').split('/');
        document.getElementById('contactPhone').textContent = phones[0]?.trim() || '+250 78 117 4865';
        const phone1 = phones[0]?.trim().replace(/\s/g, '') || '+250781174865';
        document.getElementById('contactPhone').parentElement.href = `tel:${phone1}`;
        
        if (document.getElementById('contactPhone2') && phones[1]) {
            document.getElementById('contactPhone2').textContent = phones[1]?.trim() || '+250 72 520 5015';
            const phone2 = phones[1]?.trim().replace(/\s/g, '') || '+250725205015';
            document.getElementById('contactPhone2').parentElement.href = `tel:${phone2}`;
        }

        // Update social links
        const socialLinks = document.getElementById('socialLinks');
        socialLinks.innerHTML = '';
        
        if (info.github) {
            socialLinks.innerHTML += `<a href="${info.github}" class="text-3xl hover:scale-110 transition" target="_blank"><i class="fab fa-github"></i></a>`;
        }
        if (info.linkedin) {
            socialLinks.innerHTML += `<a href="${info.linkedin}" class="text-3xl hover:scale-110 transition" target="_blank"><i class="fab fa-linkedin"></i></a>`;
        }
        if (info.email) {
            socialLinks.innerHTML += `<a href="mailto:${info.email}" class="text-3xl hover:scale-110 transition"><i class="fas fa-envelope"></i></a>`;
        }
    }

    updateSkills(skills) {
        if (!skills || skills.length === 0) return;

        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        // Group skills by category
        const skillsByCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {});

        // Create skill sections
        Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
            const section = document.createElement('div');
            section.className = 'mb-8';
            section.innerHTML = `
                <h3 class="text-xl font-semibold mb-4 text-white">${category.charAt(0).toUpperCase() + category.slice(1)} Skills</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${categorySkills.map(skill => `
                        <div class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div class="flex justify-between items-center mb-2">
                                <span class="font-medium text-white">${skill.name}</span>
                                <span class="text-sm text-gray-300">${skill.level}</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-white h-2 rounded-full" style="width: ${this.getSkillPercentage(skill.level)}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            skillsContainer.appendChild(section);
        });
    }

    getSkillPercentage(level) {
        const levels = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 };
        return levels[level] || 50;
    }

    updateProjects(projects) {
        if (!projects || projects.length === 0) return;

        const projectsContainer = document.getElementById('projectsContainer');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const div = document.createElement('div');
        div.className = `bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${project.featured ? 'ring-2 ring-white' : ''}`;
        
        div.innerHTML = `
            <div class="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-code text-4xl text-white mb-2"></i>
                    <p class="text-gray-300 text-sm">Project ${project.title.split(' ')[0]}</p>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 text-white">${project.title}</h3>
                <p class="text-gray-300 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => `
                        <span class="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">${tech}</span>
                    `).join('')}
                </div>
                <div class="flex justify-between">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="text-white hover:text-gray-300 font-medium">Live Demo</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="text-gray-400 hover:text-gray-200 font-medium">GitHub</a>` : ''}
                </div>
            </div>
        `;
        
        return div;
    }

    handleContactSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Simple email client fallback - always works
        const subject = encodeURIComponent(data.subject || 'Portfolio Contact');
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message || ''}`);
        window.location.href = `mailto:niyonizeyemerci@gmail.com?subject=${subject}&body=${body}`;
        
        alert('Opening your email client to send the message!');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
