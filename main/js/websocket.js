let error = document.createElement('div');
error.className = 'err';
error.innerHTML = "Real time quotes are not avaliable now. The New York Stock Exchange will open next Monday at 9 am EST.";

let stock_price_trade = document.createElement('span');
stock_price_trade.className = 'stockPriceTrade';

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