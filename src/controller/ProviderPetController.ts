import { Request, Response } from 'express';
import { ProviderService } from '../service/ProviderPetService';

export class ProviderController {
    private service: ProviderService;
    constructor(service: ProviderService) {
        this.service = service;
    }

    listarProvider = async (_req: Request, res: Response): Promise<void> => {
        const provider = await this.service.listarProvider();
        res.json(provider);
    };

    inserirProvider = async (req: Request, res: Response): Promise<void> => {
        const { nome, endereco, telefone, types_of_service } = req.body;
        try {
            const novoProvider = await this.service.inserirProvider({ nome, endereco, telefone, types_of_service });
            res.status(201).json(novoProvider);
        } catch (error: any) {
            res.status(error.id || 400).json({ message: error.msg || "Erro ao inserir provider" });
        }
    }

    buscarPorIdProvider = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        try {
            const provider = await this.service.buscarPorIdProvider(id);
            res.status(200).json(provider);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || "Provider não encontrado" });
        }
    }

    atualizarProvider = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const { nome, endereco, telefone, types_of_service } = req.body;
        try {
            const providerAtualizado = await this.service.atualizarProvider(id, { nome, endereco, telefone, types_of_service });
            res.status(200).json(providerAtualizado);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || "Erro ao atualizar provider" });
        }
    }

    deletarProvider = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        try {
            const providerDeletado = await this.service.deletarProvider(id);
            res.status(200).json(providerDeletado);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || "Erro ao deletar provider" });
        }
    };
}