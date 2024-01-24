import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CardMedia,
  Stack,
} from "@mui/material";
import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone"; // Icon for create account
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone"; // Icon for back
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone"; // Icon for login

function UserAccessPopup({ open, onClose, onLogin, onRegister }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  // New state variables for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async () => {
    const success = await onLogin(username, password);
    if (success) {
      localStorage.setItem("username", username);
    }
  };

  const handleRegister = () => {
    // Pass individual state values as separate arguments to the onRegister function
    onRegister(
      username,
      password,
      secretCode,
      firstName,
      lastName,
      email,
      phone
    );
  };

  const buttonStyle = (color) => ({
    color: "white",
    backgroundColor: color,
    "&:hover": {
      backgroundColor: color,
    },
    fontSize: "0.8rem", // smaller font size
    padding: "3px 10px", // reduced padding
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <CardMedia
          component="img"
          height="140"
          image="https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg"
          alt="Company Logo"
        />
        {isLoginView ? "Login" : "Create Account"}
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
          <>
            <TextField
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Secret Code (optional)"
              type="text"
              fullWidth
              variant="standard"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={onClose}
            variant="contained"
            startIcon={<ReplyTwoToneIcon />}
            style={buttonStyle("red")}
          >
            {isLoginView ? "Cancel" : "Back"}
          </Button>
          {isLoginView ? (
            <Button
              onClick={handleLogin}
              variant="contained"
              endIcon={<LoginTwoToneIcon />}
              style={buttonStyle("orange")}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleRegister}
              variant="contained"
              endIcon={<ThumbUpTwoToneIcon />}
              style={buttonStyle("green")}
            >
              Register
            </Button>
          )}
          <Button
            onClick={() => setIsLoginView(!isLoginView)}
            variant="contained"
            endIcon={
              isLoginView ? <ThumbUpTwoToneIcon /> : <LoginTwoToneIcon />
            }
            style={buttonStyle(isLoginView ? "green" : "orange")}
          >
            {isLoginView ? "Create Account" : "Login"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default UserAccessPopup;
