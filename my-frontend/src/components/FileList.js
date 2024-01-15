import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

// Define the API endpoint URLs as variables
const API_BASE_URL = "http://localhost:4000/api"; // Development URL
// const API_BASE_URL = "https://hw-backend.onrender.com/api"; // Production URL
const FILES_ENDPOINT = `${API_BASE_URL}/files`;

const FileList = ({ classicCarId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Check if classicCarId is defined before making the request
    if (classicCarId) {
      axios
        .get(`${FILES_ENDPOINT}/${classicCarId}`)
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => console.error('Error fetching files:', error));
    }
  }, [classicCarId]);

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Files:
      </Typography>
      <List sx={{ width: '100%' }}>
        {files.map((file, index) => (
          <React.Fragment key={file._id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="body1">
                    {file.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2">
                    {file.notes}
                  </Typography>
                }
              />
            </ListItem>
            {index < files.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default FileList;
