const express = require('express');
const mysql = require('mysql2');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// POST /api/login - Generate a session ID
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    const sessionId = uuidv4();
    res.json({ sessionId, username });
});

// GET /api/comments - Fetch all comments
app.get('/api/comments', (req, res) => {
    const sql = 'SELECT * FROM comments ORDER BY timestamp DESC';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST /api/comments - Add a new comment
app.post('/api/comments', (req, res) => {
    const { username, comment } = req.body;
    const sql = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
    db.query(sql, [username, comment], (err, result) => {
        if (err) throw err;
        const newComment = { id: result.insertId, username, comment, timestamp: new Date() };
        io.emit('updateComments', newComment); 
        res.json(newComment);
    });
});

// Real-time communication with Socket.IO
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => console.log('Server is running on port 5000'));
