// material
import styled from '@emotion/styled';
import { Stack, Container, Typography, Button, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import * as FBDB from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

import { recommandDroppableIds, fbDBURL } from '../constants/strings';
import USERLIST from '../_mock/user';
// components
import Page from '../components/Page';
import { RecommandWriterSubmit, ScheduledSequencesCard, SearchedWriter } from '../sections/@dashboard/recommandWriter';
import { database } from '../firebaseConfig';

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
  const [scheduledSequences, setScheduledSequences] = useState([]);
  const [searchedWriters, setSearchedWriters] = useState(USERLIST);
  const [selectedSearchWriter, setSelectedSearchWriter] = useState([]);
  const [recommandedWriters, setRecommandedWriters] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    FBDB.onValue(FBDB.ref(database, fbDBURL.recommandWriter), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setScheduledSequences([]);
      } else {
        setScheduledSequences(data);
      }
    });
  }, []);

  const onSearchUser = async (query) => {
    console.log(query);
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

  const onScheduleRecommandedWriter = async (afterHours) => {
    if (recommandedWriters.length === 0) {
      setSnackbarMessage('추천작가를 선택해주세요.');
      setSnackbarOpen(true);
      return;
    }
    const id = uuidv4();
    const newScheduled = scheduledSequences
      ? [
          ...scheduledSequences,
          {
            id,
            at: Date.now() + afterHours * 60 * 60 * 1000,
            items: recommandedWriters,
          },
        ]
      : [
          {
            id,
            at: Date.now() + afterHours * 60 * 60 * 1000,
            items: recommandedWriters,
          },
        ];
    try {
      await FBDB.set(FBDB.ref(database, fbDBURL.recommandWriter), newScheduled);
      setRecommandedWriters([]);
    } catch (e) {
      setSnackbarOpen(true);
      setSnackbarMessage('오류가 발생했습니다.');
    }
  };
  const deleteSchedule = async (item) => {
    const newScheduled = scheduledSequences.filter((s) => s.id !== item.id);
    const updates = {
      [fbDBURL.recommandWriter]: newScheduled,
    };
    try {
      await FBDB.update(FBDB.ref(database), updates);
    } catch (e) {
      throw e;
    }
  };

  const onDeleteSchedule = async (item) => {
    try {
      await deleteSchedule(item);
    } catch (e) {
      setSnackbarOpen(true);
      setSnackbarMessage('오류가 발생했습니다.');
    }
  };

  const onSubmitNow = async (item) => {
    try {
      // 서버 등록
      try {
        await deleteSchedule(item);
      } catch (e) {
        setSnackbarOpen(true);
        setSnackbarMessage('개발자에게 문의하세요. 오늘의 추천작가 등록에는 성공했으나, 스케쥴 삭제에 실패했습니다.');
      }
    } catch (e) {
      setSnackbarOpen(true);
      setSnackbarMessage('오늘의 추천작가 등록에 실패했습니다.');
    }
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
            <SearchedWriter searchedWriters={searchedWriters} onSearchUser={onSearchUser} />
            <ButtonBoxStyle>
              <ButtonStyle variant="clear" size="large" disabled aria-label="move right" onClick={addRecommandedWriter}>
                &gt;
              </ButtonStyle>
            </ButtonBoxStyle>
            <RecommandWriterSubmit
              recommandedWriters={recommandedWriters}
              deleteWriter={deleteRecommandedWriter}
              onClickSchedule={onScheduleRecommandedWriter}
            />
          </DragDropContext>
        </Stack>

        <Stack direction="column" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            예약 현황
          </Typography>
          <ScheduledSequencesCard
            scheduledSequences={scheduledSequences}
            onSubmitNow={onSubmitNow}
            deleteSchedule={onDeleteSchedule}
          />
        </Stack>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={7000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Page>
  );
}
