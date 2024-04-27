import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";

dotenv.config();
connectDb();

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,
    })
);

app.use("/api/", auth, shortUrl);

app.listen(port, ()=>{
    console.log(`Server started successfully on port: ${port}`);
});

function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.headers.authorization;

    if (!token || token !== `Bearer ${process.env.API_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}