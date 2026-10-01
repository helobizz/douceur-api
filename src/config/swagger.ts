import { format } from "node:path";
import swaggerUi from "swagger-ui-express";

export { swaggerUi };

export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Douceur API", 
        version: "1.0.0",
        description: "API RESTful para gerenciamento de vendas da Douceur.",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    paths: {
        "/vendas": {
            get: {
                summary: "Lista todas as vendas",
                description: "Retorna todas as vendas cadastradas.",
                responses: {
                    "200": {
                        description: "Lista de vendas retornada com sucesso.",
                    },
                    "500": {
                        description: "Erro interno do servidor."
                    },
                },
            },


            post: {
                summary: "Cadastra uma nova venda.",
                description: "Cria uma nova venda no sistema.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    cliente: {
                                        type: "string",
                                        example: "Ícaro",
                                    },
                                    produto: {
                                        type: "string",
                                        example: "Cookie de Nutella",
                                    },
                                    quantidade: {
                                        type: "integer",
                                        example: 2,
                                    },
                                    valorTotal: {
                                        type: "number",
                                        format: "double",
                                        example: 24.0,
                                    },
                                    formaPagamento: {
                                        type: "string",
                                        enum: ["PIX", "DINHEIRO"],
                                        example: "PIX",
                                    },
                                    statusVenda: {
                                        type: "string",
                                        enum: ["RESERVADA", "ENCOMENDADA", "ENTREGUE", "CANCELADA"],
                                        example: "ENTREGUE",
                                    },
                                    statusPagamento: {
                                        type: "string",
                                        enum: ["PAGO", "PENDENTE"],
                                        example: "PAGO",
                                    },
                                    dataVenda: {
                                        type: "string",
                                        format: "date",
                                        example: "2026-09-30",
                                    },
                                    observacao: {
                                        type: "string",
                                        example: "Entregar às 21h."
                                    },
                                },
                                required: [
                                    "cliente",
                                    "produto",
                                    "quantidade",
                                    "valorTotal",
                                    "formaPagamento",
                                    "statusVenda",
                                    "statusPagamento",
                                    "dataVenda",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Venda cadastrada com sucesso.",
                    },
                    "400": {
                        description: "Dados inválidos.",
                    },
                    "500": {
                        description: "Erro interno do servidor.",
                    },
                },
            },
        },
            
        "/vendas/{id}": {
            get: {
                summary: "Busca uma venda pelo ID",
                descriptions: "Retorna uma venda específica pelo se ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID da venda",
                        schema: {
                            type: "integer",
                            example: 1,
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Venda encontrada com sucesso.",
                    },
                    "404": {
                        description: "Venda não encontrada."
                    },
                    "500": {
                        description: "Erro interno do servidor."
                    },
                },
            },

            put: {
                summary: "Atualiza uma venda",
                description: "Atualiza os dados de uma venda existente.",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID da venda",
                        schema: {
                            type: "integer",
                            example: 1,
                        },
                    },
                ],

                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    cliente: {
                                        type: "string",
                                        example: "Ícaro",
                                    },
                                    produto: {
                                        type: "string",
                                        example: "Cookie de Nutella",
                                    },
                                    quantidade: {
                                        type: "integer",
                                        example: 3,
                                    },
                                    valorTotal: {
                                        type: "number",
                                        example: 36.0,
                                    },
                                    formaPagamento: {
                                        type: "string",
                                        enum: ["PIX", "DINHEIRO"],
                                        example: "PIX",
                                    },
                                    statusVenda: {
                                        type: "string",
                                        enum: ["RESERVADA", "ENCOMENDADA", "ENTREGUE", "CANCELADA"],
                                        example: "ENTREGUE",
                                    },
                                    statusPagamento: {
                                        type: "string",
                                        enum: ["PAGO", "PENDENTE"],
                                        example: "PAGO",
                                    },
                                    dataVenda: {
                                        type: "string",
                                        format: "date",
                                        example: "2026-09-30",
                                    },
                                    observacao: {
                                        type: "string",
                                        example: "Entregar às 21h.",
                                    },
                                },
                                required: [
                                    "cliente",
                                    "produto",
                                    "quantidade",
                                    "valorTotal",
                                    "formaPagamento",
                                    "statusVenda",
                                    "statusPagamento",
                                    "dataVenda",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Venda atualizada com sucesso.",
                    },
                    "400": {
                        description: "Dados inválidos.",
                    },
                    "404": {
                        description: "Venda não encontrada.",
                    },
                    "500": {
                        description: "Erro interno do servidor.",
                    },
                },
            },
            delete: {
                summary: "Exclui uma venda",
                description: "Exclui uma venda existente pelo seu ID.",

                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID da venda",
                        schema: {
                            type: "integer",
                            example: 1,
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Venda excluída com sucesso.",
                    },
                    "404": {
                        description: "Venda não encontrada.",
                    },
                    "500": {
                        description: "Erro interno do servidor.",
                    },
                },
            },
        },
    },
};