import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes"


const app = express();
const port = 8080;

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


app.use("/auth", authRouter)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
