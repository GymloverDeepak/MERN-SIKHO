const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Middleware to parse JSON
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/notes', require('./routes/Notes'));

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
