import 'dotenv/config';

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';


type LeaderBoardInfo = {
    player: string;
    score: number;
};

type ContactFormInfo = {
    name: string;
    email: string;
    message: string;
};

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

async function initMySQL() {
    await pool.execute(`CREATE TABLE IF NOT EXISTS leaderboard (
        id INT AUTO_INCREMENT PRIMARY KEY,
        player VARCHAR(100) NOT NULL,
        score INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // starting valuiues

    // for some reason execute returns an array of two things
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM leaderboard') as any;
    const numberOfElementsInDB = rows[0].count;
    if (numberOfElementsInDB === 0) {

        // ? is a placeholder value like in golang when you use 
        // fmt.Printf("%v, $s, $d")
        await pool.execute(
            'INSERT INTO leaderboard (player, score) VALUES (?,?),(?,?),(?,?),(?,?)',
            ['Vi', 123, 'Cris', 456, 'Dylan', 789, 'Ken', 111]
        )
    }
}

//async function basicConnection() {
//    const db = await mysql.createConnection({
//        host: process.env.DB_HOST ?? "localhost",
//        user: process.env.DB_USER,
//        password: process.env.DB_PASSWORD,
//        database: process.env.DB_NAME,
//    });

//    const [rows] = await db.execute(
//        "SELECT sutdent_id, first_name, last_name FROM students ORDER BY students_id"
//    );

//    console.log(rows);

//    await db.end();
//}

app.get("/api/ping", (req: Request, res: Response) => {
    res.json({ message: "OK" });
});

const leaderboardData: LeaderBoardInfo[] = [
    { player: 'Vi', score: 123},
    { player: 'Cris', score: 456},
    { player: 'Dylan', score: 789},
    { player: 'Ken', score:111}
]

//const letters = ['a', 'b', 'c'];
//const [first] = letters;  // 'b' and 'c' are silently ignored
//const [first, second] = letters;  // now you have both
// this is how destructuring the .execute returns of row data, metadata

app.get("/api/leaderboard", async (req: Request, res: Response) => {
    const [rows] = await pool.execute(
        'SELECT id, player, score FROM leaderboard ORDER BY score DESC'
    );
    res.json(rows);
});

app.post("/api/leaderboard", async (req: Request, res: Response) => {
    // partial makes every property type optional
    // similar to player?: string;
    const { player, score } = req.body as Partial<LeaderBoardInfo>;

    // Date.now() returns time in milliseconds since Jan 1, 1970 ???
    const playerName = player?.trim() || `USER_${Math.floor(Math.random() * 1000)}`;

    // if score is really a number 
    // if not make it up
    // set to 3 digits score
    const playerScore = typeof score === 'number' ? score : Math.floor(Math.random() * 1000);

    // INSERT returns a report of what happened
    const [result] = await pool.execute('INSERT INTO leaderboard (player, score) VALUES (?, ?)',
        [playerName, playerScore]) as any;

        
    res.status(201).json({
        id: result.insertId, //insertId is a propert from the reoprt INSERT returns
        player: playerName,
        score: playerScore
    });
});

app.post("/api/leaderboard/reset", async (req: Request, res: Response) => {
    await pool.execute('DELETE FROM leaderboard')
    res.json({ message: "Leaderboard reset" })
})

app.post("/api/contact", (req: Request, res: Response) => {
    const contactFormData: ContactFormInfo = req.body;

    res.json({
        success: true,
        message: "Feedback Form Recieved",
        data: contactFormData
    })
});

app.listen(PORT, async () => {
    await initMySQL()
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/ping');
    console.log('  GET  /api/leaderboard-summary');
    console.log('  GET  /api/leaderboard');
    console.log('  POST /api/contact');
});