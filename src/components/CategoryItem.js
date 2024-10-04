import React from 'react';

const CategoryItem = ({ category, onClick }) => {
  return (
    <div className='category-item' onClick={onClick}>
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryItem;
