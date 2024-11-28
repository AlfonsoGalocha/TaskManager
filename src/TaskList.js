import React, { useEffect, useState } from 'react';
import { supabase } from './SupabaseClient';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      if (!error) setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.completed ? '✅' : '❌'}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;