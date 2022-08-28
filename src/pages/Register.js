import React from 'react';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
export default function Register() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onClickGoback = () => {
    navigate(-1);
  };

  return (
    <Page title="작가신청" sx={{ height: '100%' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">작가신청</Typography>
          {pathname !== '/dashboard/register' && (
            <Button variant="contained" onClick={onClickGoback}>
              뒤로가기
            </Button>
          )}
        </Stack>
        <Outlet />
      </Container>
    </Page>
  );
}
