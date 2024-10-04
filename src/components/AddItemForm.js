import React, { useState } from 'react';

const AddItemForm = ({ onAdd, placeholder }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='add-item-form'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default AddItemForm;
