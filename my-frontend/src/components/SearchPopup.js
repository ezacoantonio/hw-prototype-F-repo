import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TireSizeAutocomplete from './TireSizeAutocomplete'; 
import TireBrandAutocomplete from './TireBrandAutocomplete';

function SearchPopup({ open, onClose, onSearch }) {
  const [searchParams, setSearchParams] = useState({
      size: '',
      brand: '',
      sortBy: '',
      sortOrder: 'asc'
  });

  const handleSearch = () => {
      onSearch(searchParams);
      onClose();
  };

  // const handleSizeSelect = (size) => {
  //   setSearchParams({ ...searchParams, size });
  // };

  // const handleBrandSelect = (brand) => {
  //   setSearchParams({ ...searchParams, brand });
  // };

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Search Tires</DialogTitle>
        <DialogContent>
            <TireSizeAutocomplete onSizeSelect={(size) => setSearchParams({ ...searchParams, size })} />
            <TireBrandAutocomplete onBrandSelect={(brand) => setSearchParams({ ...searchParams, brand })} />

            {/* Sorting Options */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={searchParams.sortBy}
                    onChange={(e) => setSearchParams({ ...searchParams, sortBy: e.target.value })}
                    label="Sort By"
                >
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="size">Size</MenuItem>
                    <MenuItem value="setInfo">Number of Sets</MenuItem>
                    {/* Add other sorting options here */}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Order</InputLabel>
                <Select
                    value={searchParams.sortOrder}
                    onChange={(e) => setSearchParams({ ...searchParams, sortOrder: e.target.value })}
                    label="Order"
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSearch}>Search</Button>
        </DialogActions>
    </Dialog>
);
}

export default SearchPopup;