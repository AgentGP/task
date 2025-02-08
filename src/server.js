const express = require('express');
const jsonServer = require('json-server');

const app = express();
const port = 5000;

// Set up a JSON server (for mock database)
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use JSON Server middlewares (like logging, static, and CORS support)
app.use(middlewares);

// Set up the API route for JSON Server
app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
