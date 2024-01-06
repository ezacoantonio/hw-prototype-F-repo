import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from '@mui/material';
import config from '../config'; // Adjust the path based on your project structure

const AdminAccessPopup = ({ open, onClose, onAdminAccessGranted }) => {
  const [adminCode, setAdminCode] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: '', duration: 4000 });

  const handleAdminCodeChange = (event) => {
    setAdminCode(event.target.value);
    if (alert.show) {
      // Hide alert when user starts typing again
      setAlert({ ...alert, show: false });
    }
  };

  const handleSubmit = () => {
    if (adminCode === config.adminAccessCode) {
      onAdminAccessGranted(true);
      onClose();
      // Optional: Set an alert for successful access
      setAlert({ show: true, message: 'Access Granted', severity: 'success' });
    } else {
      setAlert({ show: true, message: 'Access Denied', severity: 'error' });
      // Keep the dialog open on wrong code
      // onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Admin Access</DialogTitle>
      <DialogContent>
        {alert.show && (
          <Alert severity={alert.severity} style={{ marginBottom: '15px' }}>
            {alert.message}
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="adminCode"
          label="Admin Code"
          type="text"
          fullWidth
          value={adminCode}
          onChange={handleAdminCodeChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminAccessPopup;
