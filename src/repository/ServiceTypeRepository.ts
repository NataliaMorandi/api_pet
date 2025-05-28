import { AppDataSource } from '../data-source'; //
import { ServiceType } from "../model/ServiceTypeModel";
import { Repository } from "typeorm";

export class ServiceTypeRepository {
    private repo: Repository<ServiceType>;

    constructor() {
        this.repo = AppDataSource.getRepository(ServiceType);
    }

    async listarServiceType(): Promise<ServiceType[]> {
        return await this.repo.find({
            relations: ["providers", "services"],
            order: { id: "ASC" }
        });
    }

    async inserirServiceType(serviceType: ServiceType): Promise<ServiceType> {
        const novoServiceType = this.repo.create(serviceType);
        return await this.repo.save(novoServiceType);
    }

    async buscarPorIdServiceType(id: number): Promise<ServiceType | undefined> {
        const service = await this.repo.findOne({
            where: { id },
            relations: ["providers", "services"]
        });
        return service ?? undefined;
    }

    async deletarServiceType(id: number): Promise<boolean> {
        const resultado = await this.repo.delete(id);
        return resultado.affected !== 0;
    }

}