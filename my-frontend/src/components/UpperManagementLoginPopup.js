import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function UpperManagementLoginPopup({ open, onClose, onOpenTireSalesAnalyticsPopup }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upper Management Portal</DialogTitle>
      <DialogContent>
        {/* ... Other buttons and content ... */}
        
        {/* IconButton to open Tire Sales Analytics Popup */}
        <Tooltip title="Tire Sales Analytics">
          <IconButton 
            onClick={onOpenTireSalesAnalyticsPopup}
            color="primary"
            
          >
            <AttachMoneyIcon />
          </IconButton>
        </Tooltip>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose}>Close</Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default UpperManagementLoginPopup;
