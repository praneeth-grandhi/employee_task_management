import React from 'react';

const TaskListNumbers = ({ stats }) => {
  return (
    <div className='flex mt-10 justify-between gap-5'>
      <div className='rounded-xl w-[45%] px-6 py-9 bg-blue-400 transition-transform hover:scale-105'>
        <h2 className='text-2xl font-semibold'>{stats.new}</h2>
        <h3 className='text-xl font-medium'>New Tasks</h3>
      </div>
      <div className='rounded-xl w-[45%] px-6 py-9 bg-yellow-400 transition-transform hover:scale-105'>
        <h2 className='text-2xl font-semibold'>{stats.active}</h2>
        <h3 className='text-xl font-medium'>Active Tasks</h3>
      </div>
      <div className='rounded-xl w-[45%] px-6 py-9 bg-green-400 transition-transform hover:scale-105'>
        <h2 className='text-2xl font-semibold'>{stats.completed}</h2>
        <h3 className='text-xl font-medium'>Completed Tasks</h3>
      </div>
      <div className='rounded-xl w-[45%] px-6 py-9 bg-red-400 transition-transform hover:scale-105'>
        <h2 className='text-2xl font-semibold'>{stats.failed}</h2>
        <h3 className='text-xl font-medium'>Failed Tasks</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
