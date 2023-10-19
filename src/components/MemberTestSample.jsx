import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, Paper } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableBody } from '@material-ui/core';
 
let imageStyle= {
    height: 'fitContent',
    backgroundImage:'url("https://img.freepik.com/free-photo/wide-angle-shot-singletree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    color: 'white',
    opacity: '2px',
  };
  const searchStyle = {
    margin: "50px",
    width: '80%'
  };
  const filterStyle = {
    // marginTop: ' 1px',
    // marginLeft: '145px',
    width: '50%',
    paddingTop: '10px',
    paddingLeft: '10px'
  
    
};
  
const TableStyle = {
  
}

const tabRow = {
  color: 'white',
  fontweight: '100',
    lineHeight:'1.5rem'
  
}
const TabCell = {
  color: 'white',
  fontWeight: '800',
  fontSize:'20px',
  lineHeight:'1.7rem'
}
  

const members = ({ data }) => [
  
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation: 'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation: 'Teacher' },
    <br></br>,
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    { id: 1, name: 'John Doe', dateOfBirth: '1990-05-15', PlaceOfResidence: 'Aboabo', Occupation:'Teacher' },
    
    
    <Table style={TableStyle}  >
      <TableHead >
        <TableRow style={tabRow}>
          <TableCell style={TabCell}>Name</TableCell>
          <TableCell style={TabCell}>Date of Birth</TableCell>
          <TableCell style={TabCell}>Place Of Residence</TableCell>
          <TableCell style={TabCell}>Occupation</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        
        {data.map((member) => (
          <TableRow key={member.id}>
            <TableCell style={tabRow}>{member.name}</TableCell>
            <TableCell style={tabRow}>{member.dateOfBirth}</TableCell>
            <TableCell style={tabRow}>{member.PlaceOfResidence}</TableCell>
            <TableCell style={tabRow} >{member.Occupation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  ];
  
function All() {
  return (
      <div>
      <AppBar position="static" >
       <Toolbar>
        <Typography variant="h6">Church Database</Typography>
       </Toolbar>
      </AppBar>

    <Paper style={imageStyle}> 
      <main>
        <div >
        <TextField
          label="Search"
          variant="outlined"
          style={searchStyle}
          autoComplete='name'
          width='auto'
          borderRadius='21px'
        />
          <Button variant="contained"  style={ filterStyle}  color='primary'>Search</Button>
          </div>
      </main>
    </Paper>
    </div>
  )
}

export default All
