import React, { useState, useRef, useEffect } from 'react';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState("");
  const [price, setPrice] = useState("0.00");
  const [pastData, setPastData] = useState({});

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
