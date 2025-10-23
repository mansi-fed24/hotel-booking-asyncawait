import {createBooking, getAllBookings, updateBooking, deleteBooking} from "./bookingDAO.js";

export async function addBooking(req, res){
    try {
        const id = await createBooking(req.body);
        res.status(201).json({message:" Booking created successfully", id});
    } catch (err) {
        console.error(err);
        res.status(500).json({error:"Failed to create booking"});
    }
}

//function to show all bookings
export async function showAllBookings(req, res) {
    try{
        const bookings = await getAllBookings();
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({error:"Failed to fetch bookings"});
    }

}

//function to update an existing booking
export async function editBooking(req, res) {
    try {
        const id = req.params.id;           // get id from the URL(Params /api/bookings/2)
        const updatedBooking = req.body;    // new values from frontend
        const result = await updateBooking(id, updatedBooking); //call DAO
        
        if (result === 0){
            res.status(404).json({message: "Booking not found"});
        } else {
            res.json({message:"Booking updated successfully "});
        }
   
    }catch (err){
        console.error(err);
        res.status(500).json({error: "Failed to update booking"});
    }
}

//function to delete a booking by ID
export async function removeBooking(req, res) {
    try {
        const id = req.params.id;  // get id from the URL (/api/bookings/2)
        const result = await deleteBooking(id);  // call DAO function

        if (result === 0) {
        res.status(404).json({ message: "Booking not found" });
        } else {
        res.json({ message: "Booking deleted successfully" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete booking" });
    }
}