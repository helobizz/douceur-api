import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("API Douceur funcionando!");
});

export default app;