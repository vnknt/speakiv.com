
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/js/bootstrap'
 import 'bootstrap/dist/css/bootstrap.min.css'
 import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import CustomAxios from './services/axiosJwt';

const store= configureStore()

CustomAxios.config(store)




ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
    <React.StrictMode>
     <App />
  </React.StrictMode>
  </BrowserRouter>

</Provider>

   
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();