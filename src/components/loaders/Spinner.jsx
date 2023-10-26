import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel() {
  return (
    <Box sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)"}} >
      <CircularProgress sx={{color:"orangered"}} />
    </Box>
  );
}