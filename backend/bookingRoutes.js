import express from "express";
import {addBooking, showAllBookings, editBooking, removeBooking} from "./bookingController.js";

const router = express.Router();    

//POST - create a new booking
//when someone does POST request to /api/bookings call the addBooking() function 
router.post("/bookings", addBooking); 

//GET - get all bookings
router.get("/bookings", showAllBookings);

//PUT - update an existing booking by id
router.put("/bookings/:id", editBooking);

//DELETE - delete a booking by id
router.delete("/bookings/:id", removeBooking);

export default router;