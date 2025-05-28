import { Request, Response } from 'express';
import { ServicePetService } from '../service/ServicePetService';
import { AppDataSource } from '../data-source';
import { ServicePet } from '../model/ServicePetModel';

export class ServicePetController {
  private service: ServicePetService;

  constructor() {
    const repo = AppDataSource.getRepository(ServicePet);
    this.service = new ServicePetService(repo);
  }

  async listarService(req: Request, res: Response): Promise<Response> {
    try {
      const servicos = await this.service.listarServicePet();
      return res.status(200).json(servicos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar serviços', error });
    }
  }

  async inserirService(req: Request, res: Response): Promise<Response> {
    try {
      const novoServico = await this.service.inserirServicePet(req.body);
      return res.status(201).json(novoServico);
    } catch (error: any) {
      return res.status(error.status || 400).json({ message: error.message || 'Erro ao inserir serviço' });
    }
  }

  async buscarPorIdService(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const servico = await this.service.buscarPorIdServicePet(id);
      return res.status(200).json(servico);
    } catch (error: any) {
      return res.status(error.status || 404).json({ message: error.message || 'Serviço não encontrado' });
    }
  }

  async atualizarService(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const atualizado = await this.service.atualizarServicePet(id, req.body);
      return res.status(200).json(atualizado);
    } catch (error: any) {
      return res.status(error.status || 400).json({ message: error.message || 'Erro ao atualizar serviço' });
    }
  }

  async deletarService(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const deletado = await this.service.deletar(id);
      return res.status(200).json(deletado);
    } catch (error: any) {
      return res.status(error.status || 404).json({ message: error.message || 'Erro ao deletar serviço' });
    }
  }
}