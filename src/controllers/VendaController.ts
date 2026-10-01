import type { Request, Response } from "express";

import type { CreateVendaDTO } from "../types/CreateVendaDTO.js";
import { Venda } from "../models/Venda.js";

export class VendaController {
  // GET /vendas
  public static async index(_req: Request, res: Response): Promise<void> {
    try {
      const vendas = await Venda.findAll();

      res.status(200).json(vendas);
    } catch (error: unknown) {
      console.log("Erro ao buscar vendas: ", error);

      res.status(500).json({
        mensagem: "Erro interno ao buscar vendas.",
      });
    }
  }

  // GET /vendas/:id
  public static async show(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const venda = await Venda.findByPk(id);

      if (!venda) {
        res.status(404).json({
          erro: "Venda não encontrada.",
        });
        return;
      }

      res.status(200).json(venda);
    } catch (error: unknown) {
      console.log("Erro ao buscar venda: ", error);

      res.status(500).json({
        erro: "Erro ao buscar venda.",
      });
    }
  }

  // POST /vendas
  public static async create(
    req: Request<unknown, unknown, CreateVendaDTO>,
    res: Response,
  ): Promise<void> {
    try {
      const {
        cliente,
        produto,
        quantidade,
        valorTotal,
        formaPagamento,
        statusVenda,
        statusPagamento,
        dataVenda,
        observacao,
      } = req.body;

      if (
        !cliente ||
        !produto ||
        quantidade === undefined ||
        valorTotal === undefined ||
        !formaPagamento ||
        !statusVenda ||
        !statusPagamento ||
        !dataVenda
      ) {
        res.status(400).json({
          erro: "Os campos obrigatórios devem ser informados.",
        });
        return;
      }

      if (
        typeof cliente !== "string" ||
        typeof produto !== "string" ||
        typeof quantidade !== "number" ||
        typeof valorTotal !== "number" ||
        typeof formaPagamento !== "string" ||
        typeof statusVenda !== "string" ||
        typeof statusPagamento !== "string" ||
        typeof dataVenda !== "string"
      ) {
        res.status(400).json({
          erro: "Os dados enviados possuem tipos inválidos.",
        });
        return;
      }

      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        res.status(400).json({
          erro: "A quantidade deve ser um número inteiro maior que zero.",
        });
        return;
      }

      if (valorTotal <= 0) {
        res.status(400).json({
          erro: "O valor total deve ser maior que zero.",
        });
        return;
      }

      if (formaPagamento !== "PIX" && formaPagamento !== "DINHEIRO") {
        res.status(400).json({
          erro: "A forma de pagamento deve ser PIX ou DINHEIRO.",
        });
        return;
      }

      if (
        statusVenda !== "RESERVADA" &&
        statusVenda !== "CANCELADA" &&
        statusVenda !== "ENCOMENDADA" &&
        statusVenda !== "ENTREGUE"
      ) {
        res.status(400).json({
          erro: "O status da venda deve ser RESERVADA, ENCOMENDADA, ENTREGUE ou CANCELADA.",
        });
        return;
      }

      if (statusPagamento !== "PAGO" && statusPagamento !== "PENDENTE") {
        res.status(400).json({
          erro: "O status do pagamento deve ser PAGO ou PENDENTE.",
        });
        return;
      }

      const data = new Date(dataVenda);

      if (Number.isNaN(data.getTime())) {
        res.status(400).json({
          erro: "A data da venda é inválida.",
        });
        return;
      }

      const novaVenda = await Venda.create({
        cliente: cliente.trim(),
        produto: produto.trim(),
        quantidade,
        valorTotal,
        formaPagamento,
        statusVenda,
        statusPagamento,
        dataVenda: data,
        observacao: observacao?.trim() || null,
      });

      res.status(201).json(novaVenda);
    } catch (error: unknown) {
      console.log("Erro ao cadastrar venda: ", error);

      res.status(500).json({
        erro: "Erro ao cadastrar venda.",
      });
    }
  }

  // PUT /vendas/:id
  public static async update(
    req: Request<{ id: string }, unknown, CreateVendaDTO>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const venda = await Venda.findByPk(id);

      if (!venda) {
        res.status(404).json({
          erro: "Venda não encontrada.",
        });
        return;
      }

      const {
        cliente,
        produto,
        quantidade,
        valorTotal,
        formaPagamento,
        statusVenda,
        statusPagamento,
        dataVenda,
        observacao,
      } = req.body;

      if (
        !cliente ||
        !produto ||
        quantidade === undefined ||
        valorTotal === undefined ||
        !formaPagamento ||
        !statusVenda ||
        !statusPagamento ||
        !dataVenda
      ) {
        res.status(400).json({
          erro: "Os campos obrigatórios devem ser informados.",
        });
        return;
      }

      if (
        typeof cliente !== "string" ||
        typeof produto !== "string" ||
        typeof quantidade !== "number" ||
        typeof valorTotal !== "number" ||
        typeof formaPagamento !== "string" ||
        typeof statusVenda !== "string" ||
        typeof statusPagamento !== "string" ||
        typeof dataVenda !== "string"
      ) {
        res.status(400).json({
          erro: "Os dados enviados possuem tipos inválidos.",
        });
        return;
      }

      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        res.status(400).json({
          erro: "A quantidade deve ser um número inteiro maior que zero.",
        });
        return;
      }

      if (valorTotal <= 0) {
        res.status(400).json({
          erro: "O valor total deve ser maior que zero.",
        });
        return;
      }

      if (formaPagamento !== "PIX" && formaPagamento !== "DINHEIRO") {
        res.status(400).json({
          erro: "A forma de pagamento deve ser PIX ou DINHEIRO.",
        });
        return;
      }

      if (
        statusVenda !== "RESERVADA" &&
        statusVenda !== "CANCELADA" &&
        statusVenda !== "ENCOMENDADA" &&
        statusVenda !== "ENTREGUE"
      ) {
        res.status(400).json({
          erro: "O status da venda deve ser RESERVADA, ENCOMENDADA, ENTREGUE ou CANCELADA.",
        });
        return;
      }

      if (statusPagamento !== "PAGO" && statusPagamento !== "PENDENTE") {
        res.status(400).json({
          erro: "O status do pagamento deve ser PAGO ou PENDENTE.",
        });
        return;
      }

      const data = new Date(dataVenda);

      if (Number.isNaN(data.getTime())) {
        res.status(400).json({
          erro: "A data da venda é inválida.",
        });
        return;
      }

      await venda.update({
        cliente: cliente.trim(),
        produto: produto.trim(),
        quantidade,
        valorTotal,
        formaPagamento,
        statusVenda,
        statusPagamento,
        dataVenda: data,
        observacao: observacao?.trim() || null,
      });

      res.status(200).json(venda);
    } catch (error: unknown) {
      console.log("Erro ao atualizar venda: ", error);

      res.status(500).json({
        erro: "Erro ao atualizar venda.",
      });
    }
  }

  // DELETE /vendas/:id
  public static async delete(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const venda = await Venda.findByPk(id);

      if (!venda) {
        res.status(404).json({
          erro: "Venda não encontrada.",
        });
        return;
      }

      await venda.destroy();

      res.status(200).json({
        mensagem: "Venda excluída com sucesso.",
      });
    } catch (error: unknown) {
      console.log("Erro ao excluir venda: ", error);

      res.status(500).json({
        erro: "Erro ao excluir venda.",
      });
    }
  }
}
