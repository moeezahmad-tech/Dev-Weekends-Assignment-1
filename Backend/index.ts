import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.ts";

const app = express();
const port = Number(process.env.PORT) || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}/api`);
    console.log("Frontend dev server defaults to http://localhost:5173");
});