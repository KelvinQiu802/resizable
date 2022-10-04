import React from 'react';
import Box from './Box';
import { useDragLayer } from 'react-dnd';

function CustomDragLayer({ defaultStyle }) {
  const { isDragging, item } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={{ ...defaultStyle, position: 'absolute' }}>
      <Box />
    </div>
  );
}

export default CustomDragLayer;
