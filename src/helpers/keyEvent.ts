import { KeyboardEvent } from 'react';

/**
 * @description function redirect with key event space and enter
 *
 * @param {event} event is keyboard event
 * @param {string} url is url want to redirect
 */
export const keyEventEnterSpace = (event: KeyboardEvent<HTMLElement>, url: string) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    window.location.href = url;
  }
};

/**
 * @description function redirect with key event space and enter
 *
 * @param {function} handler is a function want to apply
 * when press enter and space
 * @param {string} url is url want to redirect
 */
export const keyEventEnterSpaceWithFunction = (
  event: KeyboardEvent<HTMLElement>,
  handler: () => void
) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    handler();
  }
};

/**
 * @description function redirect in new tab with key event space and enter
 *
 * @param {event} event is keyboard event
 * @param {string} url is url want to redirect
 */
export const keyEventEnterSpaceWithNewTab = (event: KeyboardEvent<HTMLElement>, url: string) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    window.open(url, '_blank');
  }
};

/**
 * @description function avoid character in input number
 *
 * @param {event} event is keyboard event
 */
export const avoidCharacterInputNumber = (event: KeyboardEvent<HTMLInputElement>) => {
  if (['e', 'E', '+', '-', '.'].indexOf(event.key) !== -1) {
    event.preventDefault();
  }
};
