import './App.css';
import Box from './components/Box';
import Resizable from './components/Resizable';
import Droppable from './components/Droppable';
import React from 'react';

function App() {
  const [defaultStyle, setDefaultStyle] = React.useState({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  });

  return (
    <div className='App'>
      <Droppable setDefaultStyle={setDefaultStyle} defaultStyle={defaultStyle}>
        <Resizable
          defaultStyle={defaultStyle}
          setDefaultStyle={setDefaultStyle}
        >
          <Box />
        </Resizable>
      </Droppable>
    </div>
  );
}

export default App;
