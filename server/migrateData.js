import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Task from './models/task.model.js';

dotenv.config();

const localStorageData = {
  employees: [
    {
      "id": 1,
      "email": "john.doe@example.com",
      "password": "123",
      "tasks": [
        {
          "title": "Prepare project report",
          "description": "Compile Q3 project updates and insights.",
          "date": "2025-08-01",
          "category": "Reporting",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        },
        {
          "title": "Client meeting",
          "description": "Discuss upcoming deliverables with Acme Corp.",
          "date": "2025-08-03",
          "category": "Meetings",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        }
      ]
    },
    {
      "id": 2,
      "email": "jane.smith@example.com",
      "password": "123",
      "tasks": [
        {
          "title": "Team stand-up",
          "description": "Daily sync with the development team.",
          "date": "2025-08-08",
          "category": "Meetings",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        }
      ]
    }
  ],
  admin: [
    {
      "id": 1,
      "email": "admin@example.com",
      "password": "123",
      "tasks": [
        {
          "title": "System audit",
          "description": "Audit security policies and access logs.",
          "date": "2025-08-01",
          "category": "Security",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        }
      ]
    }
  ]
};

const migrateData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminData = localStorageData.admin[0];
    const adminUser = await User.create({
      email: adminData.email,
      password: adminData.password + '@123456', // Making password longer to meet requirement
      name: 'Admin User',
      department: 'Administration',
      role: 'admin'
    });

    // Create employee users first
    const employees = await Promise.all(localStorageData.employees.map(async (emp) => {
      return User.create({
        email: emp.email,
        password: emp.password + '@123456',
        name: emp.email.split('@')[0].split('.').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        department: 'General',
        role: 'employee'
      });
    }));

    // Create admin's tasks and assign to employees
    for (const task of adminData.tasks) {
      // Randomly assign tasks to employees
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      await Task.create({
        title: task.title,
        description: task.description,
        dueDate: task.date,
        category: task.category,
        status: task.completed ? 'completed' : task.failed ? 'failed' : task.active ? 'active' : 'new',
        assignedTo: randomEmployee._id,
        assignedBy: adminUser._id
      });
    }

    // Create tasks from employees data and assign them
    const allTasks = localStorageData.employees.flatMap(emp => emp.tasks);
    for (const task of allTasks) {
      // Randomly assign tasks to employees
      const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
      await Task.create({
        title: task.title,
        description: task.description,
        dueDate: task.date,
        category: task.category,
        status: task.completed ? 'completed' : task.failed ? 'failed' : task.active ? 'active' : 'new',
        assignedTo: randomEmployee._id,
        assignedBy: adminUser._id
      });
    }

    console.log('Data migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

migrateData();