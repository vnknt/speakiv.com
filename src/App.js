
import './App.css';
import Navi from './components/navbar/navbar.jsx'


import 'semantic-ui-css/semantic.min.css'

import Dashboard from './layouts/Dashboard';

import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

function App() {  

  return (

    <div className="App">
      <div className="app-container">
        <Navi/>
        <div className="container pt-5">
          <Dashboard></Dashboard>
        </div>
      </div>
      <ToastContainer position="bottom-right"></ToastContainer>
    </div>
  );
}

export default App;