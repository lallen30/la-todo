import React, { useState, useEffect } from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import TodoList from './components/TodoList';
import AddItemForm from './components/AddItemForm';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [todos, setTodos] = useState({});

  // Load data from local storage on initial render
  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem('categories')) || [];
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || {};
    setCategories(storedCategories);
    setTodos(storedTodos);
  }, []);

  // Save data to local storage whenever categories or todos change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [categories, todos]);

  const addCategory = (name) => {
    const newCategory = {
      id: Date.now(),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const addTodo = (categoryId, text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      notes: [],
      subTodos: [],
    };
    setTodos({
      ...todos,
      [categoryId]: [...(todos[categoryId] || []), newTodo],
    });
  };

  const toggleTodo = (categoryId, todoId) => {
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  const addNote = (categoryId, todoId, note) => {
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map((todo) =>
        todo.id === todoId ? { ...todo, notes: [...todo.notes, note] } : todo
      ),
    });
  };

  const addSubTodo = (categoryId, todoId, subTodoText) => {
    const newSubTodo = {
      id: Date.now(),
      text: subTodoText,
      completed: false,
    };
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map((todo) =>
        todo.id === todoId
          ? { ...todo, subTodos: [...todo.subTodos, newSubTodo] }
          : todo
      ),
    });
  };

  const toggleSubTodo = (categoryId, todoId, subTodoId) => {
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subTodos: todo.subTodos.map((subTodo) =>
                subTodo.id === subTodoId
                  ? { ...subTodo, completed: !subTodo.completed }
                  : subTodo
              ),
            }
          : todo
      ),
    });
  };

  return (
    <div className='App'>
      <h1>Todo App</h1>
      <p className='welcome-message'>
        Welcome to your personal Todo App! Start by adding a category, then add
        todos to each category.
      </p>
      <div className='main-content'>
        <div className='categories-section'>
          <CategoryList
            categories={categories}
            onCategoryClick={setSelectedCategory}
          />
          <AddItemForm onAdd={addCategory} placeholder='Add a new category' />
        </div>
        {selectedCategory && (
          <div className='todos-section'>
            <h2>{categories.find((c) => c.id === selectedCategory).name}</h2>
            <TodoList
              todos={todos[selectedCategory] || []}
              onToggle={(todoId) => toggleTodo(selectedCategory, todoId)}
              onAddNote={(todoId, note) =>
                addNote(selectedCategory, todoId, note)
              }
              onAddSubTodo={(todoId, subTodo) =>
                addSubTodo(selectedCategory, todoId, subTodo)
              }
              onToggleSubTodo={(todoId, subTodoId) =>
                toggleSubTodo(selectedCategory, todoId, subTodoId)
              }
            />
            <AddItemForm
              onAdd={(text) => addTodo(selectedCategory, text)}
              placeholder='Add a new todo'
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
