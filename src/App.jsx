import './App.css';
import Box from './components/Box';
import Resizable from './components/Resizable';
import React from 'react';

function App() {
  const [defaultStyle, setDefaultStyle] = React.useState({
    width: 100,
    height: 100,
  });

  return (
    <div className='App'>
      <div className='container'>
        <Resizable
          defaultStyle={defaultStyle}
          setDefaultStyle={setDefaultStyle}
        >
          <Box />
        </Resizable>
      </div>
    </div>
  );
}

export default App;
