import { createContext } from 'react';
import EventEmitter from 'eventemitter3';
import { ApiService, AuthService, SvgService } from '@services';

const eventEmitter = new EventEmitter();
const apiService = new ApiService(eventEmitter);

export interface AppDependenciesProps {
  eventEmitter: EventEmitter;
  authService: AuthService;
  svgService: SvgService;
}

export function getDependencies(): AppDependenciesProps {
  return {
    eventEmitter,
    authService: new AuthService(apiService),
    svgService: new SvgService(apiService),
  };
}

export const AppDependenciesContext = createContext<AppDependenciesProps>(getDependencies());
