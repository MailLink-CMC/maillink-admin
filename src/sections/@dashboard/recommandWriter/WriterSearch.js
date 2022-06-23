import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import RecommandWriterListHead from './RecommandWriterListHead';
import RecommandWriterListToolbar from './RecommandWriterListToolbar';
import USERLIST from '../../../_mock/user';
import Label from '../../../components/Label';
import SearchNotFound from '../../../components/SearchNotFound';

const CardStyle = styled(Card)(() => ({
  width: '50%',
  padding: '1rem',
  paddingBottom: 0,
}));

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

WriterSearch.propTypes = {
  selectedSearchWriter: PropTypes.array.isRequired,
  addSelectedSearchWriter: PropTypes.func.isRequired,
};

export default function WriterSearch({ selectedSearchWriter, addSelectedSearchWriter }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      addSelectedSearchWriter(USERLIST);
      return;
    }
    addSelectedSearchWriter([]);
  };

  const handleClick = (event, item) => {
    const selectedIndex = selectedSearchWriter.map((item) => item.id).indexOf(item.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedSearchWriter, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedSearchWriter.slice(1));
    } else if (selectedIndex === selectedSearchWriter.length - 1) {
      newSelected = newSelected.concat(selectedSearchWriter.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedSearchWriter.slice(0, selectedIndex),
        selectedSearchWriter.slice(selectedIndex + 1)
      );
    }
    addSelectedSearchWriter(newSelected);
  };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const isUserNotFound = USERLIST.length === 0;

  return (
    <CardStyle>
      <Typography variant="h6" gutterBottom>
        작가 검색
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <RecommandWriterListToolbar filterName={filterName} handleFilterByName={handleFilterByName} />
        <Button size="small">검색</Button>
      </Stack>
      <TableContainer>
        <Table>
          <RecommandWriterListHead
            headLabel={TABLE_HEAD}
            rowCount={USERLIST.length}
            numSelected={selectedSearchWriter.length}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const { id, name, status, avatarUrl } = row;
              const isItemSelected = selectedSearchWriter.map((item) => item.id).indexOf(id) !== -1;

              return (
                <TableRow
                  hover
                  key={id}
                  tabIndex={-1}
                  role="checkbox"
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row)} />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={name} src={avatarUrl} />
                      <Typography variant="subtitle2" noWrap>
                        {name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                      {sentenceCase(status)}
                    </Label>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {isUserNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery={filterName} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={USERLIST.length}
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
