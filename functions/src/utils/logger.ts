/**
 * @module logger
 * @description This module exports a logger object that provides methods for logging messages and errors.
 */

/**
 * @description
 * This module exports the following:
 * 
 * logger - An object that provides the following methods:
 * 
 * log - A method that takes a message as a parameter and logs it to the console.
 * error - A method that takes a message as a parameter and logs it as an error to the console.
 */
export const logger = {
  log: (message: string) => console.log(message),
  error: (message: string) => console.error(message),
};