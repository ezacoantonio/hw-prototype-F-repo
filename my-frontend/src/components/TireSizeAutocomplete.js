import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutocompleteComponent from './Autocomplete'; // Adjust the path as needed

const BACKEND_URL = 'http://localhost:4000/api/tires'; // Use your actual backend URL

const TireSizeAutocomplete = ({ onSizeSelect }) => {
  const [tireSizes, setTireSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchTireSizes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sizes`);
        setTireSizes(response.data);
      } catch (error) {
        console.error('Error fetching tire sizes:', error);
      }
    };

    fetchTireSizes();
  }, []);

  const handleSizeChange = (event, newValue) => {
    setSelectedSize(newValue);
    if (onSizeSelect) {
      onSizeSelect(newValue);
    }
  };

  return (
    <AutocompleteComponent
      options={tireSizes}
      label="Search Tire Size"
      onChange={handleSizeChange}
      value={selectedSize}
      isOptionEqualToValue={(option, value) => option === value}
    />
  );
};

export default TireSizeAutocomplete;
