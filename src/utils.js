export const formatData = data => {
    let finalData = {
        labels: [],
        datasets: [
            {
                label: "price",
                data: [],
                backgroundColor: "rgb(255, 99, 132, 0.8)",
                borderColor: "rgba(255, 99, 132, 0.2)",
                fill: false
            }
        ]
    };

    let dates = data.map(val => {
        const ts = val[0];
        let date = new Date(ts * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
    })
}