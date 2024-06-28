/**
 * @module index
 * @description This module exports an Express application wrapped in a Firebase HTTP Cloud Function.
 */

import * as functions from 'firebase-functions';
import express from 'express';
import todoRoutes from './routes/todoRoutes';

const app = express();

/**
 * @description
 * This module initializes an Express application and sets it up to use JSON middleware and the Todo routes.
 * It then exports the Express application wrapped in a Firebase HTTP Cloud Function.
 * 
 * The Express application is set up as follows:
 * 
 * It uses the `express.json()` middleware to parse incoming requests with JSON payloads.
 * It uses the `todoRoutes` router to handle routes that start with `/api/todos`.
 * 
 * The Firebase HTTP Cloud Function is triggered by HTTP requests. When it is triggered, it passes the request to the Express application for handling.
 */
app.use(express.json());
app.use('/todos', todoRoutes);

exports.api = functions.https.onRequest(app);


// Export app for testing
export { app };