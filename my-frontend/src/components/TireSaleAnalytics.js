import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  FormControl,
  Stack,
  Button,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";
import axios from "axios";

const TireSaleAnalytics = ({ onClose }) => {
  const [startDate, setStartDate] = useState({
    year: "2024",
    month: "01",
    day: "01",
  });
  const [endDate, setEndDate] = useState({
    year: "2024",
    month: "01",
    day: "01",
  });
  const [reportData, setReportData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);

  // Define the server endpoint as a variable
  const serverEndpoint =
    "http://localhost:4000/api/tire-sales/reports-by-date-range";
    //const serverEndpoint = "https://hw-backend.onrender.com/api/tire-sales/reports-by-date-range";

    //https://hw-backend.onrender.com/api
  const handleStartDateChange = (event) => {
    const { name, value } = event.target;
    setStartDate({ ...startDate, [name]: value });
  };

  const handleEndDateChange = (event) => {
    const { name, value } = event.target;
    setEndDate({ ...endDate, [name]: value });
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchReportData = async () => {
    const startDateFormat = `${startDate.year}-${startDate.month}-${startDate.day}`;
    const endDateFormat = `${endDate.year}-${endDate.month}-${endDate.day}`;

    // Construct the API URL
    const apiUrl = `${serverEndpoint}?startDate=${startDateFormat}&endDate=${endDateFormat}`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setReportData(response.data);

      // Calculate total sales
      const total = response.data.reduce(
        (sum, item) => sum + item.soldPrice,
        0
      );
      setTotalSales(total);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      setReportData([]);
      setTotalSales(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Tire Sales Analytics</DialogTitle>
      <DialogContent>
        <FormControl sx={{ marginBottom: "5px" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Start Date
          </Typography>
          <TextField
            select
            label="Year"
            name="year"
            value={startDate.year}
            onChange={handleStartDateChange}
            fullWidth
            sx={{ marginBottom: "5px" }}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <MenuItem key={i} value={(2023 + i).toString()}>
                {2023 + i}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Month"
            name="month"
            value={startDate.month}
            onChange={handleStartDateChange}
            fullWidth
            sx={{ marginBottom: "5px" }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={(i + 1).toString().padStart(2, "0")}>
                {(i + 1).toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Day"
            name="day"
            value={startDate.day}
            onChange={handleStartDateChange}
            fullWidth
            sx={{ marginBottom: "5px" }}
          />
        </FormControl>

        <FormControl sx={{ marginBottom: "5px" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            End Date
          </Typography>
          <TextField
            select
            label="Year"
            name="year"
            value={endDate.year}
            onChange={handleEndDateChange}
            fullWidth
            sx={{ marginBottom: "5px" }}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <MenuItem key={i} value={(2023 + i).toString()}>
                {2023 + i}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Month"
            name="month"
            value={endDate.month}
            onChange={handleEndDateChange}
            fullWidth
            sx={{ marginBottom: "5px" }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={(i + 1).toString().padStart(2, "0")}>
                {(i + 1).toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Day"
            name="day"
            value={endDate.day}
            onChange={handleEndDateChange}
            fullWidth
            sx={{ marginBottom: "5px" }}
          />
        </FormControl>

        <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={fetchReportData}
            disabled={loading}
            sx={{ backgroundColor: "orange", color: "white" }}
          >
            Generate Report
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ borderColor: "orange", color: "orange" }}
            >
            Close
          </Button>
        </Stack>

        {reportData.length > 0 ? (
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Sold Tires:
            </Typography>
            <ul>
              {reportData.map((item) => (
                <li key={item._id}>
                  {`${item.size} - $${item.soldPrice} - Sold by: ${
                    item.username || "Unknown"
                  }`}
                  <Typography
                    component="span"
                    sx={{
                      color: "orange",
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {`on ${formatDate(item.soldDate)}`} {/* Format the date */}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography
              variant="body1"
              sx={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "green",
              }}
            >
              Total Sales: ${totalSales}
            </Typography>
          </div>
        ) : (
          !loading && (
            <Alert severity="info" sx={{ marginTop: 2 }}>
              No sales data found for the selected date range.
            </Alert>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TireSaleAnalytics;
