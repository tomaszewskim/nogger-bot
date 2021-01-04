const coinTicker = require('coin-ticker');

module.exports = {
    name: "crypto",
    description: "cena danej kryptowaluty",
    execute(message, args) {
        const ticker = args[0].toUpperCase();
        coinTicker('bitfinex', `${ticker}_USD`).then(data => {
            message.channel.send(`> ${ticker} Price: $${parseFloat(data.last).toFixed(2)}`);
        }).catch(err => {
            console.log(err);
            message.channel.send("Nieprawidłowy ticker.")
        });
    }
}