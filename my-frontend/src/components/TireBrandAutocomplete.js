import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutocompleteComponent from './Autocomplete'; // Adjust the path as needed

const BACKEND_URL = 'http://localhost:4000/api/tires'; // Use your actual backend URL

const TireBrandAutocomplete = ({ onBrandSelect }) => {
  const [tireBrands, setTireBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const fetchTireBrands = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/brands`);
        setTireBrands(response.data);
      } catch (error) {
        console.error('Error fetching tire brands:', error);
      }
    };

    fetchTireBrands();
  }, []);

  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    if (onBrandSelect) {
      onBrandSelect(newValue);
    }
  };

  return (
    <AutocompleteComponent
      options={tireBrands}
      label="Search Tire Brand"
      onChange={handleBrandChange}
      value={selectedBrand}
      isOptionEqualToValue={(option, value) => option === value}
    />
  );
};

export default TireBrandAutocomplete;
