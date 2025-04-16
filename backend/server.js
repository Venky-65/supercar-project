const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');

dotenv.config();
const app = express();

// ✅ Apply CORS middleware BEFORE your routes
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow frontend running on this port
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

// ✅ JSON parsing middlewares
app.use(bodyParser.json());
app.use(express.json());

// ✅ Your routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
// ✅ MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.log(err));
