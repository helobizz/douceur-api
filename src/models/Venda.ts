import { DataTypes, Model } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.js";

export type FormaPagamento = "PIX" | "DINHEIRO";

export type StatusVenda =
  "RESERVADA" | "ENCOMENDADA" | "ENTREGUE" | "CANCELADA";

export type StatusPagamento = "PAGO" | "PENDENTE";

export interface IVenda {
  id: number;
  cliente: string;
  produto: string;
  quantidade: number;
  valorTotal: number;
  formaPagamento: FormaPagamento;
  statusVenda: StatusVenda;
  statusPagamento: StatusPagamento;
  dataVenda: Date;
  observacao?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Venda
  extends Model<InferAttributes<Venda>, InferCreationAttributes<Venda>>
  implements IVenda
{
  declare id: CreationOptional<number>;
  declare cliente: string;
  declare produto: string;
  declare quantidade: number;
  declare valorTotal: number;
  declare formaPagamento: FormaPagamento;
  declare statusVenda: StatusVenda;
  declare statusPagamento: StatusPagamento;
  declare dataVenda: Date;
  declare observacao: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Venda.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    produto: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    formaPagamento: {
      type: DataTypes.ENUM("PIX", "DINHEIRO"),
      allowNull: false,
    },

    statusVenda: {
      type: DataTypes.ENUM("RESERVADA", "ENCOMENDADA", "ENTREGUE", "CANCELADA"),
      allowNull: false,
    },

    statusPagamento: {
      type: DataTypes.ENUM("PAGO", "PENDENTE"),
      allowNull: false,
    },

    dataVenda: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    observacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "vendas",
    timestamps: true,
  },
);
