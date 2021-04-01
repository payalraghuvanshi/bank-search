import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import styled from 'styled-components';

const SearchBar = ({
  viewFavs,
  setViewFavs,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity
}) => {
  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangeFavs = (event) => {
    setViewFavs(event.target.checked);
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <StyledFormControl variant="outlined" xs={5} md={4} xl={2}>
          <InputLabel id="city-search-label">City</InputLabel>
          <Select
            labelId="city-search-label"
            id="city-select-label"
            value={selectedCity}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="MUMBAI">Mumbai</MenuItem>
            <MenuItem value="BANGALORE">Bangalore</MenuItem>
            <MenuItem value="CHENNAI">Chennai</MenuItem>
            <MenuItem value="PUNE">Pune</MenuItem>
            <MenuItem value="INDORE">Indore</MenuItem>
          </Select>
        </StyledFormControl>
      </Grid>
      <Grid item xs={7} md={8} xl={10}>
        <StyledTextField
          id="bank-search-input"
          label="Search bank"
          variant="outlined"
          value={searchQuery}
          onChange={handleQuery}
        />
      </Grid>
      <Grid item xs={12}>
        <StyledFormControlLabel
          control={
            <Checkbox
              checked={viewFavs}
              onChange={handleChangeFavs}
              name="viewFavs"
              color="primary"
            />
          }
          label="Views Favorites"
        />
      </Grid>
    </Grid>
  );
};

export default SearchBar;

const StyledFormControl = styled(FormControl)`
  margin: 1em;
  min-width: 120px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  &&& {
    margin-left: 0;
  }
`;
