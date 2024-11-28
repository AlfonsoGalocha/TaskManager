import React, { useState, useEffect } from 'react';
import { supabase } from './SupabaseClient.ts';
import TaskForm from './TaskForm.js';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Función para obtener las tareas de la base de datos
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });

    if (!error) {
      setTasks(data);
    } else {
      console.error('Error fetching tasks:', error.message);
    }
  };

  // Crear nueva tarea
  const handleSubmit = async (title, description) => {
    const { error } = await supabase.from('tasks').insert([{ title, description }]);
    if (!error) fetchTasks();
  };

  // Editar una tarea existente
  const handleEdit = async (id, title, description) => {
    const { error } = await supabase.from('tasks').update({ title, description }).eq('id', id);
    if (!error) {
      setTaskToEdit(null); // Limpiar la tarea en edición
      fetchTasks(); // Actualizar la lista de tareas
    }
  };

  // Cambiar estado de completado
  const toggleComplete = async (id, completed) => {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !completed })
      .eq('id', id);

    if (!error) {
      setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !completed } : task)));
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) fetchTasks();
  };

  // Obtener las tareas al cargar la app
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h2>Task Manager</h2>
      {/* Componente del formulario */}
      <TaskForm 
        onSave={fetchTasks} 
        handleSubmit={handleSubmit} 
        taskToEdit={taskToEdit} 
        handleEdit={handleEdit} 
      />
      {/* Lista de tareas */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-text">
              <strong>{task.title}</strong>: {task.description}
            </span>
            <div>
              <button
                onClick={() => toggleComplete(task.id, task.completed)}
                className={`complete-button ${task.completed ? 'completed' : ''}`}
              >
                {task.completed ? '✔️' : 'Complete'}
              </button>
              <button onClick={() => setTaskToEdit(task)} className="edit-button">
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
