import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';

const Dashboard = ({ price, data }) => {
    const opts = {
        tooltips: {
            intersect: false,
            mode: "index"
        },
        responsive: true,
        maintainAspectRatio: false
    };

    if(price === "0.00"){
        return <h1>Please select a currency pair</h1>
    }
};

export default React;