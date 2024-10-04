import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onToggle,
  onAddNote,
  onAddSubTodo,
  onToggleSubTodo,
}) => {
  return (
    <div className='todo-list'>
      <h2>Todos</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onAddNote={(note) => onAddNote(todo.id, note)}
          onAddSubTodo={(subTodo) => onAddSubTodo(todo.id, subTodo)}
          onToggleSubTodo={(subTodoId) => onToggleSubTodo(todo.id, subTodoId)}
        />
      ))}
    </div>
  );
};

export default TodoList;
