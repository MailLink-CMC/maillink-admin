import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Card, Stack, TablePagination, Typography } from '@mui/material';
import RecommandWriterListToolbar from './RecommandWriterListToolbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { recommandDroppableIds } from '../../../constants/strings';
import DrragebleItem from '../../../components/DroggableItem';

const CardStyle = styled(Card)(() => ({
  width: '50%',
  padding: '1rem',
  paddingBottom: 0,
}));

SearchedWriter.propTypes = {
  searchedWriters: PropTypes.array.isRequired,
  onSearchUser: PropTypes.func.isRequired,
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#fafafa' : '#fff',
});

export default function SearchedWriter({ searchedWriters, onSearchUser }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onSearchUser(filterName);
  };

  return (
    <CardStyle>
      <Typography variant="h6" gutterBottom>
        작가 검색
      </Typography>
      <form onSubmit={onSubmit}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <RecommandWriterListToolbar filterName={filterName} onFilterName={handleFilterByName} />
          <Button type="submit" size="small">
            검색
          </Button>
        </Stack>
      </form>
      {searchedWriters.length !== 0 ? (
        <Droppable droppableId={recommandDroppableIds.SEARCHED_WRITER}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {searchedWriters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <DrragebleItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        <SearchNotFound searchQuery={filterName} />
      )}
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={searchedWriters.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          width: '100%',
        }}
      />
    </CardStyle>
  );
}
