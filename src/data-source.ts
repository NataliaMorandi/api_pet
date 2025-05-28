import 'reflect-metadata';
import { DataSource } from "typeorm";

import { ProviderPet } from "./model/ProviderPetModel";
import { ServicePet } from "./model/ServicePetModel";
import { ServiceType } from "./model/ServiceTypeModel";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'pet_service',
  synchronize: true, 
  logging: true,
  entities: [ProviderPet, ServicePet, ServiceType],
  migrations: [],
  subscribers: [],
});