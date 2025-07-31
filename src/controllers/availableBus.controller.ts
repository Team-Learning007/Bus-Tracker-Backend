import BusTrackerApiResponse from '#libraries/busTrackerApiResponse.js';
import { AvailableBusService } from '#services/availableBus.service.js';
import { mongoDbDriverIdFormatChecker } from '#utils/checker/mongoDbIDChecker.js';
import { RequestChecker } from '#utils/checker/requestChecker.js';
import { Request, Response } from 'express';

interface IAvailableBusServiceRequest extends Request {
  destination: string;
  driverId: string;
  origin: string;
}

export class AvailableBusController {
  availableBusService: AvailableBusService;
  requestChecker: RequestChecker;

  constructor(availableService: AvailableBusService) {
    this.availableBusService = availableService;
    this.requestChecker = new RequestChecker();
  }

  availabelBusActivationStatus = async (req: Request, res: Response) => {
    const { driverId } = req.params;

    this.requestChecker.driverId(driverId);

    await this.availableBusService.driverNotExists(driverId);

    await this.availableBusService.availabelBusActivationStatus(driverId);

    const response = new BusTrackerApiResponse(
      true,
      'Bus Activate Successfully',
      {},
    );

    res.status(200).json(response);
  };

  availableBusDeactivateStatus = async (req: Request, res: Response) => {
    const { driverId } = req.params;

    this.requestChecker.driverId(driverId);

    await this.availableBusService.driverNotExists(driverId);

    await this.availableBusService.availableBusDeactivationStatus(driverId);

    const response = new BusTrackerApiResponse(
      true,
      'Bus Deactivate Successfully',
      {},
    );

    res.status(200).json(response);
  };

  createAvailableBus = async (req: Request, res: Response) => {
    const { destination, driverId, origin } =
      req.body as IAvailableBusServiceRequest;

    this.requestChecker.driverId(driverId);
    this.requestChecker.origin(origin);
    this.requestChecker.destination(destination);

    mongoDbDriverIdFormatChecker(
      driverId,
      `${driverId} This driverId format is invalid`,
    );

    // TODO:- To implement driverExists check in driver database after driver model created

    await this.availableBusService.driverExists(driverId);

    const result = await this.availableBusService.createAvailableBus(
      driverId,
      origin,
      destination,
    );

    const response = new BusTrackerApiResponse(
      true,
      'Successfully Created Available Bus',
      result,
    );

    res.status(201).json(response);
  };

  getAvailableBusStatus = async (req: Request, res: Response) => {
    const { driverId } = req.params;

    this.requestChecker.driverId(driverId);

    await this.availableBusService.driverNotExists(driverId);

    const result =
      await this.availableBusService.getAvailableBusStatus(driverId);

    const response = new BusTrackerApiResponse(
      true,
      'Successfully Get Available Bus',
      result,
    );

    res.status(200).json(response);
  };
}
