require('dotenv').config({ path: './config.env' });

const app = require('./app');

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}.......`);
});
