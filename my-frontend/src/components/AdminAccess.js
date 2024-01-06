// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
// import config from '../config'; // Adjust the path as needed

// const AdminAccessPopup = ({ open, onClose, onAdminAccessGranted }) => {
//   const [adminCode, setAdminCode] = useState('');

//   const handleAdminCodeChange = (event) => {
//     setAdminCode(event.target.value);
//   };

//   const handleSubmit = () => {
//     if (adminCode === config.ADMIN_ACCESS_CODE) {
//       onAdminAccessGranted(true);
//       onClose();
//     } else {
//       alert('Access Denied');
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Admin Access</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           id="adminCode"
//           label="Admin Code"
//           type="text"
//           fullWidth
//           value={adminCode}
//           onChange={handleAdminCodeChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AdminAccessPopup;
