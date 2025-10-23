import mysql from "mysql2/promise" ;

// 1: to connect to mysql server
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Anujoshi@1",
    database: "hotel_database",
});

export default pool;