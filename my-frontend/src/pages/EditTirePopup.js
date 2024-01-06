// src/components/Navbar.js
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  // Placeholder functions for icon actions
  const handleAddClick = () => {
    console.log('Add icon clicked');
    // Implement add tire functionality
  };

  const handleSearchClick = () => {
    console.log('Search icon clicked');
    // Implement search functionality
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'orange' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="add tire" onClick={handleAddClick}>
          <AddCircleOutlineIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          HW Tire Inventory
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="search tire" onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
