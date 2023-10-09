import { AxiosResponse } from 'axios';

import { ApiError } from '@types';

export function parseError(response: AxiosResponse): ApiError {
  if (!response || !response.data) {
    return {
      message: 'Internal server error.',
      status: 500,
      errorCode: 'app_errors.internal_server_error',
    };
  }
  const { message, errorCode, errors } = response.data;
  return { message, errorCode, errors, status: response.status };
}
