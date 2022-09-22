import React from 'react';

import MainContainer from './containers/MainContainer';
import './styles.scss'
// world map not being used
import WorldMap from './containers/WorldMap'

const App = () => {
  return (
    <div className='appContainer'>
      <div>
        <MainContainer />
      </div>
      {/* <div className='map'><WorldMap /></div> */}
    </div>

  );
};

export default App;
