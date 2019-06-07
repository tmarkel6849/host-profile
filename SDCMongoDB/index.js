const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.connect('mongodb://localhost/hostprofiles', { useNewUrlParser: true });

const db = mongoose.connection;
// autoIncrement.initialize(connection);

db.on('error', console.error.bind(console, 'connection error'));

// db.once('open', () => {
//   console.log('this is open');
// })

const hostsSchema = mongoose.Schema({
  name: String,
  description: String,
  interaction: String,
  cohosts: String,
  datejoined: String,
  responserate: String,
  responsetime: String,
  hosturl: String,
  language1: Number,
  language2: Number
})

// autoIncrement.plugin(hostsSchema.plugin, 'Hosts')

const Hosts = mongoose.model('Hosts', hostsSchema);

const addEntry = (data) => {
  let host = new Hosts({
    name: data.name,
    descriptions: data.description,
    interaction: data.interaction,
    cohosts: JSON.stringify(data.cohosts),
    datejoined: data.datejoined,
    responserate: data.responserate,
    responsetime: data.responsetime,
    hosturl: data.hosturl,
    language1: data.language1,
    language2: data.language2
  })
  host.save((err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('entry saved');
    mongoose.disconnect();
  })
}

addEntry({
  name: 'bobby joe',
  description: 'a fine fella really',
  interaction: 'usually clothed',
  cohosts: {},
  datejoined: 'June 16, 1900',
  responserate: '100%',
  responsetime: 'he already did',
  hosturl: 'some.url',
  language1: 1,
  language2: -1
});



//  id SERIAL NOT NULL,
//  name VARCHAR NOT NULL,
//  description VARCHAR NOT NULL,
//  interaction VARCHAR NOT NULL,
//  cohosts VARCHAR NOT NULL,
//  datajoined VARCHAR NOT NULL,
//  responserate VARCHAR NOT NULL,
//  responsetime VARCHAR NOT NULL,
//  hosturl VARCHAR NOT NULL,
//  language1 SMALLINT NOT NULL,
//  language2 SMALLINT NOT NULL