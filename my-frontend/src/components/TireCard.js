import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import OrderIcon from "@mui/icons-material/ShoppingCart"; // Add this
function TireCard({
  tire,
  onView,
  onEdit,
  onDelete,
  onMarkAsSold,
  onMarkAsNotSold,
  isAdmin,
  onOrder,
  daysSinceSold,
}) {
  const isSold = tire.status === "sold";
  const cardStyle = isSold
    ? {
        maxWidth: 345,
        position: "relative",
        backgroundColor: "#e0e0e0", // Graying out the card
        color: "#a0a0a0", // Dimming the text color
      }
    : {
        maxWidth: 345,
        position: "relative",
      };
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the tire "${tire.brand} - ${tire.size}"?`
      )
    ) {
      onDelete(tire._id);
    }
  };

  // Function to open order dialog
  const handleOrderClick = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please sign in to place an order");
      return;
    }
    onOrder(tire);
  };

  const imageUrl =
    tire.imageUrls && tire.imageUrls.length > 0
      ? tire.imageUrls[0]
      : "/default-image.jpg";

  return (
    <Card sx={cardStyle}>
      {isSold && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "red",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "white",
            padding: "2px 5px",
            zIndex: 2,
          }}
        >
          Sold
        </div>
      )}
      <CardActionArea onClick={() => onView(tire)}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={tire.brand}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tire.brand} - {tire.size}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tread Condition: {tire.treadCondition} <br />
            Status: {tire.status} <br />
            Location: {tire.location} <br />
            Tire Set: {tire.setInfo}
            <br />
            Season: {tire.season} <br />
            Price: ${tire.price} <br />
            Notes: {tire.notes}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!isAdmin && !isSold && (
          <Button
            size="small"
            color="primary"
            onClick={handleOrderClick}
            startIcon={<OrderIcon />}
            sx={{ color: "green" }}
          >
            Order
          </Button>
        )}
        {/* The View button is always visible */}
        <Button size="small" color="primary" onClick={() => onView(tire)}>
          View
        </Button>
        {/* The Edit and Delete buttons are only visible if isAdmin is true */}
        {isAdmin && (
          <>
            {isSold ? (
              <Button
                size="small"
                color="secondary"
                onClick={() => onMarkAsNotSold(tire._id)}
                startIcon={<UndoIcon />}
              >
                Not Sold
              </Button>
            ) : (
              <>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => onEdit(tire)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => onMarkAsSold(tire._id)}
                  startIcon={<CheckCircleIcon />}
                >
                  Sold
                </Button>
              </>
            )}
            <Button size="small" color="secondary" onClick={handleDelete}>
              <DeleteIcon /> Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default TireCard;
