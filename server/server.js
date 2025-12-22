// server/server.js
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');

const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
     allowedHeaders: ["Content-Type", "Authorization"],
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
 
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB();
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

//Router
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.get('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://${DB_HOST}:${PORT}`);
}); 
