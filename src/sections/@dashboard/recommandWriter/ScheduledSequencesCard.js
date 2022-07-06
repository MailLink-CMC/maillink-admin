/** @jsxImportSource @emotion/react */
import { Button, Card, Grid, IconButton, ListItem, ListItemText, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { fDateTimeSuffix } from '../../../utils/formatTime';
import React from 'react';
import { Fragment } from 'react';

// ----------------------------------------------

const CardStyle = styled(Card)(() => ({
  width: '100%',
  padding: '1rem',
}));

// ----------------------------------------------

ScheduledSequencesCard.propTypes = {
  scheduledSequences: PropTypes.array.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  onSubmitNow: PropTypes.func.isRequired,
};

export default function ScheduledSequencesCard({ scheduledSequences, deleteSchedule, onSubmitNow }) {
  return (
    <CardStyle>
      <Grid container spacing={1}>
        {scheduledSequences.length !== 0 ? (
          <>
            <Grid item xs={3}>
              예약시간
            </Grid>
            <Grid item xs={7}>
              순서
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            {scheduledSequences?.map((item, idx) => {
              const names = item.items.map((item) => item.nickName).join(', ');
              return (
                <Fragment key="idx">
                  <Grid item xs={3}>
                    {fDateTimeSuffix(item.at)}
                  </Grid>
                  <Grid item xs={6}>
                    {names}
                  </Grid>
                  <Grid item xs={2}>
                    <Button onClick={() => onSubmitNow(item)}>지금 등록</Button>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteSchedule(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Fragment>
              );
            })}
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              예약된 추천작가가 없습니다.
            </Typography>
          </Grid>
        )}
      </Grid>
    </CardStyle>
  );
}
