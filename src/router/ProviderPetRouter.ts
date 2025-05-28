import { Router } from 'express';
import { ProviderController } from '../controller/ProviderPetController';

export const providerRotas = (controller: ProviderController): Router => {
  const router = Router();

router.get('/', controller.listarProvider.bind(controller));
router.post('/', controller.inserirProvider.bind(controller));
router.get('/:id', controller.buscarPorIdProvider.bind(controller));
router.put('/:id', controller.atualizarProvider.bind(controller));
router.delete('/:id', controller.deletarProvider.bind(controller));

  return router;
};
