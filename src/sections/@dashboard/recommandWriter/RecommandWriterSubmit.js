/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Stack, SvgIcon, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import { recommandDroppableIds } from '../../../constants/strings';
import DrragebleItem from '../../../components/DroggableItem';
import { ReactComponent as DragDropIcon } from '../../../assets/icons/drag_drop.svg';
// component

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(() => ({
  width: '50%',
  padding: '1rem',
  paddingBottom: 0,
}));
// ----------------------------------------------------------------------

RecommandWriterSubmit.propTypes = {
  recommandedWriters: PropTypes.array.isRequired,
  deleteWriter: PropTypes.func,
  onClickSchedule: PropTypes.func.isRequired,
};
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#fafafa' : '#fff',
  height: '100%',
});

export default function RecommandWriterSubmit({ recommandedWriters, deleteWriter, onClickSchedule }) {
  const [selectedTime, setSelectedTime] = useState(1);

  const selectTime = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <CardStyle>
      <Stack spacing={2}>
        <Typography variant="h6" gutterBottom>
          추천작가
        </Typography>
        <Droppable droppableId={recommandDroppableIds.RECOMMANDED_WRITER}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {recommandedWriters.length !== 0 ? (
                <>
                  {recommandedWriters.map((item, index) => (
                    <DrragebleItem key={item.id} item={item} index={index} deleteWriter={deleteWriter} />
                  ))}
                  {provided.placeholder}
                </>
              ) : (
                <div
                  css={css`
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <DragDropIcon
                    width="50%"
                    fill="#cccccc"
                    style={{
                      color: 'gray',
                      margin: '0 auto',
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </Droppable>
        <Stack direction="row" justifyContent={'space-between'} sx={{ width: '100%' }}>
          <Button variant="contained">즉시 등록</Button>
          <Stack direction="row" spacing={2}>
            <FormControl variant="standard">
              <InputLabel id="recommandWriterTimeSelectLabel">시간</InputLabel>
              <Select
                labelId="recommandWriterTimeSelectLabel"
                id="recommandWriterTimeSelect"
                label={'시간'}
                value={selectedTime}
                onChange={selectTime}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: '10rem',
                    },
                  },
                }}
              >
                {new Array(24)
                  .fill(1)
                  .map((_, idx) => idx + 1)
                  .map((item, idx) => (
                    <MenuItem value={item} key={`select_${idx}`}>
                      {item}시간
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => onClickSchedule(selectedTime)}>
              예약
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </CardStyle>
  );
}
