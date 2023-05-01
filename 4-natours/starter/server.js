const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const app = require('./app');

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
