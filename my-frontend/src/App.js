import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Stack } from '@mui/material';
import Navbar from './components/Navbar';
import TireCard from './components/TireCard';
import AddTirePopup from './components/AddTirePopup';
import TireEditPopup from './components/TireEditPopup';
import TireViewPopup from './components/TireViewPopup';
import SearchPopup from './components/SearchPopup';
import SearchResultsPopup from './components/SearchResultsPopup';
import Grid from '@mui/material/Grid';

const BACKEND_URL = 'http://localhost:4000/api/tires';

function App() {
    const [tires, setTires] = useState([]);
    const [selectedTire, setSelectedTire] = useState(null);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [isResultsPopupOpen, setIsResultsPopupOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [alert, setAlert] = useState({ show: false, severity: '', message: '',duration: 4000 });
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchTires();
    }, []);

    const fetchTires = async () => {
        try {
            const response = await axios.get(BACKEND_URL);
            setTires(response.data);
        } catch (error) {
            console.error('Error fetching tires:', error);
            setAlert({ show: true, severity: 'error', message: 'Error fetching tires: ' + error.message });
        }
    };

    const handleAddTire = async (tireData) => {
        try {
            await axios.post(BACKEND_URL, tireData);
            fetchTires();
            setAlert({ show: true, severity: 'success', message: 'Tire added successfully!' });
        } catch (error) {
            console.error('Error adding tire:', error);
            setAlert({ show: true, severity: 'error', message: 'Failed to add tire: ' + error.message });
        }
    };

    const handleEditTire = (tire) => {
        setSelectedTire(tire);
        setIsEditPopupOpen(true);
    };

    const handleSaveTire = async (editedTireData) => {
        try {
            if (!editedTireData._id) {
                console.error("Tire ID is undefined");
                setAlert({ show: true, severity: 'error', message: 'Tire ID is undefined' });
                return;
            }
            await axios.put(`${BACKEND_URL}/${editedTireData._id}`, editedTireData);
            fetchTires();
            setIsEditPopupOpen(false);
            setAlert({ show: true, severity: 'success', message: 'Tire edited successfully!' });
        } catch (error) {
            console.error('Error saving edited tire:', error);
            setAlert({ show: true, severity: 'error', message: 'Failed to save edited tire: ' + error.message });
        }
    };

    const handleViewTire = (tire) => {
        setSelectedTire(tire);
        setIsViewPopupOpen(true);
    };

    const handleSearch = async (searchParams) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/search`, { params: searchParams });
            setSearchResults(response.data);
            setIsResultsPopupOpen(true);
            setAlert({ show: true, severity: 'info', message: `Found ${response.data.length} tire(s)` });
        } catch (error) {
            console.error('Error searching tires:', error);
            setAlert({ show: true, severity: 'error', message: 'Error searching tires: ' + error.message });
        }
    };

    const handleDeleteTire = async (tireId) => {
        if (!isAdmin) {
            setAlert({ show: true, severity: 'error', message: 'Admin access required to delete tires.' });
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/${tireId}`);
            fetchTires();
            setAlert({ show: true, severity: 'success', message: 'Tire deleted successfully!' });
        } catch (error) {
            console.error('Error deleting tire:', error);
            setAlert({ show: true, severity: 'error', message: 'Error deleting tire: ' + error.message });
        }
    };

    const handleCloseSearchResults = () => {
      setIsResultsPopupOpen(false);
  };

  const handleAdminAccess = (access) => {
    setIsAdmin(access);
};
    return (
        <div>
            {alert.show && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <Stack sx={{ width: 'auto' }} spacing={2}>
                        <Alert variant="outlined" severity={alert.severity}>
                            {alert.message}
                        </Alert>
                    </Stack>
                </div>
            )}
            <Navbar
                onAddTire={() => setIsAddPopupOpen(true)}
                onSearchTire={() => setIsSearchPopupOpen(true)}
                onAdminAccess={handleAdminAccess}
                isAdmin={isAdmin}
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
                isAdmin={isAdmin}
            />
            <Grid container spacing={2} style={{ padding: 20 }}>
                {tires.map((tire) => (
                    <Grid item xs={12} sm={6} md={4} key={tire._id}>
                        <TireCard
                            tire={tire}
                            onEdit={handleEditTire}
                            onView={handleViewTire}
                            onDelete={handleDeleteTire}
                            isAdmin={isAdmin}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default App;
