import { AvailableBusController } from '#controllers/availableBus.controller.js';
import { AvailableBusService } from '#services/availableBus.service.js';
import Router from 'express';

const availableBusRouter = Router();

const availableService: AvailableBusService = new AvailableBusService();

const availableBusController: AvailableBusController =
  new AvailableBusController(availableService);

availableBusRouter.post('/', availableBusController.createAvailableBus);
availableBusRouter.patch(
  '/:driverId/activate',
  availableBusController.availabelBusActivationStatus,
);
availableBusRouter.patch(
  '/:driverId/deactivate',
  availableBusController.availableBusDeactivateStatus,
);

export default availableBusRouter;
