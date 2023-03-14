// 2 imports minimum needed to create an Express application:
import express from "express";
import cors from "cors";

// Create the app itself
const app = express();

// Inject application-wide middleware
// 1. Enable cross origin resource sharing (CORS) so our server can accept requests
// from a React app client
app.use(cors());
// 2. Enable our application to accept, parse, and read JSON in the request
app.use(express.json());
// 3. Enable our application to accept, parse, and read encoded forms
app.use(express.urlencoded({ extended: true }));

// Our routes are endpoints: the final location of a requested resource
app.get("/", (req, res) => {
  res.send("Thanks for making a GET request to localhost:3001");
});

// Start the server itself (acceptable port numbers: 3001, 8000, 8080)
app.listen(3001, () => console.log(`[Server] Listening on port 3001`));
