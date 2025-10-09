import React from 'react';
import { updateTaskStatus } from '../../services/api';
import { toast } from 'react-toastify';

const getStatusColor = (status) => {
  switch (status) {
    case 'new':
      return 'bg-blue-400';
    case 'active':
      return 'bg-yellow-400';
    case 'completed':
      return 'bg-green-400';
    case 'failed':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};

const AllTask = ({ tasks, onTaskDelete }) => {
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success('Task status updated successfully');
    } catch (error) {
      toast.error('Error updating task status');
    }
  };

  return (
    <div className='bg-[#1c1c1c] p-5 mt-5 max-h-[500px] gap-3 flex flex-col rounded overflow-auto'>
      {tasks.length === 0 ? (
        <div className='text-center text-gray-400 py-10'>
          No tasks available
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className={`${getStatusColor(task.status)} py-3 px-4 rounded`}>
            <div className='flex justify-between items-center'>
              <div className='flex-1'>
                <h2 className='font-semibold'>{task.assignedTo.name}</h2>
                <h3 className='text-lg'>{task.title}</h3>
                <p className='text-sm mt-1'>{task.description}</p>
                <div className='flex gap-4 mt-2 text-sm'>
                  <span>Category: {task.category}</span>
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className='flex flex-col gap-2 ml-4'>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className='bg-transparent border border-white rounded px-2 py-1'
                >
                  <option value="new">New</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
                <button
                  onClick={() => onTaskDelete(task._id)}
                  className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllTask;
