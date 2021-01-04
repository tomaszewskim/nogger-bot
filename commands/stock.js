const si = require('stock-info');

module.exports = {
    name: 'stock',
    description: 'informacje o akcjach danej firmy',
    execute(message, args) {
        si.getSingleStockInfo(args[0]).then(function(stock) {
            const change = stock.regularMarketChangePercent > 0 ? "+" + stock.regularMarketChangePercent.toFixed(2) : stock.regularMarketChangePercent.toFixed(2);
            message.channel.send(`${stock.longName} ($${stock.symbol})\n> Price: $${stock.regularMarketPrice}\n> Change: ${change}%\n> P/E: ${stock.trailingPE.toFixed(2)}\n> EPS (TTM): ${stock.epsTrailingTwelveMonths.toFixed(2)}`);
        }).catch(err => {
            console.log(err);
            message.channel.send("Taki stock nie istnieje.")
        });
    }
}