import { Request, Response } from 'express';
import { ServicePetService } from '../service/ServicePetService';
import { AppDataSource } from '../data-source';
import { ServicePet } from '../model/ServicePetModel';

export class ServicePetController {
    private service: ServicePetService;
    constructor(service: ServicePetService) {
        this.service = service;
    }

    listarService = async (req: Request, res: Response): Promise<void> => {
        try {
            const servicos = await this.service.listarServicePet();
            res.status(200).json(servicos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar serviços', error });
        }
    }

    inserirService = async (req: Request, res: Response): Promise<void> => {
        try {
            const novoServico = await this.service.inserirServicePet(req.body);
            res.status(201).json(novoServico);
        } catch (error: any) {
            res.status(error.status || 400).json({ message: error.message || 'Erro ao inserir serviço' });
        }
    }

    buscarPorIdService = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const servico = await this.service.buscarPorIdServicePet(id);
            res.status(200).json(servico);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || 'Serviço não encontrado' });
        }
    }

    atualizarService = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const atualizado = await this.service.atualizarServicePet(id, req.body);
            res.status(200).json(atualizado);
        } catch (error: any) {
            res.status(error.status || 400).json({ message: error.message || 'Erro ao atualizar serviço' });
        }
    }

    deletarService = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const deletado = await this.service.deletar(id);
            res.status(200).json(deletado);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || 'Erro ao deletar serviço' });
        }
    }
}