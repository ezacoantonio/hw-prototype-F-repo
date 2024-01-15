import React, { useState } from 'react';
import FileItem from './FileItem';
import CategoryList from './CategoryList';

const CategoryItem = ({ category }) => {
  const [showSubcategories, setShowSubcategories] = useState(false);

  const toggleSubcategories = () => {
    setShowSubcategories(!showSubcategories);
  };

  return (
    <div>
      <div onClick={toggleSubcategories}>
        <span>{category.name}</span>
        {category.subcategories.length > 0 && (
          <span> {showSubcategories ? '▼' : '►'}</span>
        )}
      </div>
      {showSubcategories && (
        <div>
          <CategoryList categories={category.subcategories} />
          <FileItem files={category.files} />
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
