import React, {useContext, useState} from 'react';
import showToast from '../utils/ToastUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';
// Context API oluşturuldu!

export const TaskContext = React.createContext();

export const TaskProvider = ({children}) => {
  const [tasks, setTask] = useState([
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
      status: 'open',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
      status: 'open',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 4,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 5,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 6,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 7,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);

  const addTask = newTask => {
    //console.warn('addTask', newTask);
    showToast('success', 'New task added!');
    const newTaskData = [...tasks, newTask];

    setTask(newTaskData);

    AsyncStorage.setItem(AsyncStorageKey.tasks, JSON.stringify(newTaskData));
  };

  const deleteTask = taskId => {
    showToast('success', 'New task deleted!');
    setTask(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const deleteAllTask = () => {
    setTask([]);
  };

  const updateTask = (taskId, data) => {
    setTask(prevTasks =>
      prevTasks.map(task => (task.id === taskId ? {...task, ...data} : task)),
    );
  };

  const contextValues = {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    deleteAllTask,
    setTask,
  };

  return (
    <TaskContext.Provider value={contextValues}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useContext must be used with a TaskContext');
  }
  return context;
};

export default TaskProvider;
