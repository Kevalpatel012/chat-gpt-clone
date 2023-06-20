const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Configure your routes and middleware here

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Your server is running on PORT ${port}`);
});