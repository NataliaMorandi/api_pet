import { Router } from 'express';
import { ServiceTypeController } from '../controller/ServiceTypeController';

export const serviceTypeRotas = (controller: ServiceTypeController): Router => {
  const router = Router();

  router.get('/', controller.listarServiceType);
  router.post('/', controller.inserirServiceType);
  router.get('/:id', controller.buscarPorIdServiceType);
  router.delete('/:id', controller.deletarServiceType);

  return router;
};