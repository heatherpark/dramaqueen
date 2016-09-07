import React from 'react';
import '../style.css';

import AddDrama from './AddDrama';
import Header from './Header';
import { WatchedDramasContainer } from './WatchedDramas';

const App = () => (
  <div className="app-container">
    <div className="left-container">
      <div className="left-container-content">
        <Header />
        <AddDrama />
      </div>
    </div>
    <WatchedDramasContainer />
  </div>
)

export default App;