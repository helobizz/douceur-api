import express from "express";
import cors from "cors";
import { swaggerUi, swaggerDocument } from "./config/swagger.js";
import vendaRoutes from "./routes/vendaRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(vendaRoutes);

app.get("/", (_req, res) => {
  res.send("API Douceur funcionando!");
});

export default app;
