import pool from "./db.js"; //import MYSQL connection pool to run SQL queries

//export function so other files use it
//this function is to create a booking
export async function createBooking(booking) { // booking will hold an object with user answers
      
  const sql = `
        INSERT INTO bookings 
        (room_type, guest_name, guest_email, guest_phone, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?)
    ` ;
    const [result] = await pool.query(sql, [
      booking.room_type,
      booking.guest_name,
      booking.guest_email,
      booking.guest_phone,
      booking.start_date,
      booking.end_date,
  ]);
  return result.insertId;
}

//this function is to get all bookings
export async function getAllBookings() {
  const [rows] = await pool.query("SELECT * FROM bookings");
  return rows;
}

//update an existing booking by id
export async function updateBooking(id, updatedBooking){
  const sql = `
    UPDATE bookings
    SET room_type = ?, guest_name = ?, guest_email = ?, guest_phone = ?, start_date = ?, end_date = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(sql, [
    updatedBooking.room_type,
    updatedBooking.guest_name,
    updatedBooking.guest_email,
    updatedBooking.guest_phone,
    updatedBooking.start_date,
    updatedBooking.end_date,
    id,
  ]);
   return result.affectedRows; // number of rows changed (1 if success)

}

//Delete a booking by id
export async function deleteBooking(id){
  const sql = "DELETE FROM bookings WHERE id = ?";
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows; // 1 if deleted, 0 if not found
}
