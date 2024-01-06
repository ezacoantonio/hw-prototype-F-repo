// src/components/TireViewPopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

function TireViewPopup({ open, onClose, tire }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>View Tire</DialogTitle>
      <DialogContent>
        {tire && tire.imageUrls.map((url, index) => (
          <img key={index} src={url || '/default-image.jpg'} alt={`Tire ${index + 1}`} style={{ width: '100%', marginBottom: '10px' }} />
        ))}
      </DialogContent>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
}

export default TireViewPopup;
