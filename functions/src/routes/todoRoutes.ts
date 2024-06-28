/**
 * @module todoRoutes
 * @description This module exports a router that handles HTTP requests for Todo operations.
 */

import { Router } from 'express';
import { addTodo, fetchTodo, fetchTodos, modifyTodo, removeTodo } from '../controllers/todoController';

const router = Router();


/**
 * @description
 * This router handles the following routes:
 * 
 * POST / - Calls the `addTodo` function to handle a request to create a new Todo.
 * GET / - Calls the `fetchTodos` function to handle a request to fetch all Todos.
 * GET /:id - Calls the `fetchTodo` function to handle a request to fetch a specific Todo. The ID of the Todo is obtained from the request parameters.
 * PUT /:id - Calls the `modifyTodo` function to handle a request to modify a specific Todo. The ID of the Todo is obtained from the request parameters.
 * DELETE /:id - Calls the `removeTodo` function to handle a request to remove a specific Todo. The ID of the Todo is obtained from the request parameters.
 */
router.post('/', addTodo);
router.get('/', fetchTodos);
router.get('/:id', fetchTodo);
router.put('/:id', modifyTodo);
router.delete('/:id', removeTodo);

export default router;
