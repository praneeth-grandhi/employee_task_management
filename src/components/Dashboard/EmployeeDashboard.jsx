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
      // Filter tasks where the current user is an assignee
      const userTasks = tasksData.filter(task => 
        task.assignees?.some(assignee => assignee.user?._id === user?._id)
      );
      setTasks(userTasks);
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Find the task and the user's assignee entry
      const task = tasks.find(t => t._id === taskId);
      if (!task) return;

      const assignee = task.assignees.find(a => a.user._id === user._id);
      if (!assignee) return;

      const updatedTask = await updateTaskStatus(taskId, {
        status: newStatus,
        assigneeId: assignee._id
      });

      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      toast.success('Task status updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating task status');
    }
  };

  const taskStats = {
    new: tasks.filter(task => 
      task.assignees?.find(a => a.user._id === user._id)?.status === 'new'
    ).length,
    active: tasks.filter(task => 
      task.assignees?.find(a => a.user._id === user._id)?.status === 'active'
    ).length,
    completed: tasks.filter(task => 
      task.assignees?.find(a => a.user._id === user._id)?.status === 'completed'
    ).length,
    failed: tasks.filter(task => 
      task.assignees?.find(a => a.user._id === user._id)?.status === 'failed'
    ).length
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
