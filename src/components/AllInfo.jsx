import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';

const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const dayBornOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AllInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/members/${id}`);
        const result = response.data;

        setData(result);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, [id]);

  // if (!data) {
  //   return <div>Loading...</div>
  // }

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/members/${id}`, data);
      setIsEditing(false);
      alert("Successfully edited!");
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this member?');

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/members/${id}`);
        navigate("/new");
        alert("Successfully deleted!");
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const back = () => {

    navigate('/new')

  }

  const editBut = { margin: "5px" };
  const submitBut = { margin: '5px' };
  const backBut = {textAlign: 'right', marginBottom: '20px'};

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container style={{ border: '0px solid #000', padding: '20px' }}>
      <CssBaseline/>
      <Typography variant="h4" gutterBottom>
        {data ? (
          data.name
        ) : (
          <Skeleton variant="text" width={200} />

        )
        }
      </Typography>
      <div style={{textAlign: "right"}}>
        {isEditing ? (
          <Button style={submitBut} variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button style={editBut} variant="contained" color="secondary" onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        
      </div>
      <Button style={backBut} variant="contained" color="primary" onClick={back}>
          Go back
        </Button>
      <Box sx={{ marginTop: 2 }}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data !=null && Object.keys(data).map((property) => {
                  if (property === "id") {
                    return (
                      <TableRow key={property}>
                        <TableCell>{property}</TableCell>
                        <TableCell>{data ? data[property] : <Skeleton variant="text" width={100} />}</TableCell>
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow key={property}>
                      <TableCell>{property}</TableCell>
                      <TableCell>
                        {isEditing ? (
                          property === "dateofbirth" ? (
                            <TextField
                              fullWidth
                              variant="outlined"
                              size="small"
                              type="date"
                              value={data ? formatDate(data[property]) : ""}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  [property]: e.target.value,
                                });
                              }}
                            />
                          ) : property === "dayborn" ? (
                            <Select
                              name="dayborn"
                              value={data ? data[property] : ""}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  [property]: e.target.value,
                                });
                              }}
                            >
                              {dayBornOptions.map((day) => (
                                <MenuItem key={day} value={day}>
                                  {day}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : property === "maritalstatus" ? (
                            <Select
                              name="maritalstatus"
                              value={data ? data[property] : ""}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  [property]: e.target.value,
                                });
                              }}
                            >
                              {maritalStatusOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <TextField
                              fullWidth
                              variant="outlined"
                              size="small"
                              value={data ? data[property] : ""}
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  [property]: e.target.value,
                                });
                              }}
                            />
                          )
                        ) : property === "dateofbirth" ? (
                          data ? formatDate(data[property]) : <Skeleton variant="text" width={100} />
                        ) : (
                          data ? data[property] : <Skeleton variant="text" width={100} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default AllInfo;
