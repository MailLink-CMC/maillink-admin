// material
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import { ReportSort } from '../sections/@dashboard/report';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Report() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onClickGoback = () => {
    navigate(-1);
  };
  return (
    <Page title="신고내역" sx={{ height: '100%' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            신고 내역
          </Typography>
          {pathname !== '/dashboard/report' && (
            <Button variant="contained" onClick={onClickGoback}>
              뒤로가기
            </Button>
          )}
        </Stack>

        <Paper elevation={3} sx={{ width: '100%', height: '100%' }}>
          <Outlet />
        </Paper>
      </Container>
    </Page>
  );
}
