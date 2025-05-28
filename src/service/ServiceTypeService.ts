import { Repository } from 'typeorm';
import { ServiceType } from "../model/ServiceTypeModel";
import { ServiceTypeRepository } from "../repository/ServiceTypeRepository";

export class ServiceTypeService {
    private repository: Repository<ServiceType>;

    constructor(repository: Repository<ServiceType>) {
        this.repository = repository;
    }

    async listarServiceType(): Promise<ServiceType[]> {
        return await this.repository.find();
    }

    async inserirServiceType(serviceTypeData: ServiceType): Promise<ServiceType> {
        return await this.repository.save(serviceTypeData);
    }

    async buscarPorIdServiceType(id: number): Promise<ServiceType> {
        const serviceType = await this.repository.findOneBy({ id });
        if (!serviceType) {
            throw { status: 404, message: "Tipo de serviço não encontrado" };
        }
        return serviceType;
    }

    async deletarServiceType(id: number): Promise<ServiceType> {
        const serviceTypeDeletado = await this.repository.findOneBy({ id });
        if (!serviceTypeDeletado) {
            throw { status: 404, message: "Provider não encontrado para deletar" };
        }
        await this.repository.remove(serviceTypeDeletado); 
        return serviceTypeDeletado;
    }
}