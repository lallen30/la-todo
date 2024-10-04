import React, { useState } from 'react';

const TodoItem = ({
  todo,
  onToggle,
  onAddNote,
  onAddSubTodo,
  onToggleSubTodo,
}) => {
  const [note, setNote] = useState('');
  const [subTodo, setSubTodo] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      onAddNote(note);
      setNote('');
    }
  };

  const handleAddSubTodo = () => {
    if (subTodo.trim()) {
      onAddSubTodo(subTodo);
      setSubTodo('');
    }
  };

  return (
    <div className='todo-item'>
      <div className='todo-main'>
        <input type='checkbox' checked={todo.completed} onChange={onToggle} />
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      </div>
      <div className='todo-details'>
        <div className='todo-notes'>
          <h4>Notes:</h4>
          <ul>
            {todo.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          <input
            type='text'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='Add a note'
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
        <div className='sub-todos'>
          <h4>Sub-todos:</h4>
          <ul>
            {todo.subTodos.map((subTodo) => (
              <li key={subTodo.id}>
                <input
                  type='checkbox'
                  checked={subTodo.completed}
                  onChange={() => onToggleSubTodo(subTodo.id)}
                />
                <span className={subTodo.completed ? 'completed' : ''}>
                  {subTodo.text}
                </span>
              </li>
            ))}
          </ul>
          <input
            type='text'
            value={subTodo}
            onChange={(e) => setSubTodo(e.target.value)}
            placeholder='Add a sub-todo'
          />
          <button onClick={handleAddSubTodo}>Add Sub-todo</button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
