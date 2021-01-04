require('dotenv').config();
const mongoose = require('mongoose');
const validUrl = require('valid-url');

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;
const testoSchema = new Schema({
    url: {
        type: String,
        required: true
    }
});

const Testo = mongoose.model('Testo', testoSchema);

module.exports = {
    name: 'testo',
    description: 'random testoviron gif',
    execute(message, args) {
        if (args[0] == 'dodaj') {
            const link = args[1];
            Testo.findOne({url: link}, async function(err, data) {
                if (data && data.length) {
                    message.channel.send('Taki gif już istnieje.')
                } else {
                    const testo = new Testo({
                        url: link
                    });
                    testo.save().then(() => message.channel.send('Gif dodany.'))  ;                  
                }
            });
        } else {
            Testo.find({}, function(err, data) {
                if (err) return console.log(err);
                message.channel.send(data[Math.floor(Math.random() * (data.length + 1))].url);
            })
        }
    }
}

