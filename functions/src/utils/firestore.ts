/**
 * @module firestore
 * @description This module exports the Firestore database instance and the FieldValue utility.
 */

import * as admin from 'firebase-admin';

// Initialize the Firebase admin SDK
admin.initializeApp();

/**
 * @description
 * This module exports the following:
 * 
 * db - The Firestore database instance. This can be used to perform operations on the Firestore database.
 * FieldValue - The Firestore FieldValue utility. This can be used to perform operations on Firestore document fields, such as deleting a field or setting a field to the server timestamp.
 */
export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;