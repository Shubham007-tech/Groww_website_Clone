
let graph_base_point = [];
let y = [];
let oneYearGraph = document.getElementById("graphOneYear");
let sixMonthGraph = document.getElementById("graphSixMonth");
let oneMonthGraph = document.getElementById("graphOneMonth");

let productArr = JSON.parse(localStorage.getItem("itemData"));

async function getData(){
    let productSymbol = productArr[0].symbol;
    console.log(productSymbol);
    let dt = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${productSymbol}&apikey=0PTMBKNK94C4NSG5`)
    let data =  await dt.json();                                                                //   
    console.log(data["Time Series (Daily)"]);
    appendingData(data["Time Series (Daily)"]);
}

async function appendingData(dt){
    await dt;
    for (let keys in dt){
        graph_base_point.push(keys);
    }
    for ( let i = 0; i < graph_base_point.length; i++){
        y.push(dt[graph_base_point[i]]['4. close']);
    }
    graph_base_point.reverse();
    y.reverse();  
    console.log(graph_base_point);
    console.log(y);
    graph(graph_base_point,y);
}
let sixMonthBase = graph_base_point;
let sixMonthYaxis = y;
let oneMonthBase = graph_base_point;
let oneMonthYaxis = y;



function graph(graph_base_point,y){
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels : graph_base_point,
            datasets: [{
                label: 'NAV',
                data:  y ,
                backgroundColor: [
                    'green',
                ],
                display:false,
                borderColor:[
                    '#00d09c',
                ],
                borderWidth: 2,
                radius: 0,
                pointHoverRadius: 7,
                verticalLine: true,
            }]
        },
        options: {
            scales: {
                y: {
                    ticks : {
                        display : false,
                        callback: (value,index,values) => {
                            return '$' + value;
                        }
                    },

                    beginAtZero: false,
                    grid : {
                        display : false,
                        borderColor: 'white',
                    }
                },
                x: {
                    ticks : {
                    display : false
                    },

                    beginAtZero: false,
                    grid : {
                        display : false,
                    }
                }
            }
        }
    });

    oneYearGraph.onclick = () => {
        oneYearGraph.setAttribute("class", "onclicked");
        sixMonthGraph.setAttribute("class", "onNotclicked");
        oneMonthGraph.setAttribute("class", "onNotclicked");
        myChart.destroy();
        oneYearData();
    }

    sixMonthGraph.onclick = () => {
        oneYearGraph.setAttribute("class", "onNotclicked");
        sixMonthGraph.setAttribute("class", "onclicked");
        oneMonthGraph.setAttribute("class", "onNotclicked");
        myChart.destroy();
        sixMonData();
    }

    oneMonthGraph.onclick = () => {
        oneYearGraph.setAttribute("class", "onNotclicked");
        sixMonthGraph.setAttribute("class", "onNotclicked");
        oneMonthGraph.setAttribute("class", "onclicked");
        myChart.destroy();
        oneMonData();
    }
}

function oneYearData(){
    graph(graph_base_point,y);
}

function sixMonData(){
    sixMonthBase = sixMonthBase.slice(0, 50);
    sixMonthYaxis = sixMonthYaxis.slice(0, 50);
    graph(sixMonthBase, sixMonthYaxis);
}

function oneMonData(){
    oneMonthBase = oneMonthBase.slice(0, 20);
    oneMonthYaxis = oneMonthYaxis.slice(0, 20);
    graph(oneMonthBase, oneMonthYaxis);
}

export{ getData, appendingData, graph };