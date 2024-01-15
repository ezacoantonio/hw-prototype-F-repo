import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const TireSalesAnalyticsDetailsPopup = ({ onClose }) => {
  useEffect(() => {
    alert("It works");
  }, []);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Welcome to Tire Sales Analytics</DialogTitle>
      <DialogContent>
        {/* Content for Tire Sales Analytics */}
        <Typography variant="body1">
          Here you can view detailed analytics for tire sales.
          {/* Add more content or components here as needed */}
        </Typography>
      </DialogContent>
      {/* Removed DialogActions and Close Button */}
    </Dialog>
  );
};

export default TireSalesAnalyticsDetailsPopup;
