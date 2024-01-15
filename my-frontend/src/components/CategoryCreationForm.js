import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, TextField, Alert } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder'; // Importing FolderIcon
import axios from 'axios';

const BASE_API_URL = "http://localhost:4000/api";
//const BASE_API_URL = "https://hw-backend.onrender.com/api";

const CategoryCreationForm = ({ onSuccess }) => {
  const [categoryName, setCategoryName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility

  const handleCreateCategory = async () => {
    const classicCarId = localStorage.getItem('selectedCarId');
    try {
        await axios.post(`${BASE_API_URL}/categories/${classicCarId}`, { name: categoryName });
      setAlertVisible(true); // Show success alert
      setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds
      setCategoryName('');
      onSuccess(); // Call the success callback
    } catch (error) {
      console.error('Category creation error:', error);
    }
  };

  return (
    <div>
      {alertVisible && <Alert severity="success">Category created successfully!</Alert>}
      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        fullWidth
      />
      <Button onClick={handleCreateCategory} sx={{ color: "orange" }}>Create Category</Button>
    </div>
  );
};

const CategoryCreationFormDialog = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <FolderIcon
        sx={{ color: "#FD6A02" }} /> {/* Using FolderIcon */}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Category</DialogTitle>
        <DialogContent>
          <CategoryCreationForm onSuccess={onSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "red" }}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryCreationFormDialog;
