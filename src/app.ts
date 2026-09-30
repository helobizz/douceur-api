import express from "express";
import cors from "cors";
import vendaRoutes from "./routes/vendaRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(vendaRoutes);

app.get("/", (_req, res) => {
    res.send("API Douceur funcionando!");
});

export default app;