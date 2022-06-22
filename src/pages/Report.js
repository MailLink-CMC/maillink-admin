// material
import { Container, Stack, Typography } from '@mui/material';
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
  return (
    <Page title="신고내역">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            신고 내역
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ReportSort options={SORT_OPTIONS} />
        </Stack>
      </Container>
    </Page>
  );
}
