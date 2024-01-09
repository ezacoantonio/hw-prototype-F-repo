import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TireCard from './TireCard';

function SearchResultsPopup({ 
    open, 
    onClose, 
    searchResults, 
    onEdit, 
    onView, 
    onDelete, 
    onMarkAsSold, // Add this
    onMarkAsNotSold, // Add this if implemented
    isAdmin 
}) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Search Results</DialogTitle>
            <DialogContent>
                {searchResults.map((tire) => (
                    <TireCard
                        key={tire._id}
                        tire={tire}
                        onEdit={onEdit}
                        onView={onView}
                        onDelete={onDelete}
                        onMarkAsSold={onMarkAsSold} // Pass onMarkAsSold function
                        onMarkAsNotSold={onMarkAsNotSold} // Pass onMarkAsNotSold function if implemented
                        isAdmin={isAdmin}
                    />
                ))}
            </DialogContent>
        </Dialog>
    );
}

export default SearchResultsPopup;
