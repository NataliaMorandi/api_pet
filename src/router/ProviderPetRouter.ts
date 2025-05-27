import { Router } from 'express';
import { ProviderPetController } from '../controller/ProviderPetController';

export const providerPetRotas = (controller: ProviderPetController): Router => {
  const router = Router();

  router.post('/', controller.inserirProviderPet);
  router.get('/', controller.listarProviderPet);
  router.get('/:id', controller.buscarPorIdProviderPet);
  router.put('/:id', controller.atualizarProviderPet);
  router.delete('/:id', controller.deletarProviderPet);

  return router;
};