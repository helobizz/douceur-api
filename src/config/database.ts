import "dotenv/config";
import { Sequelize } from "sequelize";

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não encontrada: ${name}`);
  }

  return value;
};

const dbHost = getRequiredEnv("DB_HOST");
const dbPort = Number(getRequiredEnv("DB_PORT"));
const dbName = getRequiredEnv("DB_NAME");
const dbUser = getRequiredEnv("DB_USER");
const dbPassword = getRequiredEnv("DB_PASSWORD");
const sslEnabled = process.env.DB_SSL === "true";

const dialectOptions = sslEnabled
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : undefined;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false,
  ...(dialectOptions && { dialectOptions }),
});