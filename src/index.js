import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FoodTruckFinder } from './components/FoodTruckFinder';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FoodTruckFinder />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

