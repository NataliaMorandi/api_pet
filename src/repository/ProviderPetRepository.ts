import { AppDataSource } from '../data-source'; //
import { ProviderPet } from "../model/ProviderPetModel";
import { Repository } from "typeorm";

export class ProviderRepository {
    // private listaProviders: Provider[] = [];
    // private proximoId: number = 1;
    private repo: Repository<ProviderPet>;

    constructor() {
        this.repo = AppDataSource.getRepository(ProviderPet);
    }

    async listarProvider(): Promise<ProviderPet[]> {
        return await this.repo.find({
            relations: ["types_of_service"],
            order: { id: "ASC" }
        });
    }

    async inserirProvider(providerData: Partial<ProviderPet>): Promise<ProviderPet> {
        const novoProvider = this.repo.create(providerData);
        return await this.repo.save(novoProvider);
    }

    async buscarPorIdProvider(id: number): Promise<ProviderPet | null > {
        return await this.repo.findOneBy({ id });
    }

    async atualizarProvider(id: number, dados: Partial<ProviderPet>): Promise<ProviderPet | undefined> {
        const provider = await this.repo.findOneBy({ id });
        if (!provider) return undefined;

        this.repo.merge(provider, dados);
        return await this.repo.save(provider);
    }

    async deletarProvider(id: number): Promise<ProviderPet | undefined> {
        const provider = await this.repo.findOneBy({ id });
        if (!provider) return undefined;

        await this.repo.remove(provider);
        return provider;
    }

}
