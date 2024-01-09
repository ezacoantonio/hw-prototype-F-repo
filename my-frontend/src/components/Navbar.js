import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Icon for admin access
import AdminAccessPopup from './AdminAccessPopup';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import UpperManagementLoginPopup from './UpperManagementLoginPopup';
import AccountCircle from '@mui/icons-material/AccountCircle'; // New import for login/logout icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 

function Navbar({ onAddTire, onSearchTire, onAdminAccess, isAdmin,isLoggedIn, onLoginLogout }) {
    const [adminPopupOpen, setAdminPopupOpen] = useState(false);
    const [upperManagementLoginOpen, setUpperManagementLoginOpen] = useState(false);

    const handleUpperManagementClick = () => {
    setUpperManagementLoginOpen(true);
  };


    const handleAdminPopupOpen = () => {
        setAdminPopupOpen(true);
    };
    
    const handleAdminPopupClose = () => {
        setAdminPopupOpen(false);
    };
    
    const handleAdminAccessGranted = (isGranted) => {
        onAdminAccess(isGranted); // Use onAdminAccess from props
        setAdminPopupOpen(false); // Close the popup
    };

    const logoUrl = 'https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg';
    const imageUploadUrl = 'https://postimages.org/';
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOptionClick = (option) => {
        setAnchorEl(null); // Close the menu
        if (option === 'addTire' && isAdmin) {
            onAddTire();
        } else if (option === 'uploadImage') {
            window.open(imageUploadUrl, '_blank');
        } else if (option === 'adminAccess') {
            handleAdminPopupOpen();
        } else if (option === 'upperManagement') {
            handleUpperManagementClick();
        }
    };

    return (
        <AppBar position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left section: Menu Icon and More */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton style={{ color: 'orange' }} edge="start" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem 
                    onClick={() => handleMenuOptionClick('addTire')}
                    disabled={!isAdmin}>
                    <AddCircleIcon style={{ marginRight: '10px', color: isAdmin ? 'orange' : 'grey' }} />
                    Add Tire
                </MenuItem>

                    <MenuItem onClick={() => handleMenuOptionClick('uploadImage')}>
                        <LinkIcon style={{ marginRight: '10px', color: 'orange' }} />
                        Image Upload
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuOptionClick('adminAccess')}>
                        <VpnKeyIcon style={{ marginRight: '10px', color: 'orange' }} />
                        Admin Access
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuOptionClick('upperManagement')}
                    disabled = "true">
                        <ManageAccountsTwoToneIcon style={{ marginRight: '10px', color: 'orange' }} />
                        Upper Management
                    </MenuItem>
                </Menu>
                </div>
                <img src={logoUrl} alt="Company Logo" style={{ maxHeight: '50px', minHeight: '20px' }} />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton style={{ color: 'orange' }} onClick={onSearchTire}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton style={{ color: 'orange' }} onClick={onLoginLogout}>
                        {isLoggedIn ? <ExitToAppIcon /> : <AccountCircle />}
                    </IconButton>
                </div>
            </Toolbar>

            {/* Admin Access Popup */}
            <AdminAccessPopup
                open={adminPopupOpen}
                onClose={handleAdminPopupClose}
                onAdminAccessGranted={handleAdminAccessGranted}
            />

            {/* Upper Management Login Popup */}
            <UpperManagementLoginPopup
                open={upperManagementLoginOpen}
                onClose={() => setUpperManagementLoginOpen(false)}
                onLoginSuccess={() => {/* logic to navigate to upper management page */}}
            />
        </AppBar>
    );
}

export default Navbar;