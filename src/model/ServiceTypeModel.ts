import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServicePet } from "./ServicePetModel";
import { ProviderPet } from "./ProviderPetModel";


@Entity()
export class ServiceType {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => ProviderPet, (provider) => provider.types_of_service) 
    providers?: ProviderPet[];

  @OneToMany(() => ServicePet, (service) => service.type) 
    services?: ServicePet[];
  
}