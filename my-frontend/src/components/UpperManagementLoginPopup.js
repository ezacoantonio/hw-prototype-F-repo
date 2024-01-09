import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import config from '../config'; // Adjust the path as necessary

function UpperManagementLoginPopup({ open, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Use credentials from config file
    if (username === config.adminUsername && password === config.adminPassword) {
      onLoginSuccess();
    } else {
      alert('Invalid credentials');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upper Management Login</DialogTitle>
      <DialogContent>
        <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpperManagementLoginPopup;
