import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("Conexão com PostgreSQL estabelecida.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.log("Erro ao conectar com PostgreSQL: ", error);
    }
};

startServer();