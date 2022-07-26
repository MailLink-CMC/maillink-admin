import React from 'react';
// material
import { Card } from '@mui/material';
// components
import { useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------
export default function RegisterWriterDetail() {
  const location = useLocation();
  console.log(location);
  return <Card sx={{ width: '100%', height: '100%', marginTop: 4 }}></Card>;
}
