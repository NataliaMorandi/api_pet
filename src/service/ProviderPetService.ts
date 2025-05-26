import { Repository } from 'typeorm';
import { ProviderPet } from "../model/ProviderPetModel";
import { ProviderRepository } from "../repository/ProviderPetRepository";

export class ProviderService {
    private repository: ProviderRepository;

    constructor() {
        this.repository = new ProviderRepository();
    }

    async listarProviders(): Promise<ProviderPet[]> {
        return await this.repository.listarProvider();
    }

    async inserirProvider(providerData: Partial<ProviderPet>): Promise<ProviderPet> {
        if (!providerData.nome) {
            throw ({id: 400, msg: "Falta dados obrigatorios"});
        }
        return await this.repository.inserirProvider(providerData);
    }

    async buscarProviderPorId(id: number): Promise<ProviderPet | undefined> {
        const produto = await this.repository.buscarPorId(id);

        if (!produto) {
            throw { id: 404, msg: "Produto não encontrado" }; // Lança erro aqui
        }
        return produto;
    }



}