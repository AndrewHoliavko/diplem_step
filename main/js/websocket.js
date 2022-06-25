let stock_price_trade = document.createElement('span');
stock_price_trade.className = 'stockPriceTrade';
let web_ska = document.createElement("input");

web_ska.onchange = 'alert("work!");';
web_ska.name="play_back_rate";
web_ska.type = "radio";
web_ska.value = 99
web_ska.innerHTML = 'qq<br>'

const socket = new WebSocket('wss://ws.finnhub.io?token=ca3mmvaad3ia675b0f50');

socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'HAL'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

socket.addEventListener('message', function (event) {
    let tradeObject = JSON.parse(event.data);
    let tradeDate = new Date(tradeObject.data[0].t);
    console.log('Message from server ', tradeObject);
    stock_price_trade.innerHTML = `${tradeObject.data[0].p} - ${tradeDate}`; 
    elem2.after(stock_price_trade);
});

let unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': 'HAL'}))
}