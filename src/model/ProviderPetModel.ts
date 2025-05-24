import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ServiceType } from "./ServiceTypeModel";

@Entity()
export class ProviderPet {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome!: string;

    @Column()
    endereco?: string;

    @Column()
    telefone?: string;

    @ManyToMany(() => ServiceType, (type) => type.providers)
    @JoinTable()
    types_of_service?: ServiceType[];

}