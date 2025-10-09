import Task from '../models/task.model.js';

// Create Task (Admin only)
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, assignedTo, priority } = req.body;
    
    // Validate required fields
    if (!title || !description || !dueDate || !category || !assignedTo || !assignedTo.length) {
      return res.status(400).json({ 
        message: 'Missing required fields. Please check all fields are filled.'
      });
    }

    // Convert assignedTo array to assignees array with initial status
    const assignees = Array.isArray(assignedTo) ? assignedTo : [assignedTo];
    const assigneeObjects = assignees.map(userId => ({
      user: userId,
      status: 'new'
    }));

    const task = await Task.create({
      title,
      description,
      dueDate: new Date(dueDate),
      category,
      assignees: assigneeObjects,
      priority: priority || 'medium',
      assignedBy: req.user._id
    });

    await task.populate('assignees.user', 'name email');
    await task.populate('assignedBy', 'name email');
    
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ 
      message: 'Error creating task',
      error: error.message 
    });
  }
};

// Get All Tasks (Admin) or User's Tasks (Employee)
export const getTasks = async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only return tasks where they are an assignee
    if (req.user.role !== 'admin') {
      query['assignees.user'] = req.user._id;
    }
    
    const tasks = await Task.find(query)
      .populate('assignees.user', 'name email')
      .populate('assignedBy', 'name email')
      .sort('-createdAt');
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Find the assignee entry for the current user
    const assigneeIndex = task.assignees.findIndex(
      a => a.user.toString() === req.user._id.toString()
    );

    // Check if user is assigned to this task
    if (req.user.role !== 'admin' && assigneeIndex === -1) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    if (req.user.role === 'admin') {
      // Admin can update any assignee's status
      const { assigneeId } = req.body;
      const updateIndex = assigneeId 
        ? task.assignees.findIndex(a => a._id.toString() === assigneeId)
        : assigneeIndex;

      if (updateIndex === -1) {
        return res.status(404).json({ message: 'Assignee not found' });
      }

      task.assignees[updateIndex].status = status;
      if (notes) task.assignees[updateIndex].notes = notes;
      if (status === 'completed') task.assignees[updateIndex].completedAt = new Date();
    } else {
      // Employee can only update their own status
      task.assignees[assigneeIndex].status = status;
      if (notes) task.assignees[assigneeIndex].notes = notes;
      if (status === 'completed') task.assignees[assigneeIndex].completedAt = new Date();
    }

    await task.save();
    
    await task.populate('assignees.user', 'name email');
    await task.populate('assignedBy', 'name email');
    res.json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Task (Admin only)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};