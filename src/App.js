
import './App.css';
import Navi from './components/navbar/navbar.jsx'


import 'semantic-ui-css/semantic.min.css'

import Dashboard from './layouts/Dashboard';
import Peer from 'peerjs';
import { useEffect, useState } from 'react';

function App() {
 
 

  return (

    <div className="App">
      <div className="app-container">
        <Navi/>

        <div className="container pt-5">

          <Dashboard></Dashboard>
          
        </div>

      </div>
    </div>

  );
}

export default App;
