// Portfolio JavaScript
class Portfolio {
    constructor() {
        this.apiBase = '/api/portfolio';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadPortfolioData();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link, a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    mobileMenu?.classList.add('hidden');
                }
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm?.addEventListener('submit', (e) => this.handleContactSubmit(e));

        // Scroll animations
        this.setupScrollAnimations();
    }

    async loadPortfolioData() {
        try {
            const [personalInfo, skills, projects] = await Promise.all([
                this.fetchPersonalInfo(),
                this.fetchSkills(),
                this.fetchProjects()
            ]);

            this.updatePersonalInfo(personalInfo);
            this.updateSkills(skills);
            this.updateProjects(projects);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Load sample data if API fails
            this.loadSampleData();
        }
    }

    async fetchPersonalInfo() {
        const response = await fetch(`${this.apiBase}/personal-info`);
        if (!response.ok) throw new Error('Failed to fetch personal info');
        return await response.json();
    }

    async fetchSkills() {
        const response = await fetch(`${this.apiBase}/skills`);
        if (!response.ok) throw new Error('Failed to fetch skills');
        return await response.json();
    }

    async fetchProjects() {
        const response = await fetch(`${this.apiBase}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        return await response.json();
    }

    updatePersonalInfo(info) {
        if (!info) return;

        // Update navigation and hero sections
        document.getElementById('navName').textContent = info.name || 'Merci Niyonizeye';
        document.getElementById('heroName').textContent = info.name || 'Merci Niyonizeye';
        document.getElementById('heroTitle').textContent = info.title || 'Software Developer & Designer';
        document.getElementById('heroBio').textContent = info.bio || 'Passionate developer with design skills';
        document.getElementById('footerName').textContent = info.name || 'Merci Niyonizeye';

        // Update contact information
        document.getElementById('contactEmail').textContent = info.email || 'niyonizeyemerci@gmail.com';
        document.getElementById('contactEmail').parentElement.href = `mailto:${info.email || 'niyonizeyemerci@gmail.com'}`;
        
        // Handle phone numbers - split by '/' if multiple numbers
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

        // Update about section
        document.getElementById('aboutBio').textContent = info.bio || 'I am a passionate software developer with a focus on creating beautiful, functional applications.';
    }

    updateSkills(skills) {
        const designSkills = document.getElementById('designSkills');
        const devSkills = document.getElementById('devSkills');
        const toolSkills = document.getElementById('toolSkills');

        designSkills.innerHTML = '';
        devSkills.innerHTML = '';
        toolSkills.innerHTML = '';

        skills.forEach(skill => {
            const skillElement = this.createSkillElement(skill);
            
            switch(skill.category) {
                case 'design':
                    designSkills.appendChild(skillElement);
                    break;
                case 'development':
                    devSkills.appendChild(skillElement);
                    break;
                case 'tools':
                    toolSkills.appendChild(skillElement);
                    break;
            }
        });
    }

    createSkillElement(skill) {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between';
        div.innerHTML = `
            <span class="font-medium">${skill.name}</span>
            <span class="text-sm text-gray-500 capitalize">${skill.level}</span>
        `;
        return div;
    }

    updateProjects(projects) {
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const div = document.createElement('div');
        div.className = 'bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow';
        
        const imageUrl = project.imageUrl || 'https://via.placeholder.com/400x300';
        const technologies = Array.isArray(project.technologies) 
            ? project.technologies.join(', ') 
            : project.technologies || '';

        div.innerHTML = `
            <img src="${imageUrl}" alt="${project.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${technologies.split(',').map(tech => 
                        `<span class="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">${tech.trim()}</span>`
                    ).join('')}
                </div>
                <div class="flex space-x-4">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Live Demo</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="text-gray-600 hover:text-gray-800 font-medium">GitHub</a>` : ''}
                </div>
            </div>
        `;
        
        return div;
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch(`${this.apiBase}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                this.showNotification('Message sent successfully!', 'success');
                e.target.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
        }
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-6 px-6 py-3 rounded-lg text-white z-50 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        });

        // Add staggered animation to project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                });
            }, { threshold: 0.1 });
            
            cardObserver.observe(card);
        });

        // Add floating animation to hero elements
        const heroElements = document.querySelectorAll('#home .mb-8, #home .flex');
        heroElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s both`;
        });
    }

    loadSampleData() {
        // Sample data for demonstration
        const sampleInfo = {
            name: 'Merci Niyonizeye',
            title: 'Software Developer & UI/UX Designer',
            bio: 'Passionate about creating beautiful, functional digital experiences that blend creativity with technical excellence.',
            email: 'niyonizeyemerci@gmail.com',
            phone: '+250 78 117 4865 / +250 72 520 5015',
            github: 'https://github.com/merci-niyonizeye',
            linkedin: 'https://linkedin.com/in/niyonizeyemerci'
        };

        const sampleSkills = [
            { name: 'Figma', category: 'design', level: 'expert' },
            { name: 'Adobe XD', category: 'design', level: 'advanced' },
            { name: 'JavaScript', category: 'development', level: 'expert' },
            { name: 'React', category: 'development', level: 'advanced' },
            { name: 'Node.js', category: 'development', level: 'advanced' },
            { name: 'Git', category: 'tools', level: 'expert' },
            { name: 'VS Code', category: 'tools', level: 'expert' }
        ];

        const sampleProjects = [
            {
                title: 'Personal Portfolio Website',
                description: 'A beautiful, animated portfolio website built with modern web technologies. Features smooth animations, responsive design, and an elegant chocolate color theme.',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express'],
                liveUrl: 'http://localhost:5000',
                githubUrl: 'https://github.com/merci-niyonizeye/portfolio',
                imageUrl: 'https://via.placeholder.com/400x300'
            },
            {
                title: 'E-Commerce Platform',
                description: 'A modern e-commerce platform with beautiful UI and seamless user experience.',
                technologies: ['React', 'Node.js', 'MongoDB'],
                liveUrl: 'https://example.com',
                githubUrl: 'https://github.com/example',
                imageUrl: 'https://via.placeholder.com/400x300'
            },
            {
                title: 'Task Management App',
                description: 'Intuitive task management application with drag-and-drop functionality.',
                technologies: ['Vue.js', 'Express', 'PostgreSQL'],
                liveUrl: 'https://example.com',
                githubUrl: 'https://github.com/example',
                imageUrl: 'https://via.placeholder.com/400x300'
            }
        ];

        this.updatePersonalInfo(sampleInfo);
        this.updateSkills(sampleSkills);
        this.updateProjects(sampleProjects);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
