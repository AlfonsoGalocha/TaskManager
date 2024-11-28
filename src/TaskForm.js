import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, taskToEdit, handleSubmit, handleEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Efecto para cargar la tarea en edición
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit]);

  // Manejar el envío del formulario
  const handleFormSubmit = async () => {
    if (taskToEdit) {
      await handleEdit(taskToEdit.id, title, description); // Editar tarea
    } else {
      await handleSubmit(title, description); // Crear nueva tarea
    }
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form">
      <input
        className="title-form"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="description-form"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button className="save-form" onClick={handleFormSubmit}>
        {taskToEdit ? 'Update' : 'Save'}
      </button>
    </div>
  );
};

export default TaskForm;
