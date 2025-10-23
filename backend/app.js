import express from "express";
import pool from "./db.js";
import cors from "cors";
import bookingRoutes from "./bookingRoutes.js"; 


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");
        res.send("My sql coonected successfully");
    } catch (err){
        res.status(500).send("database connection failed");
        console.error(err);
    }
});

app.use("/api", bookingRoutes);

app.listen(3000, () => console.log("server running on http://localhost:3000"));