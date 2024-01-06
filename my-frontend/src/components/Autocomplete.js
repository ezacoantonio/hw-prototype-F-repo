import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AutocompleteComponent = ({ options, label, onChange, value }) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      style={{ width: 300 }}
    />
  );
};

export default AutocompleteComponent;
