import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <div className='category-list'>
      <h2>Categories</h2>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onClick={() => onCategoryClick(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
