import mongoose from 'mongoose';

const assigneeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'active', 'completed', 'failed'],
    default: 'new'
  },
  completedAt: {
    type: Date
  },
  notes: {
    type: String
  }
}, { _id: true });

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required']
  },
  description: {
    type: String,
    required: [true, 'Task description is required']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  assignees: {
    type: [assigneeSchema],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Task must be assigned to at least one employee'
    }
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  overallStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Update overall status when assignees' statuses change
taskSchema.pre('save', function(next) {
  if (this.isModified('assignees')) {
    const statuses = this.assignees.map(a => a.status);
    
    if (statuses.every(s => s === 'completed')) {
      this.overallStatus = 'completed';
    } else if (statuses.some(s => s === 'failed')) {
      this.overallStatus = 'failed';
    } else if (statuses.some(s => s === 'active')) {
      this.overallStatus = 'in-progress';
    } else {
      this.overallStatus = 'pending';
    }
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);
export default Task;