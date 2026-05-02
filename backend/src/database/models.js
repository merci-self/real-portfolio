import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Personal Information Model
const PersonalInfo = sequelize.define('PersonalInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Skills Model
const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('design', 'development', 'tools'),
    allowNull: false
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Projects Model
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  longDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  technologies: {
    type: DataTypes.JSON,
    allowNull: false
  },
  designTools: {
    type: DataTypes.JSON,
    allowNull: true
  },
  liveUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  githubUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  category: {
    type: DataTypes.ENUM('web-design', 'ui-ux', 'full-stack', 'mobile', 'other'),
    allowNull: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Contact Messages Model
const ContactMessage = sequelize.define('ContactMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('unread', 'read', 'replied'),
    defaultValue: 'unread'
  }
});

// Sync all models
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

export {
  PersonalInfo,
  Skill,
  Project,
  ContactMessage,
  syncModels,
  sequelize
};
