const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public (or protect later if needed)
router.post('/', async (req, res) => {
  try {
    const { carName, carDescription } = req.body;

    if (!carName || !carDescription) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = new Booking({ carName, carDescription });
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving booking' });
  }
});

router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ bookingTime: -1 });
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch bookings' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;
      
      // Find the booking by id and delete it
      const booking = await Booking.findByIdAndDelete(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting booking' });
    }
  });

module.exports = router;
