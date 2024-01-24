import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Alert, Stack, Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import TireCard from "./components/TireCard";
import AddTirePopup from "./components/AddTirePopup";
import TireEditPopup from "./components/TireEditPopup";
import TireViewPopup from "./components/TireViewPopup";
import SearchPopup from "./components/SearchPopup";
import SearchResultsPopup from "./components/SearchResultsPopup";
import UserAccessPopup from "./components/UserAccessPopup";
import ClassicCarInventory from "./components/ClassicCarInventory";
import TireSaleAnalytics from "./components/TireSaleAnalytics";
import UpperManagementLoginPopup from "./components/UpperManagementLoginPopup";
import TireSalesAnalyticsDetailsPopup from "./components/TireSalesAnalyticsDetailsPopup";
import CustomerOrderDialog from "./components/CustomerOrderDialog";
import { jwtDecode } from "jwt-decode";
import OrderListPopup from "./components/OrderListPopup";

//const BACKEND_URL = 'https://hw-backend.onrender.com/api/tires';
// const USER_URL = "https://hw-backend.onrender.com/api/users";
//const BACKEND_ORDER_URL = "https://hw-backend.onrender.com/api/orders";
//const BACKEND_ORDER_URL_EMAIL = "https://hw-backend.onrender.com/api/orders/";
const BACKEND_ORDER_URL_EMAIL = "http://localhost:4000/api/orders/";
const BACKEND_ORDER_URL = "http://localhost:4000/api/orders/list-all";
const BACKEND_URL = "http://localhost:4000/api/tires";
const USER_URL = "http://localhost:4000/api/users";

function App() {
  // const [currentView, setCurrentView] = useState('main');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserAccessPopup, setShowUserAccessPopup] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [showClassicCarInventoryPopup, setShowClassicCarInventoryPopup] =
    useState(false);
  const [showTireSalesAnalyticsPopup, setShowTireSalesAnalyticsPopup] =
    useState(false);
  const [
    showTireSalesAnalyticsDetailsPopup,
    setShowTireSalesAnalyticsDetailsPopup,
  ] = useState(false);

  const [tires, setTires] = useState([]);
  const [selectedTire, setSelectedTire] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isResultsPopupOpen, setIsResultsPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [isOrderListPopupOpen, setIsOrderListPopupOpen] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    message: "",
    duration: 4000,
  });

  const [isUpperManagementPopupOpen, setIsUpperManagementPopupOpen] =
    useState(false);
  // New state variables for Management popups
  const [showClassicCarPopup, setShowClassicCarPopup] = useState(false);
  const [showTireSalesPopup, setShowTireSalesPopup] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderingTire, setOrderingTire] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setIsAdmin(
        decodedToken.role === "employee" || decodedToken.role === "manager"
      );
      setIsManager(decodedToken.role === "manager"); // Set isManager true only for 'manager' role
    }
    fetchTires();
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    // Fetch orders from your API and update state
    try {
      const response = await axios.get(BACKEND_ORDER_URL);
      setOrders(response.data);
      const pendingCount = response.data.filter(
        (order) => order.status === "pending"
      ).length;
      setPendingOrdersCount(pendingCount);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrderTire = (tire) => {
    setOrderingTire(tire);
    setIsOrderDialogOpen(true);
  };

  const handleOrderSubmit = async (orderDetails, tire) => {
    const orderData = {
      tireId: tire._id,
      customer: {
        firstName: orderDetails.firstName,
        lastName: orderDetails.lastName,
        email: orderDetails.email,
        phone: orderDetails.phoneNumber,
      },
    };

    try {
      const response = await axios.post(BACKEND_ORDER_URL_EMAIL, orderData, {
        headers: {
          "Content-Type": "application/json",
          username: localStorage.getItem("username"), // Include username header
        },
      });

      if (response.status === 201) {
        setAlert({
          show: true,
          severity: "success",
          message:
            "Order placed successfully. Check your email for confirmation.",
        });
        setIsOrderDialogOpen(false);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Failed to place the order. Please try again.",
      });
    }
  };

  const fetchTires = async () => {
    try {
      const response = await axios.get(BACKEND_URL);
      setTires(response.data);
    } catch (error) {
      console.error("Error fetching tires:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Error fetching tires: " + error.message,
      });
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(`${USER_URL}/login`, {
        username,
        password,
      });
      setIsLoggedIn(true);
      setIsAdmin(
        response.data.role === "employee" || response.data.role === "manager"
      );
      localStorage.setItem("token", response.data.token); // Store the token
      localStorage.setItem("role", response.data.role); // Optionally store the role
      localStorage.setItem("username", username); // Store the username
      setAlert({
        show: true,
        severity: "success",
        message: "Login successful!",
      });
      setShowUserAccessPopup(false);
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Login failed: " + error.response.data,
      });
    }
  };

  const handleRegister = async (
    username,
    password,
    secretCode,
    firstName,
    lastName,
    email,
    phone
  ) => {
    try {
      await axios.post(`${USER_URL}/add`, {
        username,
        password,
        secretCode,
        firstName,
        lastName,
        email,
        phone,
      });
      setAlert({
        show: true,
        severity: "success",
        message: "Registration successful!",
      });
      setShowUserAccessPopup(false);
    } catch (error) {
      console.error("Registration error:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Registration failed: " + error.response.data,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("token"); // Remove the token
    localStorage.removeItem("role");
    localStorage.removeItem("username"); // Remove the role
    setAlert({
      show: true,
      severity: "success",
      message: "Logged out successfully!",
    });
  };

  const handleLoginLogoutIconClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      setShowUserAccessPopup(true);
    }
  };

  const handleAddTire = async (tireData) => {
    try {
      await axios.post(BACKEND_URL, tireData);
      fetchTires();
      setAlert({
        show: true,
        severity: "success",
        message: "Tire added successfully!",
      });
    } catch (error) {
      console.error("Error adding tire:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Failed to add tire: " + error.message,
      });
    }
  };

  const handleEditTire = (tire) => {
    setSelectedTire(tire);
    setIsEditPopupOpen(true);
  };

  const handleMarkAsNotSold = async (tireId) => {
    try {
      // API call to mark the tire as not sold and remove the sale record
      await axios.put(`${BACKEND_URL}/${tireId}/not-sold`);
      fetchTires();
      setAlert({
        show: true,
        severity: "success",
        message:
          "Tire marked as not sold successfully and sale record removed.",
      });
    } catch (error) {
      console.error("Error in marking tire as not sold:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Failed to mark tire as not sold: " + error.message,
      });
    }
  };

  //   const handleMarkAsNotSold = async (tireId) => {
  //     try {
  //       await axios.put(`${BACKEND_URL}/${tireId}/status`, {
  //         status: "not sold",
  //       });
  //       setTires(
  //         tires.map((tire) =>
  //           tire._id === tireId ? { ...tire, status: "not sold" } : tire
  //         )
  //       );
  //       setAlert({
  //         show: true,
  //         severity: "success",
  //         message: "Tire marked as not sold successfully!",
  //       });
  //     } catch (error) {
  //       console.error("Error marking tire as not sold:", error);
  //       setAlert({
  //         show: true,
  //         severity: "error",
  //         message: "Error marking tire as not sold: " + error.message,
  //       });
  //     }
  //   };

  const handleSaveTire = async (editedTireData) => {
    try {
      if (!editedTireData._id) {
        console.error("Tire ID is undefined");
        setAlert({
          show: true,
          severity: "error",
          message: "Tire ID is undefined",
        });
        return;
      }
      await axios.put(`${BACKEND_URL}/${editedTireData._id}`, editedTireData);
      fetchTires();
      setIsEditPopupOpen(false);
      setAlert({
        show: true,
        severity: "success",
        message: "Tire edited successfully!",
      });
    } catch (error) {
      console.error("Error saving edited tire:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Failed to save edited tire: " + error.message,
      });
    }
  };

  const handleViewTire = (tire) => {
    setSelectedTire(tire);
    setIsViewPopupOpen(true);
  };

  const handleSearch = async (searchParams) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/search`, {
        params: searchParams,
      });
      setSearchResults(response.data);
      setIsResultsPopupOpen(true);
      setAlert({
        show: true,
        severity: "info",
        message: `Found ${response.data.length} tire(s)`,
      });
    } catch (error) {
      console.error("Error searching tires:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Error searching tires: " + error.message,
      });
    }
  };

  const handleDeleteTire = async (tireId) => {
    if (!isAdmin) {
      setAlert({
        show: true,
        severity: "error",
        message: "Admin access required to delete tires.",
      });
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/${tireId}`);
      fetchTires();
      setAlert({
        show: true,
        severity: "success",
        message: "Tire deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting tire:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Error deleting tire: " + error.message,
      });
    }
  };

  const handleCloseSearchResults = () => {
    setIsResultsPopupOpen(false);
  };

  const handleMarkAsSold = async (tireId) => {
    const username = localStorage.getItem("username"); // Fetch the user ID from local storage

    try {
      await axios.put(`${BACKEND_URL}/${tireId}/status`, {
        status: "sold",
        username: username,
      });
      fetchTires();
      setAlert({
        show: true,
        severity: "success",
        message: "Tire marked as sold successfully!",
      });
    } catch (error) {
      console.error("Error marking tire as sold:", error);
      setAlert({
        show: true,
        severity: "error",
        message: "Error marking tire as sold: " + error.message,
      });
    }
  };

  // Function to open Classic Car Inventory Popup
  const openClassicCarInventoryPopup = () => {
    setShowClassicCarInventoryPopup(true);
  };

  // Function to close Classic Car Inventory Popup
  const closeClassicCarInventoryPopup = () => {
    setShowClassicCarInventoryPopup(false);
  };

  const handleOrdersOpen = () => {
    if (orders.length === 0) {
      fetchOrders(); // Fetch orders if not already done
    }
    setIsOrderListPopupOpen(true); // Open the popup
  };

  // const refreshOrders = async () => {
  //   try {
  //     const response = await axios.get(BACKEND_ORDER_URL);
  //     setOrders(response.data);
  //     // Update other relevant state if needed, like pendingOrdersCount
  //   } catch (error) {
  //     console.error("Error refreshing orders:", error);
  //   }
  // };

  const handleRefreshSpecificOrder = (newOrders) => {
    // Make sure newOrders is an array
    setOrders(Array.isArray(newOrders) ? newOrders : []);
  };

  // Function to close Tire Sales Analytics Popup
  const closeTireSalesAnalyticsPopup = () => {
    setShowTireSalesAnalyticsPopup(false);
  };

  // Function to open the Upper Management Login Popup
  const openUpperManagementPopup = () => {
    setIsUpperManagementPopupOpen(true);
  };

  // Function to close the Upper Management Login Popup
  const closeUpperManagementPopup = () => {
    setIsUpperManagementPopupOpen(false);
  };

  // Function to open Tire Sales Analytics Details Popup
  const openTireSalesAnalyticsDetailsPopup = () => {
    setShowTireSalesAnalyticsDetailsPopup(true);
  };

  // Function to close Tire Sales Analytics Details Popup
  const closeTireSalesAnalyticsDetailsPopup = () => {
    setShowTireSalesAnalyticsDetailsPopup(false);
  };

  // Handlers for Management popups
  //    const handleClassicCarPopupOpen = () => setShowClassicCarPopup(true);
  const handleClassicCarPopupClose = () => setShowClassicCarPopup(false);
  const handleTireSalesPopupOpen = () => setShowTireSalesPopup(true);
  const handleTireSalesPopupClose = () => setShowTireSalesPopup(false);

  return (
    <Router>
      <div>
        {alert.show && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Stack sx={{ width: "auto" }} spacing={2}>
              <Alert variant="outlined" severity={alert.severity}>
                {alert.message}
              </Alert>
            </Stack>
          </div>
        )}

        <Navbar
          onAddTire={() => setIsAddPopupOpen(true)}
          onSearchTire={() => setIsSearchPopupOpen(true)}
          onAdminAccess={setIsAdmin}
          isAdmin={isAdmin}
          isLoggedIn={isLoggedIn}
          isManager={isManager}
          onLoginLogout={handleLoginLogoutIconClick}
          onUpperManagementAccess={openUpperManagementPopup}
          onClassicCarOpen={openClassicCarInventoryPopup}
          onTireSalesOpen={handleTireSalesPopupOpen}
          onOrdersOpen={handleOrdersOpen}
          pendingOrdersCount={pendingOrdersCount}
        />
        {/* Management Popups */}
        {showClassicCarPopup && (
          <ClassicCarInventory onClose={handleClassicCarPopupClose} />
        )}
        {showTireSalesPopup && (
          <TireSaleAnalytics onClose={handleTireSalesPopupClose} />
        )}
        {/* {showClassicCarInventoryPopup && (
          <ClassicCarInventory onClose={closeClassicCarInventoryPopup} />
        )} */}
        {showTireSalesAnalyticsPopup && (
          <TireSaleAnalytics onClose={closeTireSalesAnalyticsPopup} />
        )}
        {showTireSalesAnalyticsDetailsPopup && (
          <TireSalesAnalyticsDetailsPopup
            onClose={closeTireSalesAnalyticsDetailsPopup}
          />
        )}
        <UpperManagementLoginPopup
          open={isUpperManagementPopupOpen}
          onClosae={closeUpperManagementPopup}
          onOpenClassicCarInventory={openClassicCarInventoryPopup}
          onOpenTireSalesAnalyticsDetails={openTireSalesAnalyticsDetailsPopup}
        />

        {showTireSalesAnalyticsDetailsPopup && (
          <TireSalesAnalyticsDetailsPopup
            onClose={closeTireSalesAnalyticsDetailsPopup}
          />
        )}
        <Routes>
          <Route
            path="/classic-car-inventory"
            element={<ClassicCarInventory />}
          />
          <Route path="/tire-sales-analytics" element={<TireSaleAnalytics />} />
          <Route
            exact
            path="/"
            element={
              <>
                <UserAccessPopup
                  open={showUserAccessPopup}
                  onClose={() => setShowUserAccessPopup(false)}
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
                <AddTirePopup
                  open={isAddPopupOpen}
                  onClose={() => setIsAddPopupOpen(false)}
                  onAddTire={handleAddTire}
                />
                <TireEditPopup
                  open={isEditPopupOpen}
                  onClose={() => setIsEditPopupOpen(false)}
                  tire={selectedTire}
                  onSave={handleSaveTire}
                  isAdmin={isAdmin}
                />
                <TireViewPopup
                  open={isViewPopupOpen}
                  onClose={() => setIsViewPopupOpen(false)}
                  tire={selectedTire}
                />
                <SearchPopup
                  open={isSearchPopupOpen}
                  onClose={() => setIsSearchPopupOpen(false)}
                  onSearch={handleSearch}
                />
                <SearchResultsPopup
                  open={isResultsPopupOpen}
                  onClose={handleCloseSearchResults}
                  searchResults={searchResults}
                  onEdit={handleEditTire}
                  onView={handleViewTire}
                  onDelete={handleDeleteTire}
                  onMarkAsSold={handleMarkAsSold}
                  onMarkAsNotSold={handleMarkAsNotSold}
                  isAdmin={isAdmin}
                />
                <ClassicCarInventory
                  open={showClassicCarInventoryPopup} // Pass open prop here
                  onClose={closeClassicCarInventoryPopup}
                />
                <CustomerOrderDialog
                  open={isOrderDialogOpen}
                  onClose={() => setIsOrderDialogOpen(false)}
                  onSubmit={handleOrderSubmit}
                  tire={orderingTire}
                />
                {/* Order List Popup */}
                <OrderListPopup
                  open={isOrderListPopupOpen}
                  onClose={() => setIsOrderListPopupOpen(false)}
                  orders={orders}
                  onRefreshOrders={handleRefreshSpecificOrder}
                />

                <Grid container spacing={2} style={{ padding: 20 }}>
                  {tires.map((tire) => (
                    <Grid item xs={12} sm={6} md={4} key={tire._id}>
                      <TireCard
                        tire={tire}
                        onEdit={handleEditTire}
                        onView={handleViewTire}
                        onDelete={handleDeleteTire}
                        onMarkAsSold={handleMarkAsSold}
                        onMarkAsNotSold={handleMarkAsNotSold}
                        isAdmin={isAdmin}
                        onOrder={handleOrderTire} // Pass handleOrderTire as a prop
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
