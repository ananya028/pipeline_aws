/**
 * @description function set items to localStorage
 *
 * @param {String} key is name of key in localStorage
 * @param {Array} value
 */
export function setComplex<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function setPrimitive(key: string, value: string): void {
  localStorage.setItem(key, value);
}

/**
 * @description function get items from localStorage
 *
 * @param {String} key is name of key in localStorage
 *
 * @returns {Array}
 */
export function getComplex<T>(key: string): T | null {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export function getPrimitive(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * @description function remove key in localStorage
 *
 * @param {String} key is name of key in localStorage
 */
export function removeItems(key: string): void {
  localStorage.removeItem(key);
}

export function clear(): void {
  localStorage.clear();
}
