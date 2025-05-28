import { Request, Response } from 'express';
import { ProviderService } from '../service/ProviderPetService';

export class ProviderController {
  constructor(private service: ProviderService) {}

  async listarProvider(req: Request, res: Response): Promise<Response> {
    try {
      const providers = await this.service.listarProvider();
      return res.status(200).json(providers);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar providers", error });
    }
  }

  async inserirProvider(req: Request, res: Response): Promise<Response> {
    try {
      const novoProvider = await this.service.inserirProvider(req.body);
      return res.status(201).json(novoProvider);
    } catch (error: any) {
      return res.status(error.id || 400).json({ message: error.msg || "Erro ao inserir provider" });
    }
  }

  async buscarPorIdProvider(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const provider = await this.service.buscarPorIdProvider(id);
      return res.status(200).json(provider);
    } catch (error: any) {
      return res.status(error.status || 404).json({ message: error.message || "Provider não encontrado" });
    }
  }

  async atualizarProvider(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const providerAtualizado = await this.service.atualizarProvider(id, req.body);
      return res.status(200).json(providerAtualizado);
    } catch (error: any) {
      return res.status(error.status || 404).json({ message: error.message || "Erro ao atualizar provider" });
    }
  }

  async deletarProvider(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const providerDeletado = await this.service.deletarProvider(id);
      return res.status(200).json(providerDeletado);
    } catch (error: any) {
      return res.status(error.status || 404).json({ message: error.message || "Erro ao deletar provider" });
    }
  }
}