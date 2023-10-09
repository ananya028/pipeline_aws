import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

// Services
import { RequestPayloads } from '@services';

// Constants
import { APP_EVENTS, STORAGE_KEY } from '@constants';

// Types
import { User, FieldValidationError, ApiError } from '@types';

// Helpers
import { ColorHelper, LocalStoreHelper } from '@helpers';
import { MantineTheme } from '@mantine/core';
import { AppDependenciesContext } from './AppDependencies';

interface ReturnType {
  errorFields: FieldValidationError[];
  message: string;
}

export interface AuthenticationContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  errorMessage: string;
  user?: User;
  onLogin: (email: string, password: string) => Promise<void | ReturnType>;
  onLogout: () => Promise<void | ReturnType>;
  onSignUp: (payload: RequestPayloads.Signup) => Promise<void | ReturnType>;
  onRefreshToken: () => Promise<void | ReturnType>;
  onForgotPassword: (email: string) => Promise<void | ReturnType>;
  onValidateResetPasswordLink: (token: string) => Promise<void | string | ReturnType>;
  onResetPassword: (userId: string, password: string, token: string) => Promise<void | ReturnType>;
}

export const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType
);

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  // TODO: avoid calling any builtin or custom hooks in context providers
  //      it's not the "react way of doing things" and may produce unpredictable behaviour
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authService, eventEmitter } = useContext(AppDependenciesContext);

  useEffect(() => {
    eventEmitter.on(APP_EVENTS.LOGOUT, () => {
      setIsAuthenticated(false);
    });
  }, []);

  function handleComponentError(err: ApiError) {
    if (err.errors && err.errors.length > 0) {
      return { errorFields: err.errors, message: err.message };
    }
    // TODO: component specific error messages should be shown inside components
    //      instead of a disappearing toast message
    setErrorMessage(err.message);
  }

  /**
   * @description function login with password and email
   *
   * @param {Object} userInfo is password and email
   */
  async function handleLogin(email: string, password: string): Promise<void | ReturnType> {
    try {
      setIsLoading(true);

      const { data: tokens } = await authService.login(email, password);
      LocalStoreHelper.setPrimitive(STORAGE_KEY.ACCESS_TOKEN, tokens.accessToken);
      LocalStoreHelper.setPrimitive(STORAGE_KEY.REFRESH_TOKEN, tokens.refreshToken);
      setIsAuthenticated(true);

      const { data: currentUser } = await authService.getCurrentUser();
      setUser(currentUser);
      LocalStoreHelper.setComplex(STORAGE_KEY.USER, currentUser);

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      return handleComponentError(error);
    }
  }

  /**
   * @description function logout with email
   *
   * @param {Object} userInfo is email
   */
  async function handleLogout(): Promise<void | ReturnType> {
    eventEmitter.emit(APP_EVENTS.LOGOUT);
  }

  /**
   * @description function Sign Up with email, password, first name and lastName
   *
   * @param {Object} userInfo
   * {
   *  "email": String
   *  "password": String
   *  "firstName": String
   *  "lastName": String
   * }
   */
  async function handleSignUp(payload: RequestPayloads.Signup): Promise<void | ReturnType> {
    try {
      setIsLoading(true);

      const { data: tokens } = await authService.signup(payload);
      LocalStoreHelper.setPrimitive(STORAGE_KEY.ACCESS_TOKEN, tokens.accessToken);
      LocalStoreHelper.setPrimitive(STORAGE_KEY.REFRESH_TOKEN, tokens.refreshToken);
      setIsAuthenticated(true);

      const { data: currentUser } = await authService.getCurrentUser();
      setUser(currentUser);
      LocalStoreHelper.setComplex(STORAGE_KEY.USER, currentUser);

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      return handleComponentError(error);
    }
  }

  async function handleForgotPassword(email: string): Promise<void | ReturnType> {
    try {
      setIsLoading(true);
      await authService.forgotPassword(email);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      return handleComponentError(error);
    }
  }

  async function handleResetPassword(
    userId: string,
    password: string,
    token: string
  ): Promise<void | ReturnType> {
    try {
      setIsLoading(true);
      await authService.resetPassword(userId, password, token);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      return handleComponentError(error);
    }
  }

  async function handleValidateResetPasswordLink(
    token: string
  ): Promise<void | string | ReturnType> {
    try {
      setIsLoading(true);
      const { data } = await authService.validateResetPasswordLink(token);
      setIsLoading(false);
      return data.userId;
    } catch (error: any) {
      setIsLoading(false);
      return handleComponentError(error);
    }
  }

  /**
   * @description function refresh token
   *
   * @param {Object} token
   */
  async function handleRefreshToken(): Promise<void | ReturnType> {
    try {
      setIsLoading(true);

      const { data } = await authService.refreshAccessToken();
      LocalStoreHelper.setPrimitive(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      setIsAuthenticated(true);

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      return handleComponentError(error);
    }
  }

  function initialize() {
    const token = LocalStoreHelper.getPrimitive(STORAGE_KEY.ACCESS_TOKEN);
    const userInformation = LocalStoreHelper.getComplex<User>(STORAGE_KEY.USER)!;
    setIsInitialized(true);

    if (token) {
      setIsAuthenticated(true);
      setUser(userInformation);
    }
  }

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      notifications.show({
        title: 'Something went wrong!',
        message: errorMessage,
        autoClose: 2000,
        withCloseButton: false,
        icon: <IconX />,
        color: 'warning.0',
        styles: (theme: MantineTheme) => ({
          root: {
            backgroundColor: ColorHelper.getColorScheme(
              theme.colorScheme,
              theme.colors.dark[0],
              theme.colors.light[6]
            ),
          },
          description: {
            color: ColorHelper.getColorScheme(
              theme.colorScheme,
              theme.colors.light[1],
              theme.colors.dark[2]
            ),
          },
        }),
      });
    }
  }, [errorMessage]);

  const value = useMemo<AuthenticationContextType>(
    () => ({
      user,
      errorMessage,
      isLoading,
      isAuthenticated,
      isInitialized,
      onLogin: useCallback(handleLogin, []),
      onLogout: useCallback(handleLogout, [user]),
      onSignUp: useCallback(handleSignUp, []),
      onRefreshToken: useCallback(handleRefreshToken, []),
      onForgotPassword: useCallback(handleForgotPassword, []),
      onValidateResetPasswordLink: useCallback(handleValidateResetPasswordLink, []),
      onResetPassword: useCallback(handleResetPassword, []),
    }),
    [
      user,
      errorMessage,
      handleLogin,
      handleLogout,
      isInitialized,
      handleSignUp,
      handleRefreshToken,
      setIsAuthenticated,
      isAuthenticated,
    ]
  );

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};
