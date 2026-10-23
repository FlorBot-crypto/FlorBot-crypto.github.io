import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using the POST method
app.use(express.urlencoded({ extended: true }));

//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "uzb4o9e2oe257glt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "l220a12u0ai10309",
    password: "hjt9s1g87bg4pfyi",
    database: "s9sth9i7zeebahyo",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get("/quotesAboutLife", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT quoteId, quote, authorId, firstName, lastName 
            FROM quotes 
            NATURAL JOIN authors 
            WHERE quote LIKE '%life%'
            ORDER BY lastName`
        );
        res.render('results.ejs', { rows });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/alphabetically", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT quoteId, quote, authorId, firstName, lastName 
            FROM quotes 
            NATURAL JOIN authors 
            ORDER BY quote`
        );
        res.render('alphabetically.ejs', { rows });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/authorA", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT quoteId, quote, authorId, firstName, lastName 
            FROM quotes 
            NATURAL JOIN authors 
            WHERE firstName LIKE 'A%'
            ORDER BY firstName`
        );
        res.render('authorA.ejs', { rows });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/likes", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT quoteId, quote, authorId, firstName, lastName
            FROM quotes 
            NATURAL JOIN authors 
            WHERE likes BETWEEN 50 AND 100
            ORDER BY likes`
        );
        res.render('likes.ejs', { rows });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/international", async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT quoteId, quote, authorId, firstName, lastName
            FROM quotes 
            NATURAL JOIN authors 
            WHERE country != "USA"
            ORDER BY firstName`
        );
        res.render('international.ejs', { rows });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.get("/dbTest", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, () => {
    console.log("Express server running")
})