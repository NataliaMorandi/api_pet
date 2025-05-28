import { ServiceType } from "../model/ServiceTypeModel";
import { ServiceTypeRepository } from "../repository/ServiceTypeRepository";

export class ServiceTypeService {
    private repository: ServiceTypeRepository;

    constructor() {
        this.repository = new ServiceTypeRepository();
    }

    async listarServiceType(): Promise<ServiceType[]> {
        return await this.repository.listarServiceType();
    }

    async inserirServiceType(serviceTypeData: ServiceType): Promise<ServiceType> {
        return await this.repository.inserirServiceType(serviceTypeData);
    }

    async buscarPorIdServiceType(id: number): Promise<ServiceType> {
        const serviceType = await this.repository.buscarPorIdServiceType(id);
        
        if (!serviceType) {
            throw { status: 404, message: "Tipo de serviço não encontrado" };
        }

        return serviceType;
    }

    async deletarServiceType(id: number): Promise<boolean> {
        return await this.repository.deletarServiceType(id);
        // const sucesso = await this.repository.deletarServiceType(id);

        // if (!sucesso) {
        //     throw { status: 404, message: "Tipo de serviço não encontrado para deletar" };
        // }
    }
}