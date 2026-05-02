import express from 'express';
import { PersonalInfo, Skill, Project, ContactMessage } from '../database/models.js';
import { sendContactEmail } from '../services/emailService.js';

const router = express.Router();

// Get personal information
router.get('/personal-info', async (req, res) => {
  try {
    const info = await PersonalInfo.findOne();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personal information' });
  }
});

// Update personal information
router.put('/personal-info', async (req, res) => {
  try {
    const info = await PersonalInfo.findOne();
    if (info) {
      await info.update(req.body);
    } else {
      await PersonalInfo.create(req.body);
    }
    res.json({ message: 'Personal information updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update personal information' });
  }
});

// Get all skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.findAll({
      order: [['category', 'ASC'], ['name', 'ASC']]
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Add new skill
router.post('/skills', async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// Update skill
router.put('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    await skill.update(req.body);
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// Delete skill
router.delete('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    await skill.destroy();
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['featured', 'DESC'], ['completedAt', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get featured projects
router.get('/projects/featured', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { featured: true },
      order: [['completedAt', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// Get single project
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create new project
router.post('/projects', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.update(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Submit contact form
router.post('/contact', async (req, res) => {
  try {
    // Save to database
    const message = await ContactMessage.create(req.body);
    
    // Send email notification
    const emailResult = await sendContactEmail(req.body);
    
    if (emailResult.success) {
      res.status(201).json({ 
        message: 'Message sent successfully',
        emailSent: true,
        messageId: emailResult.messageId
      });
    } else {
      // Message saved to DB but email failed
      res.status(201).json({ 
        message: 'Message saved but email notification failed',
        emailSent: false,
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get contact messages (admin)
router.get('/contact/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
