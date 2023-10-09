import { URL } from '@constants';
import { parseError } from '@helpers';
import {
  ServiceResponse,
  SvgManipulationInput,
  SvgManipulationOutput,
  MakeItSmartInput,
  MakeItSmartOutput,
} from '@types';

import { ApiService } from './api';

export class SvgService {
  // TODO: implement the ApiService using a common interface to allow dynamic injection
  //      this will be helpful for unit testing
  private readonly apiClient: ApiService;

  constructor(api: ApiService) {
    this.apiClient = api;
  }

  async performManipulations(
    payload: SvgManipulationInput
  ): Promise<ServiceResponse<SvgManipulationOutput>> {
    try {
      const response = await this.apiClient.post(URL.PERFORM_SVG_MANIPULATIONS, payload);
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async makeSmartSVG(payload: MakeItSmartInput): Promise<ServiceResponse<MakeItSmartOutput>> {
    try {
      const response = await this.apiClient.post(URL.MAKE_SMART_SVG, payload);
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }
}
