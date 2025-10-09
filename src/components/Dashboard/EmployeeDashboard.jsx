import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import { getTasks, updateTaskStatus } from '../../services/api';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      toast.success('Task status updated successfully');
    } catch (error) {
      toast.error('Error updating task status');
    }
  };

  const taskStats = {
    new: tasks.filter(task => task.status === 'new').length,
    active: tasks.filter(task => task.status === 'active').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    failed: tasks.filter(task => task.status === 'failed').length
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1C1C1C]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen overflow-y-auto'>
      <Header />
      <TaskListNumbers stats={taskStats} />
      <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default EmployeeDashboard;
