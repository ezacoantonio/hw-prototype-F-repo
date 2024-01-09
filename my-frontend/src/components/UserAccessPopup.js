import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, CardMedia } from '@mui/material';

function UserAccessPopup({ open, onClose, onLogin, onRegister }) {
    const [isLoginView, setIsLoginView] = useState(true); // To toggle between login and register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secretCode, setSecretCode] = useState(''); // For registration

    const handleLogin = () => {
        onLogin(username, password);
    };

    const handleRegister = () => {
        onRegister(username, password, secretCode);
    };

    const buttonStyle = {
        backgroundColor: 'orange', // Solid orange color
        color: 'white', // White text
        '&:hover': {
            backgroundColor: 'darkorange' // Darker orange on hover
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg"
                    alt="Company Logo"
                />
                {isLoginView ? 'Login' : 'Create Account'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLoginView && (
                    <TextField
                        margin="dense"
                        label="Secret Code (optional)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} style={buttonStyle}>Cancel</Button>
                {isLoginView ? (
                    <Button onClick={handleLogin} style={buttonStyle}>Login</Button>
                ) : (
                    <Button onClick={handleRegister} style={buttonStyle}>Register</Button>
                )}
                <Button 
                    onClick={() => setIsLoginView(!isLoginView)} 
                    style={buttonStyle}>
                    {isLoginView ? 'Create a new account' : 'Back to Login'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserAccessPopup;
