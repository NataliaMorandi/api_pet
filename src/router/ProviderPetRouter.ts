import { Router } from 'express';
import { ProviderController } from '../controller/ProviderPetController';
import { AppDataSource } from "../data-source";
import { ProviderPet } from "../model/ProviderPetModel";


export const providerRotas = (controller: ProviderController): Router => {
  const router = Router();

router.get('/', controller.listarProvider);
router.post('/', controller.inserirProvider);
router.get('/:id', controller.buscarPorIdProvider.bind(controller));
router.put('/:id', controller.atualizarProvider.bind(controller));
router.delete('/:id', controller.deletarProvider.bind(controller));

  return router;
};
