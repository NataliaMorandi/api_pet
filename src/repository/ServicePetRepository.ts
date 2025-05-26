import { AppDataSource } from '../data-source'; //
import { ServicePet } from "../model/ServicePetModel";
import { Repository } from "typeorm";

export class ServicePetRepository {
    // private listaProviders: Provider[] = [];
    // private proximoId: number = 1;
    private repo: Repository<ServicePet>;

    constructor() {
        this.repo = AppDataSource.getRepository(ServicePet);
    }

    async listarServicePet(): Promise<ServicePet[]> {
        return await this.repo.find({
            relations: ["type"],
            order: { id: "ASC" }
        });
    }

    async inserirServicePet(servicePetData: ServicePet): Promise<ServicePet> {
        const novoService = this.repo.create(servicePetData);
        return await this.repo.save(novoService);
    }

    async buscarPorIdServicePet(id: number): Promise<ServicePet | undefined> {
        const service = await this.repo.findOne({
            where: { id },
            relations: ["type"]
        });
        return service ?? undefined;
    }

    async atualizar(id: number, dadosAtualizados: Partial<ServicePet>): Promise<ServicePet | undefined> {
        const serviceExistente = await this.repo.findOneBy({ id });

        if (!serviceExistente) {
            return undefined;
        }

        const atualizado = this.repo.merge(serviceExistente, dadosAtualizados);
        return await this.repo.save(atualizado);
    }

    async deletarServicePet(id: number): Promise<ServicePet | undefined> {
        const service = await this.repo.findOneBy({ id });

        if (!service) {
            return undefined;
        }

        await this.repo.remove(service);
        return service;
    }

}