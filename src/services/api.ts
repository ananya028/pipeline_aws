import axios, { AxiosInstance, AxiosResponse } from 'axios';
import EventEmitter from 'eventemitter3';

import { URL, STORAGE_KEY, APP_EVENTS } from '@constants';

export class ApiService {
  private service: AxiosInstance;

  constructor(private eventEmitter: EventEmitter) {
    this.service = axios.create({ baseURL: URL.BASE });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.service.interceptors.request.use((req) => {
      if (req.url === URL.REFRESH_ACCESS_TOKEN) {
        if (localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN)) {
          req.headers.Authorization = `Bearer ${localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN)}`;
        }
      } else if (localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
        req.headers.Authorization = `Bearer ${localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)}`;
      }
      return req;
    });

    // TODO: add response interceptor for setting up common rules
    //    which never change. eg: a 401 error should always redirect to
    //    the login page, and other similar rules.
    this.service.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401) {
          this.eventEmitter.emit(APP_EVENTS.LOGOUT);
        }
        return Promise.reject(err);
      }
    );
  }

  public get(path: string): Promise<AxiosResponse> {
    return this.service.get(path);
  }

  public post(path: string, payload: any): Promise<AxiosResponse> {
    return this.service.post(path, payload);
  }
}
