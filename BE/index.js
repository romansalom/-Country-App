require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const axios = require('axios');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

app.use(cors()); // Use the cors middleware

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
