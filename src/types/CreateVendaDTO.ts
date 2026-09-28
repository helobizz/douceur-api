import type { FormaPagamento, StatusPagamento, StatusVenda } from "../models/Venda.js";

export interface CreateVendaDTO {
    cliente: string;
    produto: string;
    quantidade: number;
    valorTotal: number;
    formaPagamento: FormaPagamento;
    statusVenda: StatusVenda;
    statusPagamento: StatusPagamento;
    dataVenda: string;
    observacao: string;
}