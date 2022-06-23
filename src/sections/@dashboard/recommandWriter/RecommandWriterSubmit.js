import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
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
};

export default function RecommandWriterSubmit({ recommandedWriters }) {
  return (
    <CardStyle>
      <Typography variant="h6" gutterBottom>
        추천작가
      </Typography>
    </CardStyle>
  );
}
