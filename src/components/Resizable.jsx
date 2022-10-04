import React from 'react';

function Resizable({ children, defaultStyle, setDefaultStyle }) {
  const elem = React.useRef();
  const points = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb'];

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
      zIndex: 100,
    };
    return style;
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const containerStyle = {
    width: `${defaultStyle.width}px`,
    height: `${defaultStyle.height}px`,
  };

  return (
    <div ref={elem} style={containerStyle}>
      {points.map((point) => (
        <div
          key={point}
          className='point'
          style={getPointStyle(point)}
          onMouseDown={(e) => handleMouseDown(e)}
        ></div>
      ))}
      {children}
    </div>
  );
}

export default Resizable;
