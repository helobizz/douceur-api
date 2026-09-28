import app from "./app.js";
import { sequelize } from "./config/database.js";
import "./models/Venda.js";

const PORT = 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com PostgreSQL estabelecida.");

        await sequelize.sync();
        console.log("Modelos sincronizados com o banco.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Erro ao conectar com PostgreSQL: ", error);
    }
};

startServer();