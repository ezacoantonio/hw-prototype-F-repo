import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
//import VpnKeyIcon from "@mui/icons-material/VpnKey"; // Icon for admin access
import AdminAccessPopup from "./AdminAccessPopup";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone"; // Import for Management icon
import UpperManagementLoginPopup from "./UpperManagementLoginPopup";
import AccountCircle from "@mui/icons-material/AccountCircle"; // New import for login/logout icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemIcon from "@mui/material/ListItemIcon"; // New import for ListItemIcon
import ListItemText from "@mui/material/ListItemText"; // New import for ListItemText
import CarIcon from "@mui/icons-material/DirectionsCar"; // New import for Car Icon
import AnalyticsIcon from "@mui/icons-material/Assessment"; // New import for Analytics Icon

function Navbar({
  onAddTire,
  onSearchTire,
  onAdminAccess,
  isAdmin,
  isLoggedIn,
  onLoginLogout,
//   isManager,
  onClassicCarOpen,
  onTireSalesOpen,
}) {
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);
  const [managementAnchorEl, setManagementAnchorEl] = useState(null);
  const isManagementMenuOpen = Boolean(managementAnchorEl);
  const [upperManagementLoginOpen, setUpperManagementLoginOpen] =
    useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleUpperManagementClick = () => {
    setUpperManagementLoginOpen(true);
  };
  useEffect(() => {
    // Fetch the user role from local storage
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const isManager = userRole === "manager";


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

  const handleManagementMenuOpen = (event) => {
    setManagementAnchorEl(event.currentTarget);
  };

  const handleManagementMenuClose = () => {
    setManagementAnchorEl(null);
  };

  const logoUrl =
    "https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg";
  const imageUploadUrl = "https://postimages.org/";
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
    if (option === "addTire" && isAdmin) {
      onAddTire();
    } else if (option === "uploadImage") {
      window.open(imageUploadUrl, "_blank");
    } else if (option === "adminAccess") {
      handleAdminPopupOpen();
    } else if (option === "upperManagement") {
      handleUpperManagementClick();
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left section: Menu Icon and More */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            style={{ color: "orange" }}
            edge="start"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => handleMenuOptionClick("addTire")}
              disabled={!isAdmin}
            >
              <AddCircleIcon
                style={{
                  marginRight: "10px",
                  color: isAdmin ? "orange" : "grey",
                }}
              />
              Add Tire
            </MenuItem>

            <MenuItem onClick={() => handleMenuOptionClick("uploadImage")}>
              <LinkIcon style={{ marginRight: "10px", color: "orange" }} />
              Image Upload
            </MenuItem>
            {/* <MenuItem onClick={() => handleMenuOptionClick("adminAccess")}>
              <VpnKeyIcon style={{ marginRight: "10px", color: "orange" }} />
              Admin Access
            </MenuItem> */}
            {/* <MenuItem
              onClick={() => isManager && handleUpperManagementClick()}
              disabled={!isManager}
            >
              <ManageAccountsTwoToneIcon
                style={{
                  marginRight: "10px",
                  color: isManager ? "orange" : "grey",
                }}
              />
              Upper Management
            </MenuItem> */}
            <MenuItem onClick={handleManagementMenuOpen}>
            <ListItemIcon>
              <ManageAccountsTwoToneIcon style={{ color: "orange" }} />
            </ListItemIcon>

              <ListItemText primary="Management" />
            </MenuItem>
          </Menu>
          {/* Management Submenu */}
          {/* Management Submenu */}
        <Menu
          anchorEl={managementAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isManagementMenuOpen}
          onClose={handleManagementMenuClose}
        >
          <MenuItem onClick={onClassicCarOpen} disabled={!isManager}>
          <ListItemIcon>
              <CarIcon style={{ color: isManager ? "orange" : "grey" }} />
            </ListItemIcon>
            <ListItemText primary="Classic Car Inventory" />
          </MenuItem>
          <MenuItem onClick={onTireSalesOpen} disabled={!isManager}>
          <ListItemIcon>
              <AnalyticsIcon style={{ color: isManager ? "orange" : "grey" }} />
            </ListItemIcon>
            <ListItemText primary="Tire Sales Analytics" />
          </MenuItem>
        </Menu>
        </div>
        <img
          src={logoUrl}
          alt="Company Logo"
          style={{ maxHeight: "50px", minHeight: "20px" }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{ color: "orange" }} onClick={onSearchTire}>
            <SearchIcon />
          </IconButton>
          <IconButton style={{ color: "orange" }} onClick={onLoginLogout}>
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
        onLoginSuccess={() => {
          /* logic to navigate to upper management page */
        }}
      />
    </AppBar>
  );
}

export default Navbar;
