class BusTrackerApiResponse<T> {
  data: T;
  errorcode?: number;
  message: string;
  success: boolean;
  constructor(success: boolean, message: string, data: T, errorcode?: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errorcode = errorcode;
  }
}

export default BusTrackerApiResponse;
