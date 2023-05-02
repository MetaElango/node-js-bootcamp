const mongoose = require('mongoose');
const fs = require('fs');

const app = require('../../app');
const Tour = require('../../models/tourModel');
require('dotenv').config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established'));

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}.......`);
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importAll = async () => {
  try {
    await Tour.create(tours);
    console.log('------------ imported tours ---------------');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteAll = async () => {
  try {
    await Tour.deleteMany();
    console.log('------------ deleted all tours documents ---------------');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importAll();
} else if (process.argv[2] === '--delete') {
  deleteAll();
}
