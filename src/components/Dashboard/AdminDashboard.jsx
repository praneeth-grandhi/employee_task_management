import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import { getTasks, getAllUsers, deleteTask } from '../../services/api';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, usersData] = await Promise.all([
          getTasks(),
          getAllUsers()
        ]);
        setTasks(tasksData);
        setUsers(usersData.filter(u => u.role === 'employee')); // Only show employees in the assign list
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        toast.error(error.response?.data?.message || 'Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTaskCreate = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="min-h-screen w-full p-10 bg-[#111]">
      <Header />
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <>
          <CreateTask onTaskCreate={handleTaskCreate} users={users} />
          <AllTask tasks={tasks} onTaskDelete={handleTaskDelete} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
