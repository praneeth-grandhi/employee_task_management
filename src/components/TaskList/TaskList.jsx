import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

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

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-600';
    case 'medium':
      return 'bg-yellow-600';
    case 'low':
      return 'bg-green-600';
    default:
      return 'bg-gray-600';
  }
};

const TaskList = ({ tasks, onStatusChange }) => {
  const { user } = useContext(AuthContext);

  const getMyStatus = (task) => {
    const myAssignment = task.assignees?.find(a => a.user._id === user._id);
    return myAssignment?.status || 'new';
  };

  return (
    <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10'>
      {tasks.map((task) => {
        const myStatus = getMyStatus(task);
        return (
          <div key={task._id} className={`flex-shrink-0 h-full w-[300px] p-5 ${getStatusColor(myStatus)} rounded-xl`}>
            <div className="flex justify-between items-center">
              <h3 className={`${getPriorityColor(task.priority)} text-sm px-3 py-1 rounded`}>
                {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
              </h3>
              <h4 className='text-sm'>{new Date(task.dueDate).toLocaleDateString()}</h4>
            </div>
            <h2 className='mt-5 text-xl font-semibold'>{task.title}</h2>
            <p className="text-sm mt-2">{task.description}</p>
            <div className="mt-4">
              <select
                value={myStatus}
                onChange={(e) => onStatusChange(task._id, e.target.value)}
                className='w-full bg-white bg-opacity-20 border-0 rounded px-2 py-1'
              >
                <option value="new">New</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
