// material
import styled from '@emotion/styled';
import { Stack, Container, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
// components
import Page from '../components/Page';
import { RecommandWriterSubmit, WriterSearch } from '../sections/@dashboard/recommandWriter';

//----------------------------
const ButtonBoxStyle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '1rem',
}));

const ButtonStyle = styled(Button)(() => ({
  height: '2rem',
}));

// ----------------------------------------------------------------------

export default function RecommandWriter() {
  const [selectedSearchWriter, setSelectedSearchWriter] = useState([]);
  const [recommandedWriters, setRecommandedWriters] = useState([]);

  const addSelectedSearchWriter = (writer) => {
    setSelectedSearchWriter(writer);
  };

  const addRecommandedWriter = () => {
    setRecommandedWriters((prev) => {
      const newSelectedSearchWriter = selectedSearchWriter.filter((writer) => !prev.some((w) => w.id === writer.id));
      return [...prev, ...newSelectedSearchWriter];
    });
    setSelectedSearchWriter([]);
  };

  return (
    <Page title="오늘의 추천작가">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            오늘의 추천작가
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <WriterSearch selectedSearchWriter={selectedSearchWriter} addSelectedSearchWriter={addSelectedSearchWriter} />
          <ButtonBoxStyle>
            <ButtonStyle variant="contained" size="small" aria-label="move right" onClick={addRecommandedWriter}>
              &gt;
            </ButtonStyle>
          </ButtonBoxStyle>
          <RecommandWriterSubmit recommandedWriters={recommandedWriters} />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            예약 현황
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
