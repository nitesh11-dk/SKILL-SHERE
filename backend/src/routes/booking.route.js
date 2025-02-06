import { Router } from "express";
import { createBooking ,getOfferingBookings,getRequesterBookings,respondToBooking,completeBooking} from "../controllers/booking.controller.js";
import {AuthenticateUser} from "../middlewares/auth.middleware.js"

let router = Router();

router.post("/create",AuthenticateUser,createBooking);
router.get("/requested",AuthenticateUser,getRequesterBookings);
router.get("/offering",AuthenticateUser,getOfferingBookings);
router.post("/completed", completeBooking);

router.post("/respond",AuthenticateUser, respondToBooking);
export default router;