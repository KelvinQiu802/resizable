import React from 'react';
import direction from '../direction';
import { useDrag } from 'react-dnd';

function Resizable({ children, defaultStyle, setDefaultStyle }) {
  const points = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];

  let boxHeight, boxWidth;

  React.useEffect(() => {
    const box = document.querySelector('.droppable');
    boxHeight = box.offsetHeight;
    boxWidth = box.offsetWidth;
  });

  const getPointStyle = (point) => {
    const { width, height } = defaultStyle;

    const hasT = point.includes('t');
    const hasB = point.includes('b');
    const hasL = point.includes('l');
    const hasR = point.includes('r');

    let newLeft, newTop;
    if (point.length === 2) {
      // 四个角
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下两点
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }
      // 左右两点
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = height / 2;
      }
    }

    const style = {
      position: 'absolute',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      marginLeft: hasR ? '-4px' : '-3px',
      marginTop: '-3px',
      cursor: `${direction[point]}-resize`,
      zIndex: 100,
    };
    return style;
  };

  const handleMouseDown = (e, point) => {
    e.stopPropagation();
    e.preventDefault();

    const pos = { ...defaultStyle };
    const height = pos.height;
    const width = pos.width;
    const top = pos.top;
    const left = pos.left;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMove = (e) => {
      const curX = e.clientX;
      const curY = e.clientY;
      const disX = curX - startX;
      const disY = curY - startY;
      const hasT = point.includes('t');
      const hasB = point.includes('b');
      const hasL = point.includes('l');
      const hasR = point.includes('r');
      const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
      const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
      const newTop = top + (hasT ? disY : 0);
      const newLeft = left + (hasL ? disX : 0);
      // 更新状态
      setDefaultStyle((prev) => ({
        ...prev,
        width: newWidth,
        height: newHeight,
        top: newTop,
        left: newLeft,
      }));
    };

    const handleUp = () => {
      // 清除事件
      console.log(1);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    // 添加事件
    if (e.currentTarget.classList.value.includes('point')) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
    }
  };

  const containerStyle = {
    position: 'absolute',
    width: `${defaultStyle.width}px`,
    height: `${defaultStyle.height}px`,
    top: `${defaultStyle.top}px`,
    left: `${defaultStyle.left}px`,
  };

  const handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const pos = { ...defaultStyle };
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = pos.top;
    const startLeft = pos.left;

    const handleMove = (e) => {
      const curX = e.clientX;
      const curY = e.clientY;
      const finalTop = startTop + curY - startY;
      const finalLeft = startLeft + curX - startX;
      if (
        0 <= finalTop &&
        finalTop <= boxHeight - pos.height &&
        0 <= finalLeft &&
        finalLeft <= boxWidth - pos.width
      ) {
        setDefaultStyle((prev) => ({
          ...prev,
          top: finalTop,
          left: finalLeft,
        }));
      }
    };

    const handleUp = (e) => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    // 添加事件
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  return (
    <div style={containerStyle} onMouseDown={(e) => handleDrag(e)}>
      {points.map((point) => (
        <div
          key={point}
          className='point'
          style={getPointStyle(point)}
          onMouseDown={(e) => handleMouseDown(e, point)}
        ></div>
      ))}
      {children}
    </div>
  );
}

export default Resizable;
