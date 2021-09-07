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

  useEffect(() => {
    if(!first.current){
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    }

    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;

    const fetchHistoricalData = async () => {
      let dataArr = [];

      await fetch(historicalDataURL)
          .then(res => res.json())
          .then(data => (dataArr = data));

          // let formattedData = formatData(dataArr);

          // setPastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = e => {
      let data = JSON.parse(e.data);
      if(data.type !== "ticker"){
        return;
      }

      if(data.product_id === pair){
        setPrice(data.price)
      }
    };

  }, [pair]);

  const handleSelect = () => {}

  return (
    <div className="container">
      {
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return(
              <option>
                {}
              </option>
            )
          })}
        </select>
      }

      <Dashboard data={pastData} price={price} />
    </div>
  );
}

export default App;
