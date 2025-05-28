import express from 'express';

import { ProviderPet } from './model/ProviderPetModel';
import { ProviderRepository } from './repository/ProviderPetRepository';
import { ProviderService } from './service/ProviderPetService';
import { ProviderController } from './controller/ProviderPetController';
import { providerRotas } from './router/ProviderPetRouter';

import { ServicePet } from './model/ServicePetModel';
import { ServicePetRepository } from './repository/ServicePetRepository';
import { ServicePetService } from './service/ServicePetService';
import { ServicePetController } from './controller/ServicePetController';
import { servicePetRotas } from './router/ServicePetRouter';

import { ServiceType } from './model/ServiceTypeModel';
import { ServiceTypeRepository } from './repository/ServiceTypeRepository';
import { ServiceTypeService } from './service/ServiceTypeService';
import { ServiceTypeController } from './controller/ServiceTypeController';
import { serviceTypeRotas } from './router/ServiceTypeRouter';

import { AppDataSource } from './data-source';


const app = express();
app.use(express.json());
export async function initializeApp() {
    await AppDataSource.initialize();

    const providerRepository = AppDataSource.getRepository(ProviderPet);
    const serviceRepository = AppDataSource.getRepository(ServicePet);
    const serviceTypeRepository = AppDataSource.getRepository(ServiceType);

    // Serviços
    const providerService = new ProviderService(providerRepository);
    const serviceService = new ServicePetService(serviceRepository);
    const serviceTypeService = new ServiceTypeService(serviceTypeRepository);

    // Controllers
    const providerController = new ProviderController(providerService);
    const serviceController = new ServicePetController(serviceService);
    const serviceTypeController = new ServiceTypeController(serviceTypeService);

    // Rotas
    app.use('/api/provider', providerRotas(providerController));
    app.use('/api/service', servicePetRotas(serviceController));
    app.use('/api/serviceType', serviceTypeRotas(serviceTypeController));

    app.get('/', (req, res) => {
        res.send('API is running');
    });

    return app;
}
// AppDataSource.initialize().then(async => {
//   const app = express();
//   app.use(express.json());

//   // Initialize dependencies 
//   //Provider
//   const providerRepository = AppDataSource.getRepository( ProviderPet );
//   const providerService = new  ProviderService(providerRepository);
//   const providerController = new  ProviderController(providerService);

//   //Service
//   const serviceRepository = AppDataSource.getRepository( ServicePet );
//   const serviceService = new  ServicePetService(serviceRepository);
//   const serviceController = new  ServicePetController(serviceService);

//   //ServiceType
//   const serviceTypeRepository = AppDataSource.getRepository( ServiceType );
//   const serviceTypeService = new ServiceTypeService(serviceTypeRepository);
//   const serviceTypeController = new ServiceTypeController(serviceTypeService);


//   // Routes
//   app.use('/api/service', servicePetRotas(serviceController));
//   app.use('/api/serviceType', serviceTypeRotas(serviceTypeController));
//   app.use('/api/provider', providerRotas(providerController));

//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });

  
// });