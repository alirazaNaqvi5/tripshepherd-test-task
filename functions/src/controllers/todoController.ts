/**
 * @module todoController
 * @description This module exports functions that handle HTTP requests for Todo operations.
 */
import { Request, Response } from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo, getTodo } from '../models/todoModel';
import { logger } from '../utils/logger';
import * as functions from 'firebase-functions'




/**
 * Handles a request to create a new Todo.
 * 
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * 
 * @description
 * This function handles a request to create a new Todo. It uses the `createTodo` function from the `todoModel` module to create the Todo.
 * If the Todo is successfully created, it sends a 201 status code and the new Todo in the response.
 * If an error occurs, it checks if the error is an instance of `functions.https.HttpsError`. If it is, it sends the error's status code and message in the response.
 * If the error is not an instance of `functions.https.HttpsError`, it logs the error and sends a 500 status code and a generic server error message in the response.
 */
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body)
    const todo = await createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    if (error instanceof functions.https.HttpsError) {
      res.status(error.httpErrorCode.status).send(error.message);
    } else {
      logger.error((error as Error).message);
      res.status(500).send('Internal Server Error');
    }
  }
};




/**
 * Handles a request to fetch a specific Todo.
 * 
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * 
 * @description
 * This function handles a request to fetch a specific Todo. It uses the `getTodo` function from the `todoModel` module to fetch the Todo.
 * The ID of the Todo to fetch is obtained from the request parameters.
 * If the Todo is successfully fetched, it sends a 200 status code and the Todo in the response.
 * If an error occurs, it checks if the error is an instance of `functions.https.HttpsError`. If it is, it sends the error's status code and message in the response.
 * If the error is not an instance of `functions.https.HttpsError`, it logs the error and sends a 500 status code and a generic server error message in the response.
 */
export const fetchTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await getTodo(id);
    res.status(200).json(todo.data());
  } catch (error) {
    if (error instanceof functions.https.HttpsError) {
      res.status(error.httpErrorCode.status).send(error.message);
    } else {
      logger.error((error as Error).message);
      res.status(500).send('Internal Server Error');
    }
  }
}



/**
 * Handles a request to fetch all Todos.
 * 
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * 
 * @description
 * This function handles a request to fetch all Todos. It uses the `getTodos` function from the `todoModel` module to fetch the Todos.
 * If the Todos are successfully fetched, it sends a 200 status code and the Todos in the response.
 * If an error occurs, it checks if the error is an instance of `functions.https.HttpsError`. If it is, it sends the error's status code and message in the response.
 * If the error is not an instance of `functions.https.HttpsError`, it logs the error and sends a 500 status code and a generic server error message in the response.
 */
export const fetchTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await getTodos();
    const todos = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(todos);
  } catch (error) {
    if (error instanceof functions.https.HttpsError) {
      res.status(error.httpErrorCode.status).send(error.message);
    } else {
      logger.error((error as Error).message);
      res.status(500).send('Internal Server Error');
    }
  }
};


/**
 * Handles a request to modify a specific Todo.
 * 
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * 
 * @description
 * This function handles a request to modify a specific Todo. It uses the `updateTodo` function from the `todoModel` module to modify the Todo.
 * The ID of the Todo to modify is obtained from the request parameters, and the data to update the Todo with is obtained from the request body.
 * If the Todo is successfully modified, it sends a 200 status code and the modified Todo in the response.
 * If an error occurs, it checks if the error is an instance of `functions.https.HttpsError`. If it is, it sends the error's status code and message in the response.
 * If the error is not an instance of `functions.https.HttpsError`, it logs the error and sends a 500 status code and a generic server error message in the response.
 */
export const modifyTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await updateTodo(id, req.body);
    res.status(200).json(todo);
  } catch (error) {
    if (error instanceof functions.https.HttpsError) {
      res.status(error.httpErrorCode.status).send(error.message);
    } else {
      logger.error((error as Error).message);
      res.status(500).send('Internal Server Error');
    }
  }
};




/**
 * Handles a request to remove a specific Todo.
 * 
 * @async
 * @function
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * 
 * @description
 * This function handles a request to remove a specific Todo. It uses the `deleteTodo` function from the `todoModel` module to delete the Todo.
 * The ID of the Todo to delete is obtained from the request parameters.
 * If the Todo is successfully deleted, it sends a 204 status code in the response.
 * If an error occurs, it checks if the error is an instance of `functions.https.HttpsError`. If it is, it sends the error's status code and message in the response.
 * If the error is not an instance of `functions.https.HttpsError`, it logs the error and sends a 500 status code and a generic server error message in the response.
 */
export const removeTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteTodo(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof functions.https.HttpsError) {
      res.status(error.httpErrorCode.status).send(error.message);
    } else {
      logger.error((error as Error).message);
      res.status(500).send('Internal Server Error');
    }
  }
};
