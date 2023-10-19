import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';

const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const dayBornOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const NewMember = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [residenceaddress, setResidenceAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [dayborn, setDayborn] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [hometownaddress, setHomeTownAddress] = useState("");
  const [parentsname, setParentsName] = useState("");
  const [age, setAge] = useState("");
  
    const [loadingName, setLoadingName] = useState(false);
    const [loadingDateOfBirth, setLoadingDateOfBirth] = useState(false);
    const [loadingResidenceAddress, setLoadingResidenceAddress] = useState(false);
    const [loadingOccupation, setLoadingOccupation] = useState(false);
    const [loadingPhoneNumber, setLoadingPhoneNumber] = useState(false);
    const [loadingMaritalStatus, setLoadingMaritalStatus] = useState(false);
    const [loadingDayborn, setLoadingDayborn] = useState(false);
    const [loadingEmailAddress, setLoadingEmailAddress] = useState(false);
    const [loadingHobbies, setLoadingHobbies] = useState(false);
    const [loadingHometownAddress, setLoadingHometownAddress] = useState(false);
    const [loadingParentsName, setLoadingParentsName] = useState(false);
    const [loadingAge, setLoadingAge] = useState(false);




  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!dateofbirth || !name || !phonenumber || !residenceaddress) {
      alert('Kindly fill out the rest of the data!');
      return;
    }

      try {
        
          setLoadingName(true);
          setLoadingDateOfBirth(true);
          setLoadingDayborn(true);
          setLoadingEmailAddress(true);
          setLoadingHobbies(true);
          setLoadingHometownAddress(true);
          setLoadingMaritalStatus(true);
          setLoadingOccupation(true);
          setLoadingParentsName(true);
          setLoadingPhoneNumber(true);
          setLoadingAge(true);
          setLoadingResidenceAddress(true);

      const body = { name, dateofbirth, residenceaddress, occupation, phonenumber, maritalstatus, dayborn, emailaddress, hobbies, hometownaddress, parentsname, age };
          const response = await axios.post('http://localhost:5000/members', body);
        // await axios.post('https://ch-database-backend-4m31.onrender.com/members', body);
        // Redirect or handle success as needed
        navigate("/new");
        alert("Successfully added a new member!");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Container style={{ border: '0px solid #000', padding: '40px', alignContent:"center" }}>
      <CssBaseline />
      <Typography variant="h4" gutterBottom>
        New Member
      </Typography>
      <form onSubmit={onSubmitForm}>
        <FormControl>
          <Button style={{ padding: "4px", marginBottom: "10px" }} variant="contained" color="primary" type="submit">
            Save
          </Button>
        </FormControl>
        <Box sx={{ marginTop: 2 }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableBody>
                  {[
                    { label: "Name", state: name, setState: setName, loading: loadingName },
                    { label: "Date of birth", state: dateofbirth, setState: setDateOfBirth, loading: loadingDateOfBirth },
                    { label: "Residence Address", state: residenceaddress, setState: setResidenceAddress, loading: loadingResidenceAddress },
                    { label: "Occupation", state: occupation, setState: setOccupation, loading: loadingOccupation},
                    { label: "Contact", state: phonenumber, setState: setPhoneNumber, loading: loadingPhoneNumber },
                    { label: "Marital Status", state: maritalstatus, setState: setMaritalStatus, loading: loadingMaritalStatus },
                    { label: "Dayborn", state: dayborn, setState: setDayborn, options: dayBornOptions, loading: loadingDayborn },
                    { label: "Email Address", state: emailaddress, setState: setEmailAddress, loading: loadingEmailAddress },
                    { label: "Hobbies", state: hobbies, setState: setHobbies, loading: loadingHobbies },
                    { label: "Hometown Address", state: hometownaddress, setState: setHomeTownAddress, loading: loadingHometownAddress },
                    { label: "Names Of Parents", state: parentsname, setState: setParentsName, loading: loadingParentsName },
                    { label: "Age", state: age, setState: setAge, loading: loadingAge },
                  ].map(({ label, state, setState, loading }) => (
                    <TableRow key={label}>
                      <TableCell>{label}</TableCell>
                      <TableCell>
                       {loading ? (
                            <Skeleton variant = "text" width={150}/>
                         ) : 
                        label === "Date of birth" ? (
                          <TextField
                            type="date"
                            name="dateofbirth"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        ) : label === "Dayborn"? (
                            <Select
                            name="dayborn"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            >
                            {dayBornOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                            </Select>
                        
                        ) : label === "Marital Status" ? (
                          <Select
                            name="maritalstatus"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            {maritalStatusOptions.map((status) => (
                              <MenuItem key={status} value={status}>
                                {status}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <TextField
                            name={label.toLowerCase().replace(" ", "")}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </form>
    </Container>
  );
};

export default NewMember;

