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

function Navbar({ onAddTire, onSearchTire, onAdminAccess, isAdmin }) {
    const [adminPopupOpen, setAdminPopupOpen] = useState(false);

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

    return (
        <AppBar position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton
                    style={{ color: 'orange' }}
                    edge="start"
                    onClick={handleMenuOpen}
                >
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
                    <MenuItem onClick={onAddTire}>
                        <AddCircleIcon style={{ marginRight: '10px', color: 'orange' }} />
                        Add Tire
                    </MenuItem>
                    <MenuItem onClick={() => window.open(imageUploadUrl, '_blank')}>
                        <LinkIcon style={{ marginRight: '10px', color: 'orange' }} />
                        Image Upload
                    </MenuItem>
                    <MenuItem onClick={handleAdminPopupOpen}>
                        <VpnKeyIcon style={{ marginRight: '10px', color: 'orange' }} />
                        Admin Access
                    </MenuItem>
                </Menu>

                <img src={logoUrl} alt="Company Logo" style={{ maxHeight: '50px', minHeight: '20px' }} />

                <IconButton style={{ color: 'orange' }} onClick={onSearchTire}>
                    <SearchIcon />
                </IconButton>
            </Toolbar>

            {/* Admin Access Popup */}
            <AdminAccessPopup
                open={adminPopupOpen}
                onClose={handleAdminPopupClose}
                onAdminAccessGranted={handleAdminAccessGranted}
            />
        </AppBar>
    );
}

export default Navbar;
