# BusTrackerApiResponse

A generic response class for API responses in the Bus Tracker application.

## Class Declaration

```ts
class BusTrackerApiResponse<T> {
  data: T;
  errorcode?: number;
  message: string;
  success: boolean;

  constructor(success: boolean, message: string, data: T, errorcode?: number);
}
```

## Type Parameters

- `T`: The type of the `data` payload returned by the API

## Constructor

`new BusTrackerApiResponse(success, message, data, errorcode?)`

Creates an instance of `BusTrackerApiResponse`.

**Parameters**
| Name | Type | Required | Description |
| ----------- | --------- | -------- | -------------------------------------------- |
| `success` | `boolean` | Yes | Indicates if the API request was successful. |
| `message` | `string` | Yes | A message describing the response. |
| `data` | `T` | Yes | The response data of type `T`. |
| `errorcode` | `number` | No | Optional error code for failed responses. |

## Properties

| Name        | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| `data`      | `T`       | The response data.                               |
| `errorcode` | `number`  | Optional error code for error responses.         |
| `message`   | `string`  | A descriptive message for the response.          |
| `success`   | `boolean` | Indicates success (`true`) or failure (`false`). |

## Example Usage

```ts
const response = new BusTrackerApiResponse(true, 'Bus found', {
  id: 1,
  name: 'Bus 21',
});
```
