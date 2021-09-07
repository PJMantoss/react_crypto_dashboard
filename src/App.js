import React, { useState, useRef, useEffect } from 'react';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState("");
  const [price, setPrice] = useState("0.00");
  const [pastData, setPastData] = useState({});
  const ws = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
          .then(res => res.json())
          .then(data => pairs = data);

          let filtered = pairs.filter(pair => {
            if(pair.quote_currency === "USD"){
              return pair;
            }
          });

          filtered = filtered.sort((a,b) => {
            if(a.base_currency < b.base_currency){
              return -1;
            }

            if(a.base_currency > b.base_currency){
              return 1;
            }

            return 0;
          });

          setCurrencies(filtered);

          first.current = true;
    }

    apiCall();
    
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
