// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SearchNotFound({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        검색된 유저 없음.
      </Typography>
      <Typography variant="body2" align="center">
        검색된 유저가 없습니다.
      </Typography>
    </Paper>
  );
}
