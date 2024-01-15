import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define API endpoint
const CATEGORIES_ENDPOINT = 'http://localhost:4000/api/categories'; // Update this with your categories endpoint
//const CATEGORIES_ENDPOINT = 'https://hw-backend.onrender.com/api/categories'; 


const CategoryList = ({ classicCarId }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories based on classicCarId using the defined endpoint
    axios
      .get(`${CATEGORIES_ENDPOINT}/${classicCarId}`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, [classicCarId]);

  return (
    <div>
      <h2>Categories:</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
