import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import axios from "axios";

// Define the API endpoint URLs as variables
const API_BASE_URL = "http://localhost:4000/api"; // Development URL
// const API_BASE_URL = "https://hw-backend.onrender.com/api"; // Production URL
const FILES_ENDPOINT = `${API_BASE_URL}/files`;

const FileCreationForm = ({ categories, onSuccess }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileNotes, setFileNotes] = useState("");
  const [fileLinks, setFileLinks] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCreateFile = async () => {
    const classicCarId = localStorage.getItem("selectedCarId");
    try {
      await axios.post(
        `${FILES_ENDPOINT}/${classicCarId}/${selectedCategory}`,
        { name: fileName, notes: fileNotes, pictureLinks: fileLinks }
      );
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
      setFileName("");
      setFileNotes("");
      setFileLinks([]);
      onSuccess();
    } catch (error) {
      console.error("File creation error:", error);
    }
  };

  const handleLinkChange = (e) => {
    const links = e.target.value.split("\n");
    setFileLinks(links);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Notes"
        value={fileNotes}
        onChange={(e) => setFileNotes(e.target.value)}
        fullWidth
      />
      <TextField
        label="Image Links (one per line)"
        multiline
        rows={4}
        value={fileLinks.join("\n")}
        onChange={handleLinkChange}
        fullWidth
      />
      <Button onClick={handleCreateFile}>Create File</Button>
      {alertVisible && (
        <Alert severity="success">File created successfully!</Alert>
      )}
    </div>
  );
};

const FileCreationFormDialog = ({ categories }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <InsertDriveFileIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New File</DialogTitle>
        <DialogContent>
          <FileCreationForm categories={categories} onSuccess={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileCreationFormDialog;
