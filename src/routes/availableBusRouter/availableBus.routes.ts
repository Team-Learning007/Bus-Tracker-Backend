import { AvailableBusController } from '#controllers/availableBus.controller.js';
import { AvailableBusService } from '#services/availableBus.service.js';
import Router from 'express';

const availableBusRouter = Router();

const availableService: AvailableBusService = new AvailableBusService();

const availableBusController: AvailableBusController =
  new AvailableBusController(availableService);

availableBusRouter.post('/', availableBusController.createAvailableBus);

export default availableBusRouter;
