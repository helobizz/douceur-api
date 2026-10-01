import { Router } from "express";

import { VendaController } from "../controllers/VendaController.js";

const router = Router();

router.get("/vendas", VendaController.index);
router.get("/vendas/:id", VendaController.show);
router.post("/vendas", VendaController.create);
router.put("/vendas/:id", VendaController.update);
router.delete("/vendas/:id", VendaController.delete);

export default router;
