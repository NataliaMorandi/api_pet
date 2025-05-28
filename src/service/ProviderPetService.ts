import { Repository } from 'typeorm';
import { ProviderPet } from "../model/ProviderPetModel";
import { ProviderRepository } from "../repository/ProviderPetRepository";

export class ProviderService {
    private repository: Repository<ProviderPet>;

    constructor(repository: Repository<ProviderPet>) {
        this.repository = repository;
    }

    async listarProvider(): Promise<ProviderPet[]> {
        return await this.repository.find();
    }

    async inserirProvider(providerData: Partial<ProviderPet>): Promise<ProviderPet> {
        if (!providerData.nome) {
            throw ({id: 400, msg: "Falta dados obrigatorios"});
        }
        return await this.repository.save(providerData);
    }

    async buscarPorIdProvider(id: number): Promise<ProviderPet> {
        const provider = await this.repository.findOneBy({ id });
        if (!provider) {
            throw { status: 404, message: "Provider não encontrado" };
        }
        return provider;
    }

    async atualizarProvider(id: number, dados: Partial<ProviderPet>): Promise<ProviderPet> {
        const providerAtualizado = await this.repository.findOneBy({ id });
        if (!providerAtualizado) {
            throw { status: 404, message: "Provider não encontrado para atualizar" };
        }
        this.repository.merge(providerAtualizado, dados);
        return await this.repository.save(providerAtualizado);
    }

    async deletarProvider(id: number): Promise<ProviderPet> {
        const providerDeletado = await this.repository.findOneBy({ id });
        if (!providerDeletado) {
            throw { status: 404, message: "Provider não encontrado para deletar" };
        }
        await this.repository.remove(providerDeletado); 
        return providerDeletado;
    }
}
