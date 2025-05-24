import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "./ServiceTypeModel";


@Entity()
export class ServicePet {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    data_inicio?: Date;

    @Column()
    data_fim?: Date;

    @ManyToOne(() => ServiceType, (type) => type.services)
    type?: ServiceType;
  }