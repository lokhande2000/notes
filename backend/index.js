import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connection from './config/db.js';
import noteRoute from './routes/noteRoutes.js';

const port = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(express.json());
app.use('/note', noteRoute)

app.get("/", (req, res) => {
    res.status(201).send(`<h1 style="text-align: center">Welcome to note server!</h1>`);
});

app.listen(port, async () => {
    try {
        await connection();
        console.log(`Server listening on port ${port}`);
    } catch (error) {
        console.log("Error starting server:", error);
    }
});
