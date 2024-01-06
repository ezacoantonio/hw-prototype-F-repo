import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TireCard({ tire, onView, onEdit, onDelete, isAdmin }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the tire "${tire.brand} - ${tire.size}"?`)) {
      onDelete(tire._id);
    }
  };

  const imageUrl = tire.imageUrls && tire.imageUrls.length > 0 ? tire.imageUrls[0] : '/default-image.jpg';

  return (
    <Card sx={{ maxWidth: 345 }}>
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
            Tire Set: {tire.setInfo}<br />
            Season: {tire.season} <br />
            Price: ${tire.price} <br />
            Notes: {tire.notes}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* The View button is always visible */}
        <Button size="small" color="primary" onClick={() => onView(tire)}>
          View
        </Button>
        {/* The Edit and Delete buttons are only visible if isAdmin is true */}
        {isAdmin && (
          <>
            <Button size="small" color="primary" onClick={() => onEdit(tire)}>
              Edit
            </Button>
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
