import { Router } from 'express';
import { ServicePetController } from '../controller/ServicePetController';

export const servicePetRotas = (controller: ServicePetController): Router => {
  const router = Router();

  router.post('/', controller.inserirServicePet);
  router.get('/', controller.listarServicePet);
  router.get('/:id', controller.buscarPorIdServicePet);
  router.put('/:id', controller.atualizarServicePet);
  router.delete('/:id', controller.deletarServicePet);

  return router;
};