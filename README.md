# Portfolio - Software Developer & Designer

A modern, responsive portfolio website built with Node.js, Express, and MySQL. This project showcases software development and UI/UX design skills with a beautiful, functional interface.

## Features

- **Modern Design**: Clean, responsive UI with smooth animations and transitions
- **Project Showcase**: Display your best work with images, descriptions, and links
- **Skills Section**: Organized display of technical and design skills
- **Contact Form**: Functional contact form with message storage
- **Admin API**: RESTful API for managing portfolio content
- **Mobile Responsive**: Optimized for all devices and screen sizes
- **Dark Mode Support**: Automatic dark mode detection
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database management
- **MySQL** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Styling with custom animations
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome** - Icon library

## Project Structure

```
pot-folio/
├── src/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── database/
│   │   └── models.js          # Database models
│   ├── routes/
│   │   └── portfolio.js       # API routes
│   └── script/
│       └── seedData.js        # Database seeding script
├── public/
│   ├── index.html             # Main HTML file
│   ├── script.js              # Frontend JavaScript
│   ├── style.css              # Custom styles
│   └── uploads/               # Image uploads
├── .env                       # Environment variables
├── index.js                   # Main server file
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pot-folio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_NAME=portfolio_db
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   ```

4. **Create MySQL database**
   ```sql
   CREATE DATABASE portfolio_db;
   ```

5. **Run the setup script**
   ```bash
   npm run setup
   ```
   This will install dependencies and seed the database with sample data.

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/portfolio
   - Health check: http://localhost:3000/api/health

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm run seed` - Seed the database with sample data
- `npm run setup` - Install dependencies and seed database

## API Endpoints

### Personal Information
- `GET /api/portfolio/personal-info` - Get personal information
- `PUT /api/portfolio/personal-info` - Update personal information

### Skills
- `GET /api/portfolio/skills` - Get all skills
- `POST /api/portfolio/skills` - Add new skill
- `PUT /api/portfolio/skills/:id` - Update skill
- `DELETE /api/portfolio/skills/:id` - Delete skill

### Projects
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/projects/featured` - Get featured projects
- `GET /api/portfolio/projects/:id` - Get single project
- `POST /api/portfolio/projects` - Create new project
- `PUT /api/portfolio/projects/:id` - Update project
- `DELETE /api/portfolio/projects/:id` - Delete project

### Contact
- `POST /api/portfolio/contact` - Submit contact form
- `GET /api/portfolio/contact/messages` - Get all messages (admin)

## Customization

### Updating Personal Information
Modify the sample data in `src/script/seedData.js` or use the API endpoints to update:
- Name and title
- Bio and description
- Contact information
- Social media links

### Adding Projects
1. Add project images to the `public/uploads/` directory
2. Use the API endpoints or update the seed data to add new projects
3. Include project details like technologies, links, and descriptions

### Styling
- Modify `public/style.css` for custom styles
- Adjust Tailwind CSS classes in `public/index.html`
- Add custom animations and transitions

## Database Models

### PersonalInfo
- name, title, bio, email, phone, linkedin, github, location

### Skill
- name, category (design/development/tools), level, icon

### Project
- title, description, technologies, designTools, liveUrl, githubUrl, imageUrl, featured, category

### ContactMessage
- name, email, subject, message, status

## Deployment

### Environment Variables
Set these in your production environment:
- `PORT` - Server port
- `DB_HOST` - Database host
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password

### Production Build
1. Set `NODE_ENV=production`
2. Configure your database
3. Run `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or support, please use the contact form in the portfolio or reach out via the provided contact information.

---

**Note**: This portfolio comes with sample data to demonstrate functionality. Replace it with your own information to personalize your portfolio.
