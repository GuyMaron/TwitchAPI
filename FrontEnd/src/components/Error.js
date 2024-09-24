import React from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button } from '@mui/material';


const errorContainerStyle = {
  padding: '150px',
  textAlign: 'center',
  margin: 'auto',
  marginTop: '64px',
  maxWidth: '1000px',
  maxWeight:"1000px",
  backgroundColor: '#1a1a1a',  
  color: '#ff4081', 
  border: '4px solid #ff4081'
};

const errorTextStyle = {
  fontWeight: 'bold',
  marginBottom: '16px',
  fontSize: '1.5em',  
};

const errorMessageStyle = {
  fontSize: '1.2em', 
};

const Error = ({ setError,errorMessage }) => {
  const navigate=useNavigate()
  return (
    <Paper style={errorContainerStyle} elevation={3}>
      <Typography variant="h6" style={errorTextStyle}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" style={errorMessageStyle}>
        {errorMessage}
      </Typography>
      <Button
       variant="contained" 
       color="success" sx={{"mt":10}}
       onClick={()=>{
        navigate('/')
        setError(null)
        }}>
          Main Page</Button>
    </Paper>
  );
};

export default Error;
