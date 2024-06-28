/**
 * @module config
 * @description This module exports a configuration object for the application.
 */

/**
 * @description
 * This module exports the following:
 * 
 * config - An object that contains configuration for the application. It contains the following properties:
 * 
 * firestore - An object that contains configuration for Firestore. It contains the following properties:
 * 
 * collection - A string that specifies the name of the Firestore collection to use for Todo operations.
 */
export const config = {
  firestore: {
    collection: "todos",
  },
};