import { Repository } from 'typeorm';
import { ProviderPet } from "../model/ProviderPetModel";
import { ProviderRepository } from "../repository/ProviderPetRepository";

export class ProviderService {
    private repository: ProviderRepository;

    constructor(repository: ProviderRepository) {
        this.repository = repository;
    }

    async listarProvider(): Promise<ProviderPet[]> {
        return await this.repository.listarProvider();
    }

    async inserirProvider(providerData: Partial<ProviderPet>): Promise<ProviderPet> {
        if (!providerData.nome) {
            throw ({id: 400, msg: "Falta dados obrigatorios"});
        }
        return await this.repository.inserirProvider(providerData);
    }

    async buscarPorIdProvider(id: number): Promise<ProviderPet> {
        const provider = await this.repository.buscarPorIdProvider(id);
        if (!provider) {
            throw { status: 404, message: "Provider não encontrado" };
        }
        return provider;
    }

    async atualizarProvider(id: number, dados: Partial<ProviderPet>): Promise<ProviderPet> {
        const providerAtualizado = await this.repository.atualizarProvider(id, dados);
        if (!providerAtualizado) {
            throw { status: 404, message: "Provider não encontrado para atualizar" };
        }
        return providerAtualizado;
    }

    async deletarProvider(id: number): Promise<ProviderPet> {
        const providerDeletado = await this.repository.deletarProvider(id);
        if (!providerDeletado) {
            throw { status: 404, message: "Provider não encontrado para deletar" };
        }
        return providerDeletado;
    }
}
