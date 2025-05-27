import { Repository } from 'typeorm';
import { ServicePet } from '../model/ServicePetModel';
import { ServiceType } from '../model/ServiceTypeModel';

export class ServicePetService {
  private repository: Repository<ServicePet>;

    constructor(repository: Repository<ServicePet>) {
        this.repository = repository;
    }

    async listarServicePet(): Promise<ServicePet[]> {
        return await this.repository.find({
            relations: {
                type: true
            },
            order: { id: 'ASC' }
        });
    }

    async inserirServicePet(servicePet: ServicePet): Promise<ServicePet> {
        if (!servicePet.data_inicio || !servicePet.data_fim || !servicePet.type) {
            throw { status: 400, message: "Dados obrigatórios faltando" };
        }
        const servicosConflitantes = await this.repository.find({
            where: {
                type: { id: servicePet.type.id },
                data_inicio: servicePet.data_inicio,
            },
        });
        if (servicosConflitantes.length > 0) {
            throw { status: 409, message: "Prestador já possui serviço nesta data" };
        }
        servicePet.data_inicio = new Date(servicePet.data_inicio);
        servicePet.data_fim = new Date(servicePet.data_fim);
        return await this.repository.save(servicePet);
    }


    async buscarPorIdServicePet(id: number): Promise<ServicePet> {
        const service = await this.repository.findOne({
            where: { id },
            relations: {
                type: true
            }
        });
        if (!service) {
            throw { status: 404, message: "Serviço não encontrado" };
        }
        return service;
    }

    async atualizarServicePet(id: number, dados: Partial<ServicePet>): Promise<ServicePet> {
        const service = await this.repository.findOneBy({ id });
        if (!service) {
            throw { status: 404, message: "Serviço não encontrado para atualizar" };
        }
        this.repository.merge(service, dados);
        return await this.repository.save(service);
    }

    async deletar(id: number): Promise<ServicePet> {
        const service = await this.repository.findOneBy({ id });
        if (!service) {
            throw { status: 404, message: "Serviço não encontrado para deletar" };
        }
        await this.repository.remove(service);
        return service;
    }
}


