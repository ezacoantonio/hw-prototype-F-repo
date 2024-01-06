import React, { useState, useEffect } from 'react';
 import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TireEditPopup({ open, onClose, tire, onSave, isAdmin }) {
  const [tireData, setTireData] = useState({
    _id: '',
    brand: '',
    size: '',
    treadCondition: '',
    status: '',
    imageUrls: [],
    location: '',
    setInfo: '',
    season: '',
    price: '',
    notes: ''
  });

  useEffect(() => {
    if (tire) {
      setTireData({
        _id: tire._id,
        brand: tire.brand,
        size: tire.size,
        treadCondition: tire.treadCondition,
        status: tire.status,
        imageUrls: Array.isArray(tire.imageUrls) ? tire.imageUrls : [],
        location: tire.location,
        setInfo: tire.setInfo,
        season: tire.season,
        price: tire.price,
        notes: tire.notes
      });
    }
  }, [tire]);

  const handleChange = (e) => {
    if (e.target.name === 'imageUrls') {
      // Split the string by new lines and trim each URL
      const urls = e.target.value.split('\n').map(url => url.trim());
      setTireData({ ...tireData, imageUrls: urls });
    } else {
      setTireData({ ...tireData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    onSave(tireData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Tire</DialogTitle>
      <DialogContent>
        {/* Brand, Size, and other fields */}
        <TextField name="brand" label="Brand" fullWidth margin="dense" variant="standard" value={tireData.brand} onChange={handleChange} />
        {/* ...other input fields... */}
        <TextField name="size" label="Size" fullWidth margin="dense" variant="standard" value={tireData.size} onChange={handleChange} />
        <FormControl fullWidth margin="dense">
          <InputLabel id="tread-condition-label">Tread Condition</InputLabel>
          <Select labelId="tread-condition-label" name="treadCondition" value={tireData.treadCondition} label="Tread Condition" onChange={handleChange}>
            {['60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'].map(percent => (
              <MenuItem key={percent} value={percent}>{percent}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="season-label">Season</InputLabel>
          <Select labelId="season-label" name="season" value={tireData.season} label="Season" onChange={handleChange}>
            <MenuItem value="All Season">All Season</MenuItem>
            <MenuItem value="Summer">Summer</MenuItem>
            <MenuItem value="Winter">Winter</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="set-info-label">Tire Set</InputLabel>
          <Select labelId="set-info-label" name="setInfo" value={tireData.setInfo} label="Tire Set" onChange={handleChange}>
            <MenuItem value="Set of 2">Set of 2</MenuItem>
            <MenuItem value="Set of 4">Set of 4</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="location-label">Location</InputLabel>
          <Select labelId="location-label" name="location" value={tireData.location} label="Location" onChange={handleChange}>
            <MenuItem value="Toronto">Toronto</MenuItem>
            <MenuItem value="Barrie">Barrie</MenuItem>
            <MenuItem value="Sutton West">Sutton West</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="imageUrls"
          label="Image URLs (one per line)"
          fullWidth
          margin="dense"
          variant="standard"
          value={tireData.imageUrls.join('\n')} // Join the URLs with new lines for display
          onChange={handleChange}
          helperText="Enter each URL on a new line"
          multiline
          minRows={3} // Minimum number of rows
          maxRows={6} // Maximum number of rows before scrolling
        />
        {/* Price field with admin check */}
        <TextField 
          name="price" 
          label="Price" 
          type="number"
          fullWidth 
          margin="dense" 
          variant="standard" 
          value={tireData.price} 
          onChange={handleChange} 
          disabled={!isAdmin} // Disable if not admin
        />

        {/* Notes field */}
        <TextField 
          name="notes" 
          label="Notes" 
          fullWidth 
          margin="dense" 
          variant="standard" 
          multiline
          rows={4}
          value={tireData.notes} 
          onChange={handleChange} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TireEditPopup;
