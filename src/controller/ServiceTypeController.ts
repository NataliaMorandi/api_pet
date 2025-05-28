import { Request, Response } from "express";
import { ServiceTypeService } from "../service/ServiceTypeService";

export class ServiceTypeController {
    private service: ServiceTypeService;
    constructor(service: ServiceTypeService) {
        this.service = service;
    }

    listarServiceType = async (req: Request, res: Response): Promise<void> => {
        const lista = await this.service.listarServiceType();
            res.json(lista);
    };

    inserirServiceType = async (req: Request, res: Response): Promise<void> => {
        const { name } = req.body;
        try {
            const novoServiceType = await this.service.inserirServiceType({ name });
            res.status(201).json(novoServiceType);
        } catch (error: any) {
            res.status(error.id || 400).json({ message: error.msg || "Erro ao inserir o serviço." });
        }
    }

    buscarPorIdServiceType = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        try {
            const serviceType = await this.service.buscarPorIdServiceType(id);
            res.status(200).json(serviceType);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || "Serviço não encontrado" });
        }
    }

    deletarServiceType = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        try {
            const deletado = await this.service.deletarServiceType(id);
            res.status(200).json(deletado);
        } catch (error: any) {
            res.status(error.status || 404).json({ message: error.message || "Erro ao deletar o serviço." });
        }
    }
}