import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 4,
  margin: `0 0 ${8}px 0`,
  background: isDragging ? 'lightgreen' : 'white',
  zIndex: isDragging ? 100 : 0,
  borderBottom: '1px solid #ccc',
  ...draggableStyle,
});

DrragebleItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteWriter: PropTypes.func,
};
export default function DrragebleItem({ item, index, deleteWriter }) {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <ListItem
            secondaryAction={
              deleteWriter && (
                <IconButton edge="end" aria-label="delete" onClick={() => deleteWriter(item)}>
                  <DeleteIcon />
                </IconButton>
              )
            }
          >
            <ListItemAvatar>
              <Avatar
                src={item.imgUrl}
                onClick={() => {
                  window.open(item.imgUrl, '_blank');
                }}
              />
            </ListItemAvatar>
            <ListItemText primary={item.nickName} />
          </ListItem>
        </div>
      )}
    </Draggable>
  );
}
