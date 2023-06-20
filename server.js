const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

// API Endpoint for chat completions
app.post('/completions', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: req.body.message }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Example route handler
app.get('/', (req, res) => {
  // Handle the '/' route request
  res.send('Welcome to my application!');
});

app.get('/api/data', (req, res) => {
  // Handle the '/api/data' route request
  // Perform necessary operations and send a response
  res.json({ message: 'Here is some data from the API.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Your server is running on PORT ${port}`);
});
