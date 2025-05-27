import { Router } from 'express';
import { ServiceTypeController } from '../controller/ServiceTypeController';

export const serviceTypeRotas = (controller: ServiceTypeController): Router => {
  const router = Router();

  router.post('/', controller.inserirServiceType);
  router.get('/', controller.listarServiceTyper);
  router.get('/:id', controller.buscarPorIdServiceType);
  router.put('/:id', controller.atualizarServiceType);
  router.delete('/:id', controller.deletarServiceType);

  return router;
};