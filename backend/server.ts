import express, { type Request, type Response } from 'express';
import cors from 'cors';


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

app.get("/api/ping", (req: Request, res: Response) => {
    res.json({ message: "OK" });
});

const leaderboardData: LeaderBoardInfo[] = [
    { player: 'Vi', score: 123},
    { player: 'Cris', score: 456},
    { player: 'Dylan', score: 789},
    { player: 'Ken', score:111}
]


app.get("/api/leaderboard", (req: Request, res: Response) => {
    res.json(leaderboardData);
});


app.post("/api/leaderboard", (req: Request, res: Response) => {
    const newPlayer: LeaderBoardInfo = {
        player: `USER ${leaderboardData.length + 1}`,
        score: Math.floor(Math.random() * 1000)
    };

    leaderboardData.push(newPlayer);

    res.status(201).json(newPlayer);
});

app.post("/api/leaderboard/reset", (req: Request, res: Response) => {
    leaderboardData.length = 0 // clear all players
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

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/ping');
    console.log('  GET  /api/leaderboard-summary');
    console.log('  GET  /api/leaderboard');
    console.log('  POST /api/contact');
});