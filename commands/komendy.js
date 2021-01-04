module.exports = {
    name: "komendy",
    description: "list dostepnych komend",
    execute(message, args) {
        const commands = {
            "stock": "Informacje o akcjach danej spółki. (nogger stock <ticker>)\n> np. (nogger stock TSLA)",
            "crypto": "Cena danej kryptowaluty (nogger crypto <ticker>)\n> np. (nogger crypto BTC)",
            "testo": "Losowy gif z testovironem \n> (nogger testo)"
        }
        let cmdString = '';

        for (prop in commands) {
            cmdString += `\n> ${prop}`
        }

        if (!args[0]) {
            message.channel.send(`${cmdString}\n_ _\n> Więcej informacji o danej komendzie:\n> nogger komendy <komenda> `);
        } else {
            message.channel.send(`> ${args[0]}\n> ${commands[args[0]]}`);
        }
    }
};