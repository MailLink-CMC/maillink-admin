import React from 'react';
// material
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { Outlet, useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------
export default function Register() {
  return (
    <Page title="작가신청" sx={{ height: '100%' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Typography variant="h4">작가신청</Typography>
        <Outlet />
      </Container>
    </Page>
  );
}
