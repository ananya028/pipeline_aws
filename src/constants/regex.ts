export const REGEX = {
  EMPTY_SPACES: /^\S*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_WITH_UPPERCASE_NUMBER: /^(?=.*[A-Z])(?=.*\d).+$/,
  PASSWORD_WITH_SPECIAL_CHARACTER: /^[a-zA-Z0-9!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?`~\s]+$/,
};
