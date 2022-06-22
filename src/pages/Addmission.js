import React from 'react';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function Addmission() {
  return (
    <Page title="작가신청">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          작가신청
        </Typography>
      </Container>
    </Page>
  );
}
