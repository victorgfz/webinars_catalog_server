import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import webinarRouter from "./routes/webinar.routes"
import filterRouter from "./routes/filter.routes"

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/webinar", webinarRouter)
app.use("/filter", filterRouter)


app.get("/", (req: Request, res: Response) => {
    res.json({ message: "API is running on Vercel!" })
})


if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    })
}

export default app;