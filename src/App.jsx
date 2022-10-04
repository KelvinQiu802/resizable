import './App.css';
import Box from './components/Box';
import Resizable from './components/Resizable';
import React from 'react';

function App() {
  const [defaultStyle, setDefaultStyle] = React.useState({
    width: 100,
    height: 100,
    top: 500,
    left: 500,
  });

  return (
    <div className='App'>
      <div className='container'>
        <Resizable
          defaultStyle={defaultStyle}
          setDefaultStyle={setDefaultStyle}
          active={active}
          setActive={setActive}
        >
          <Box />
        </Resizable>
      </div>
    </div>
  );
}

export default App;
