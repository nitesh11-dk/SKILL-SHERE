import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
export const createBooking = async (req, res) => {
    try {
        const { type, provider, skillsToLearn, date, isBarterExchange, barterSkill } = req.body;

        if (!type || !provider || !skillsToLearn || skillsToLearn.length === 0) {
            return res.status(400).json({ error: "Missing required fields or skillsToLearn must have at least one option" });
        }

        const booking = new Booking({
            type,
            provider,
            requester: req.user._id,
            skillsToLearn,
            date,
            isBarterExchange,
            barterSkill
        });

        await booking.save();

        // Add booking ID to the user's bookings
        await User.findByIdAndUpdate(req.user._id, { $push: { bookings: booking._id } });

        const populatedBooking = await booking.populate("skillsToLearn barterSkill");
        res.status(201).json({ message: "Booking created successfully", success: true, data: populatedBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while creating the booking", error: err.message });
    }
};

export const getOfferingBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({ provider: userId });

        if (!bookings.length) {
            return res.status(201).json({ message: "No offering bookings found for this user" });
        }

        res.status(200).json({ success: true, message: "Offering bookings retrieved successfully", data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while retrieving offering bookings", error: err.message });
    }
};

export const getRequesterBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({ requester: userId,type: "requesting"  });

        if (!bookings.length) {
            return res.status(201).json({ message: "No bookings found for this user" });
        }

        res.status(200).json({ success: true, message: "Bookings retrieved successfully", data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while retrieving bookings", error: err.message });
    }
};

export const respondToBooking = async (req, res) => {
    try {
      const { bookingId, action } = req.body;
      const userId = req.user._id;
  
      if (!bookingId || !action) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      if (booking.provider.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You are not authorized to respond to this booking" });
      }
  
      if (action === 'reject') {
        booking.status = 'rejected';
        await booking.save();
        return res.status(200).json({ success: true, message: "Booking rejected successfully" });
      } else if (action === 'accept') {
        booking.status = 'accepted';
        await booking.save();
        return res.status(200).json({ success: true, message: "Booking accepted successfully" });
      } else {
        return res.status(400).json({ error: "Invalid action" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "An error occurred while responding to the booking", error: err.message });
    }
  };


  // Mark booking as completed
export const completeBooking = async (req, res) => {
    try {
      const { bookingId } = req.body;
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      booking.status = 'completed';
      await booking.save();
      res.status(200).json({ success: true, message: "Booking marked as completed" });
    } catch (err) {
      res.status(500).json({ success: false, message: "An error occurred while marking the booking as completed", error: err.message });
    }
  };