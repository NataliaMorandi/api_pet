import { Router } from 'express';
import { ServicePetController } from '../controller/ServicePetController';

export const servicePetRotas = (controller: ServicePetController): Router => {
  const router = Router();

router.get('/', controller.listarService.bind(controller));
router.post('/', controller.inserirService.bind(controller));
router.get('/:id', controller.buscarPorIdService.bind(controller));
router.put('/:id', controller.atualizarService.bind(controller));
router.delete('/:id', controller.deletarService.bind(controller));

  return router;
};
