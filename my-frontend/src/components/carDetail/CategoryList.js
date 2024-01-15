import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories }) => {
  return (
    <div>
      {categories.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
