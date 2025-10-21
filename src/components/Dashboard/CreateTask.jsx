import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createTask } from '../../services/api';

const CreateTask = ({ onTaskCreate, users }) => {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    assignedTo: [],
    category: '',
    description: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTask = await createTask(formData);
      onTaskCreate(newTask);
      toast.success('Task created successfully');
      setFormData({
        title: '',
        dueDate: '',
        assignedTo: [],
        category: '',
        description: '',
        priority: 'medium'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-8 bg-[#1c1c1c] mt-7 rounded-lg'>
      <form onSubmit={handleSubmit} className='flex flex-wrap w-full items-start justify-between gap-5'>
        <div className='w-1/2'>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="text"
              placeholder='Enter task title'
              required
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Due Date</h3>
            <input
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="date"
              required
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setFormData(prev => ({
                  ...prev,
                  assignedTo: selectedOptions
                }));
              }}
              className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              required
              multiple
              size="4"
            >
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Priority</h3>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className='text-sm py-1 px-2 rounded w-4/5 outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              required
            >
              <option value="">Select Category</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className='flex-1'>
          <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='text-sm py-1 px-2 rounded w-full h-48 outline-none bg-transparent border-[1px] border-gray-400 mb-4'
            placeholder='Enter task description'
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-emerald-500 hover:bg-emerald-600 text-white text-sm mt-4 w-full py-3 px-5 rounded transition-colors
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
