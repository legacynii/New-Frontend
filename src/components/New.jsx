import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {TextField, Select, MenuItem, Typography, TableSortLabel, AppBar,Toolbar,Button,Table,TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, Container, CssBaseline,} from '@material-ui/core';
import './new.css';
import { Link } from 'react-router-dom';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';

const buttonStyle = {
  margin: '28px 0',
  backgroundColor: '#607573',
  borderRadius: '7px',
};

const inputStyle = {
  margin: '20px',
  width: '70%',
};



const New = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [loading, setLoading] = useState(true); // Define the loading state and set it to true initially
  
  const navigate = useNavigate();





  useEffect(() => {
    axios.get('https://new-backend-jiuq.onrender.com/members')
      .then(response => {
        setSearchResults(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

 
    

  const handleSearch = async () => {
    try {
       //validate the search query
       if (!searchTerm || searchTerm.length < 3) {
        console.error('Please enter at least 3 characters');
        return;
      }
      const response = await axios.get('https://new-backend-jiuq.onrender.com/api/search', {
        params: {
          query: searchTerm,
          fields: ['name', 'occupation'],
        },
      });

      if (response && response.data) {
        const data = response.data;
        setSearchResults(data);
      } else {
        console.error('API response is missing data.');
      }
      
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  

  const handleSort = (columnName) => {
      // Clone the current searchResults to avoid mutating state directly
      const sortedData = [...searchResults];
      
      //Sort data based on the selected column
    sortedData.sort((a, b) => {
      if (a.name === null || a.dateofbirth === null || a.residenceaddress === null || a.occupation === null || a.phonenumber === null || a.maritalstatus === null || b.name === null || b.dateofbirth === null || b.residenceaddress === null || b.occupation === null || b.phonenumber === null || b.maritalstatus === null) {
        // If any of the properties are null, skip that row
        return 0;
      }
        if (columnName === 'name') {
          return a.name.localeCompare(b.name);
        } else if (columnName === 'dateofbirth') {
          return new Date(a.dateofbirth) - new Date(b.dateofbirth);
        } else if (columnName === 'residenceaddress') {
          return a.residenceaddress.localeCompare(b.residenceaddress);
        } else if (columnName === 'occupation') {
          return a.occupation.localeCompare(b.occupation);
        } else if (columnName === 'phonenumber') {
          return a.phonenumber.localeCompare(b.phonenumber);
        } else if (columnName === 'maritalstatus') {
          return a.maritalstatus.localeCompare(b.maritalstatus);
        } 
          return 0;
        
      });
      setSearchResults(sortedData);
  };

      // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const logoutStyle = {
    color: 'red',
    fontSize: '30px',
    cursor: 'pointer',
    marginTop: "18px"
  }
 
  const logStyle = {
    marginTop: '20px',
    fontSize: '1.1rem',
    fontWeight: '300',
    
  }

  const tableH = {
    backgroundColor:  'rgb(200 239 235 / 88%)'
  }
  const handleLogout = () => {
    navigate('/');
    alert("You are logged out!")
    // Clear the token from localStorage
  localStorage.removeItem('authToken');
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
       <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Church Database</Typography>
            <div style={{ flexGrow: 1 }}></div>
            <Typography style={logStyle}>logout</Typography>
              <LogoutIcon  onClick={ handleLogout} style={logoutStyle} />
            
          </Toolbar>
          
        </AppBar>

        <TextField
          style={inputStyle}
          id="search-bar"
          label="Enter your search query"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            style: {
              fontSize: '16px',
              borderRadius: '7px',
            },
          }}
        />

        <Button
          variant="contained"
          type="submit"
          id="search-button"
          onClick={handleSearch}
          color="primary"
          style={buttonStyle}
        >
          Search
        </Button>

        <Select
          style={{ margin: '20px' }}
          value={filterOption}
          onChange={handleFilterChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        <Button 
          component={Link}
          to={'/NewM'}
          variant='outlined'
          color='primary'
        >
             Add New
        </Button>
      
        <TableContainer component={Paper} style={{ maxHeight: 420, overflowY: 'auto' }}>
          {loading ? (
            <Skeleton variant='rect' height={300} />
          ) : (
            <Table>
              <TableHead style={tableH}>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      onClick={() => handleSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      onClick={() => handleSort('dateofbirth')}
                    >
                      Date of Birth
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      onClick={() => handleSort('residenceaddress')}
                    >
                      Place Of Residence
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      onClick={() => handleSort('occupation')}
                    >
                      Occupation
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      onClick={() => handleSort('phonenumber')}
                    >
                      Contact
                    </TableSortLabel>
                  </TableCell>
              
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      onClick={() => handleSort('maritalstatus')}
                    >
                      Marital Status
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
            
              <TableBody>
                {searchResults.filter((result) => {
                  if (result.name === null) {
                    return false;
                  }
                  return searchTerm.toLowerCase() === '' ? result : result.name.toLowerCase().includes(searchTerm);
                }).map((result) => (

                  // <TableRow key={result.id}  className='rowHighlight'>
                  <TableRow
                    key={result.id}
                    className='rowHighlight'
                    component={Link}
                    to={`/members/${result.id}`}
                    style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    <TableCell>{loading ? (<Skeleton variant="text" width={150} />) : (result.name)}</TableCell>
                    <TableCell>{loading ? (<Skeleton variant="text" width={150} />) : (formatDate(result.dateofbirth))}</TableCell>
                    <TableCell>{loading ? (<Skeleton variant="text" width={150} />) : (result.residenceaddress)}</TableCell>
                    <TableCell>{loading ? (<Skeleton variant="text" width={150} />) : (result.occupation)}</TableCell>
                    <TableCell>{loading ? (<Skeleton variant="text" width={150} />) : (result.phonenumber)}</TableCell>
                    <TableCell>{loading ? (<Skeleton variant="text" width={150} />) : (result.maritalstatus)}</TableCell>
                     
                  </TableRow>
                      
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
       
      </div>
    </Container>
    
  );
};

export default New;
         
                     
                      
                      

                
             
              