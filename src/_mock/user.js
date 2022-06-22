import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: index,
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: 'ASd',
  status: sample(['active', 'banned']),
}));

export default users;
