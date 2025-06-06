import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { ProviderPet } from "../model/ProviderPetModel";
import { ServiceType } from "../model/ServiceTypeModel";
import { ProviderRepository } from "../repository/ProviderPetRepository";
import { ServiceTypeRepository } from "../repository/ServiceTypeRepository";

export class ProviderService {
    private repository: Repository<ProviderPet>;

    constructor(repository: Repository<ProviderPet>) {
        this.repository = repository;
    }

    async listarProvider(): Promise<ProviderPet[]> {
        return await this.repository.find({
            relations: ['types_of_service'],
        });
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
        const providerAtualizado = await this.repository.findOne({
            where: { id },
            relations: ['types_of_service'], 
        });

    if (!providerAtualizado) {
        throw { status: 404, message: "Provider não encontrado para atualizar" };
    }

    if (dados.types_of_service && Array.isArray(dados.types_of_service)) {
        const serviceTypeRepo = this.repository.manager.getRepository(ServiceType);
        const tipos = await serviceTypeRepo.find({
            where: {
                id: In(dados.types_of_service.map((type: any) => type.id)),

            },
        });
        providerAtualizado.types_of_service = tipos;
    }

    this.repository.merge(providerAtualizado, {
        nome: dados.nome,
        endereco: dados.endereco,
        telefone: dados.telefone,
    });

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
