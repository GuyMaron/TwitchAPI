import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LoadingMessage = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="10vh"
      position="absolute"
      top={props.top}
    >
      <Box mt={2}>
        <Typography variant="h6" color="textSecondary">
          {props.message}
        </Typography>
      </Box>
      <CircularProgress color="primary" size={20} thickness={4} sx={{marginTop:'15px',marginLeft:'10px'}} />
    </Box>
  );
};

export default LoadingMessage;