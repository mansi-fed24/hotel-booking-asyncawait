import express from "express";
import pool from "./db.js";
import cors from "cors";
import bookingRoutes from "./bookingRoutes.js"; 


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5500",  // local HTML testing
      "http://127.0.0.1:5500",
      "https://hotel-booking-asyncawait-project.vercel.app"  // your live frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");
        res.send("<h2> Hotel Booking Backend is Live — Database Connected Successfully!</h2>");
    } catch (err){
        res.status(500).send("<h2>Database connection failed</h2>");
        console.error(err);
    }
});

app.use("/api", bookingRoutes);

//app.listen(3000, () => console.log("server running on http://localhost:3000"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));