import { Router } from 'express';
import { ServiceTypeController } from '../controller/ServiceTypeController';

export const serviceTypeRotas = (controller: ServiceTypeController): Router => {
  const router = Router();

  router.get('/', controller.listarServiceType.bind(controller));
  router.post('/', controller.inserirServiceType.bind(controller));
  router.get('/:id', controller.buscarPorIdServiceType.bind(controller));
  router.delete('/:id', controller.deletarServiceType.bind(controller));

  return router;
};