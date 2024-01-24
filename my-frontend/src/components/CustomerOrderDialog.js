import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function CustomerOrderDialog({ open, onClose, onSubmit, tire }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = async () => {
    const userDetails = {
      firstName: localStorage.getItem("firstName"), // Fetch user details from local storage
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email"),
      phoneNumber: localStorage.getItem("phoneNumber"),
    };

    try {
      await onSubmit(userDetails, tire);
      setOrderPlaced(true);
    } catch (error) {
      alert("Failed to place the order. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Order Placed</DialogTitle>
        <DialogContent>
          <Typography>
            Order placed successfully. Check your email for confirmation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Tire</DialogTitle>
      <DialogContent>
        <Typography>Please confirm your order for the tire.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm Order</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerOrderDialog;
