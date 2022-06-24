// material
import styled from '@emotion/styled';
import { Stack, Container, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { recommandDroppableIds } from '../constants/strings';
import USERLIST from '../_mock/user';
// components
import Page from '../components/Page';
import { RecommandWriterSubmit, SearchedWriter } from '../sections/@dashboard/recommandWriter';

//----------------------------
const ButtonBoxStyle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: '1rem',
}));

const ButtonStyle = styled(Button)(() => ({
  height: '2rem',
  color: 'black !important',
}));

// ----------------------------------------------------------------------

export default function RecommandWriter() {
  const [searchedWriters, setSearchedWriters] = useState(USERLIST);
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

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (destination === null || source === null) {
      return;
    }

    if (
      recommandDroppableIds.SEARCHED_WRITER === source.droppableId &&
      recommandDroppableIds.RECOMMANDED_WRITER === destination.droppableId &&
      recommandedWriters.length < 5
    ) {
      const newSearchedWriters = [...searchedWriters];
      const newRecommandedWriters = [...recommandedWriters];
      const [removed] = newSearchedWriters.splice(source.index, 1);
      newRecommandedWriters.splice(destination.index, 0, removed);
      setSearchedWriters(newSearchedWriters.filter((item) => item.id !== removed.id));
      setRecommandedWriters(newRecommandedWriters);
    } else if (
      recommandDroppableIds.RECOMMANDED_WRITER === source.droppableId &&
      recommandDroppableIds.RECOMMANDED_WRITER === destination.droppableId
    ) {
      const newRecommandedWriters = [...recommandedWriters];
      const [removed] = newRecommandedWriters.splice(source.index, 1);
      newRecommandedWriters.splice(destination.index, 0, removed);
      setRecommandedWriters(newRecommandedWriters);
    }
  };

  const deleteRecommandedWriter = (writer) => {
    setRecommandedWriters((prev) => prev.filter((w) => w.id !== writer.id));
  };

  return (
    <Page title="오늘의 추천작가" sx={{ height: '100%' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            오늘의 추천작가
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            <SearchedWriter searchedWriters={searchedWriters} />
            <ButtonBoxStyle>
              <ButtonStyle variant="clear" size="large" disabled aria-label="move right" onClick={addRecommandedWriter}>
                &gt;
              </ButtonStyle>
            </ButtonBoxStyle>
            <RecommandWriterSubmit recommandedWriters={recommandedWriters} deleteWriter={deleteRecommandedWriter} />
          </DragDropContext>
        </Stack>

        <Stack direction="column" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            예약 현황
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
