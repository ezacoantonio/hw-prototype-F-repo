import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TireSizeAutocomplete from './TireSizeAutocomplete'; // Import the TireSizeAutocomplete component
import TireBrandAutocomplete from './TireBrandAutocomplete'; // Import the TireBrandAutocomplete component

function SearchPopup({ open, onClose, onSearch }) {
  const [searchParams, setSearchParams] = useState({ size: '', brand: '' });

  const handleSearch = () => {
    onSearch(searchParams);
    onClose();
  };

  const handleSizeSelect = (size) => {
    setSearchParams({ ...searchParams, size });
  };

  const handleBrandSelect = (brand) => {
    setSearchParams({ ...searchParams, brand });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Tires</DialogTitle>
      <DialogContent>
        <TireSizeAutocomplete onSizeSelect={handleSizeSelect} />
        <TireBrandAutocomplete onBrandSelect={handleBrandSelect} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSearch}>Search</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchPopup;
