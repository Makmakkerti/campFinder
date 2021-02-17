const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const NUM_OF_CAMPS = 50;

mongoose.connect('mongodb://localhost:27017/camp-finder', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('database connected');
});

const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  try {
    await Campground.deleteMany({});
    for (let i = 0; i < NUM_OF_CAMPS; i += 1) {
      const random1000 = Math.floor(Math.random() * 1000);
      const { city, state } = cities[random1000];
      const camp = await new Campground({
        location: `${city}, ${state}`,
        title: `${getRandomValue(places)} ${getRandomValue(descriptors)}`,
      });
      await camp.save();
    }
    db.close()
  } catch (err) {
    console.log(err);
  }
};

seedDB();