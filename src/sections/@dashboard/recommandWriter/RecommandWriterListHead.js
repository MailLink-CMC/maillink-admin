import PropTypes from 'prop-types';
// material
import { Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

RecommandWriterListHead.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onSelectAllClick: PropTypes.func,
};

export default function RecommandWriterListHead({ rowCount, headLabel, numSelected, onSelectAllClick }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
