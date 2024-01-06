import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, CardActionArea, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/GetApp'; // Download icon

function TireCard({ tire, onView, onEdit, onDelete, isAdmin }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the tire "${tire.brand} - ${tire.size}"?`)) {
      onDelete(tire._id);
    }
  };

  const imageUrl = tire.imageUrls && tire.imageUrls.length > 0 ? tire.imageUrls[0] : '/default-image.jpg';

  const downloadImage = (url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `TireImage${index}.jpg`; // Customize the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    tire.imageUrls.forEach((url, index) => {
      setTimeout(() => {
        downloadImage(url, index);
      }, index * 1000); // Adjust the delay as needed
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={`${tire.brand} - ${tire.size}`}
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
        <Button size="small" color="primary" onClick={() => onView(tire)}>
          View
        </Button>
        <Button size="small" color="primary" onClick={() => onEdit(tire)}>
          Edit
        </Button>
        {isAdmin && (
          <Button size="small" color="secondary" onClick={handleDelete}>
            <DeleteIcon /> Delete
          </Button>
        )}
        <IconButton onClick={handleDownload} aria-label="download images" size="small" style={{ color: 'orange' }}>
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TireCard;
