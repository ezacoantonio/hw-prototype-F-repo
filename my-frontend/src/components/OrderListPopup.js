import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";

const BACKEND_ORDER_URL = "http://localhost:4000/api/orders";

function OrderListPopup({ open, onClose, orders, onRefreshOrders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(""); // Declare the state variable here
  const [searchOrderId, setSearchOrderId] = useState("");
  // Function to fetch a specific order
  const fetchSpecificOrder = async () => {
    if (!searchOrderId) {
      alert("Please enter an order ID to search");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_ORDER_URL}/${searchOrderId}`);
      const data = await response.json();
      if (response.ok && data) {
        // Wrap data in an array if it's not already an array
        onRefreshOrders(Array.isArray(data) ? data : [data]);
      } else {
        throw new Error(data.message || "Failed to fetch order");
      }
    } catch (error) {
      console.error("Error fetching specific order:", error);
      alert(error.message);
      onRefreshOrders([]); // Set to empty array in case of error
    }
  };
  const getColorBasedOnStatus = (status) => {
    switch (status) {
      case "pending":
        return "rgba(255, 255, 0, 0.5)";
      case "cancelled":
        return "rgba(255, 0, 0, 0.5)";
      case "completed":
        return "rgba(0, 255, 0, 0.5)";
      default:
        return "white";
    }
  };

  const handleChangeStatus = (newStatus) => {
    if (selectedOrderId) {
      fetch(`${BACKEND_ORDER_URL}/${selectedOrderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Status changed successfully:", data);
          onRefreshOrders();
          onClose();
        })
        .catch((error) => {
          console.error("Error changing status:", error);
        });
    } else {
      alert("Please enter an order ID");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Grid container spacing={2} style={{ padding: "10px" }}>
        <Grid item xs={8}>
          <TextField
            label="Search Order ID"
            variant="outlined"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <IconButton color="primary" onClick={fetchSpecificOrder}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Enter Order ID"
            variant="outlined"
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="primary"
            onClick={() => handleChangeStatus("pending")}
          >
            <PendingActionsIcon />
          </IconButton>
          Pending
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="error"
            onClick={() => handleChangeStatus("cancelled")}
          >
            <CancelIcon />
          </IconButton>
          Canelled
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="success"
            onClick={() => handleChangeStatus("completed")}
          >
            <CheckCircleIcon />
          </IconButton>
          Complete
        </Grid>
      </Grid>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {orders.map((order, index) => (
          <React.Fragment key={order._id}>
            <ListItem
              alignItems="flex-start"
              key={index}
              sx={{
                backgroundColor: getColorBasedOnStatus(order.status),
              }}
            >
              <ListItemText
                primary={`Order ID: ${order._id}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`Customer: ${
                        order.customer ? order.customer.firstName : "N/A"
                      } ${order.customer ? order.customer.lastName : "N/A"}`}
                    </Typography>
                    <br />
                    {`Email: ${order.customer ? order.customer.email : "N/A"}`}
                    <br />
                    {`Phone: ${order.customer ? order.customer.phone : "N/A"}`}
                    <br />
                    {`Tire ID: ${
                      order.tireDetails[0] ? order.tireDetails[0].tireId : "N/A"
                    }`}
                    <br />
                    {`Tire Brand: ${
                      order.tireDetails[0] ? order.tireDetails[0].brand : "N/A"
                    }`}
                    <br />
                    {`Tire Size: ${
                      order.tireDetails[0] ? order.tireDetails[0].size : "N/A"
                    }`}
                    <br />
                    {`Tire Price: ${
                      order.tireDetails[0] ? order.tireDetails[0].price : "N/A"
                    }`}
                    <br />
                    {`Tire Status: ${order.status ? order.status : "N/A"}`}
                    <br />
                    {`Tire Location: ${
                      order.tireDetails[0]
                        ? order.tireDetails[0].location
                        : "N/A"
                    }`}
                    <br />
                    {`Tire Set: ${
                      order.tireDetails[0]
                        ? order.tireDetails[0].setInfo
                        : "N/A"
                    }`}
                    <br />
                    {`Tire Season: ${
                      order.tireDetails[0] ? order.tireDetails[0].season : "N/A"
                    }`}
                    <br />
                    {`Tire Notes: ${
                      order.tireDetails[0]
                        ? order.tireDetails[0].treadCondition
                        : "N/A"
                    }`}
                    <br />
                    {`Order Date: ${
                      order.orderDate ? "**" + order.orderDate + "**" : "N/A"
                    }`}
                  </>
                }
              />
            </ListItem>
            {index < orders.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
      {/* Buttons to change status */}
    </Dialog>
  );
}
export default OrderListPopup;
