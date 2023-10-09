import { STORAGE_KEY, URL } from '@constants';
import { parseError } from '@helpers';
import { AuthTokens, ServiceResponse, User } from '@types';

import { ApiService } from './api';
import { Signup } from './requestPayloads';

export class AuthService {
  // TODO: implement the ApiService using a common interface to allow dynamic injection
  //      this will be helpful for unit testing
  private readonly apiClient: ApiService;

  constructor(api: ApiService) {
    this.apiClient = api;
  }

  async login(email: string, password: string): Promise<ServiceResponse<AuthTokens>> {
    try {
      const response = await this.apiClient.post(URL.LOGIN, { email, password });
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async logout(): Promise<ServiceResponse<void>> {
    try {
      const response = await this.apiClient.post(URL.LOGOUT, {});
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async signup(payload: Signup): Promise<ServiceResponse<AuthTokens>> {
    try {
      const response = await this.apiClient.post(URL.SIGN_UP, payload);
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async forgotPassword(email: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.apiClient.post(URL.FORGOT_PASSWORD, { email });
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async validateResetPasswordLink(token: string): Promise<ServiceResponse<{ userId: string }>> {
    try {
      const response = await this.apiClient.get(`${URL.RESET_PASSWORD}/${token}`);
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async resetPassword(
    userId: string,
    password: string,
    passwordResetToken: string
  ): Promise<ServiceResponse<void>> {
    try {
      const response = await this.apiClient.post(URL.RESET_PASSWORD, {
        password,
        userId,
        passwordResetToken,
      });
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async refreshAccessToken(): Promise<ServiceResponse<Pick<AuthTokens, 'accessToken'>>> {
    try {
      const response = await this.apiClient.post(URL.REFRESH_ACCESS_TOKEN, {});
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  async getCurrentUser(): Promise<ServiceResponse<User>> {
    try {
      const response = await this.apiClient.get(URL.CURRENT_USER);
      return { data: response.data };
    } catch (err: any) {
      throw parseError(err.response);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  }
}
