import { Request, Response } from "express";
import { ServiceTypeService } from "../service/ServiceTypeService";

const service = new ServiceTypeService();

export class ServiceTypeController {
  async listarServiceType(req: Request, res: Response) {
    try {
      const lista = await service.listarServiceType();
      return res.status(200).json(lista);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao listar os serviços." });
    }
  }

  async inserirServiceType(req: Request, res: Response) {
    try {
      const novo = await service.inserirServiceType(req.body);
      return res.status(201).json(novo);
    } catch (err) {
      return res.status(400).json({ message: "Erro ao inserir o serviço." });
    }
  }

  async buscarPorIdServiceType(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const serviceType = await service.buscarPorIdServiceType(id);

      if (!serviceType) {
        return res.status(404).json({ message: "Serviço não encontrado." });
      }

      return res.status(200).json(serviceType);
    } catch (err) {
      return res.status(400).json({ message: "Erro ao buscar o serviço." });
    }
  }

  async deletarServiceType(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletado = await service.deletarServiceType(id);

      if (!deletado) {
        return res.status(404).json({ message: "Serviço não encontrado para deletar." });
      }

      return res.status(200).json({ message: "Serviço deletado com sucesso." });
    } catch (err) {
      return res.status(400).json({ message: "Erro ao deletar o serviço." });
    }
  }
}