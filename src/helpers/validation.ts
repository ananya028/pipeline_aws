import { MESSAGES_ERROR, REGEX } from '@constants';

/**
 * @description function check the value is empty or not
 *
 * @param {string} value is value of input
 *
 * @returns {boolean}
 */
export const isEmpty = (value: string): boolean => !value;

/**
 * @description function check the value match with regex or not
 *
 * @param {string} value The value to be checked.
 * @param {RegExp} regex The regular expression to be matched the value.
 *
 * @returns {boolean}
 */
export const isMatchRegex = (regex: RegExp, value: string): boolean => regex.test(value);

/**
 * @description function check validation email
 *
 * @param {string} value is the value of field email need to validate
 *
 * @returns {string | null} error message or null
 */
export const validateEmail = (value: string): string | null => {
  switch (true) {
    // case check empty
    case isEmpty(value):
      return MESSAGES_ERROR.EMPTY;
    // case value match regex or not
    case !isMatchRegex(REGEX.EMAIL, value):
      return MESSAGES_ERROR.INVALID_EMAIL;
    default:
      return null;
  }
};

/**
 * @description function check validation password
 *
 * @param {string} value is the value of field password need to validate
 *
 * @returns {string | null} error message or null
 */
export const validatePassword = (value: string, isNewPassword?: boolean): string | null => {
  switch (true) {
    case value.length < 8:
    case isEmpty(value):
    case !isMatchRegex(REGEX.PASSWORD_WITH_UPPERCASE_NUMBER, value):
    case !isMatchRegex(REGEX.PASSWORD_WITH_SPECIAL_CHARACTER, value):
    case !isMatchRegex(REGEX.EMPTY_SPACES, value):
      return `${isNewPassword ? 'New' : ''} ${MESSAGES_ERROR.PASSWORD_CONTAIN}`;
    default:
      return null;
  }
};

/**
 * @description function check validate confirm password
 *
 * @param {string} value is the value of field password need to validate
 * @param {string} password is current password
 *
 * @returns {string | null} error message or null
 */
export const validateConfirmPassword = (value: string, password: string): string | null => {
  switch (true) {
    // case check empty
    case isEmpty(value):
      return MESSAGES_ERROR.EMPTY;
    // case confirm password match or not
    case value !== password:
      return MESSAGES_ERROR.PASSWORDS_DO_NOT_MATCH;
    default:
      return null;
  }
};

/**
 * @description function check validation length text
 *
 * @param {string} value is the value of field input need to validate
 *
 * @returns {string | null} error message or null
 */
export const validateLength = (value: string, length: number) => {
  switch (true) {
    // case check empty
    case isEmpty(value):
      return MESSAGES_ERROR.EMPTY;
    // case check length less than number enter
    case value.length >= length:
      return `${MESSAGES_ERROR.LENGTH_LESS_THAN} ${length}`;
    default:
      return null;
  }
};

export function validateRequired(value: string) {
  switch (true) {
    case isEmpty(value):
      return MESSAGES_ERROR.EMPTY;
    default:
      return null;
  }
}
