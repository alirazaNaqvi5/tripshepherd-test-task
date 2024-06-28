import { db } from '../utils/firestore';
import { Todo } from '../types';
import { config } from '../config';
import * as functions from 'firebase-functions'


/**
 * This line of code is initializing a Firestore collection.
 * 
 * @constant
 * @type {FirebaseFirestore.CollectionReference}
 * 
 * @description
 * The `collection` constant holds a reference to a Firestore collection. 
 * It uses the `collection` method from a Firestore `db` instance and 
 * takes a string parameter which is the name of the collection.
 * 
 * The name of the collection is fetched from the `config.firestore.collection` 
 * which is a configuration object for Firestore.
 * 
 * This reference can be used to perform CRUD operations on the specified Firestore collection.
 */
const collection = db.collection(config.firestore.collection);




/**
 * Asynchronously creates a new Todo document in Firestore.
 * 
 * @function
 * @async
 * @param {Todo} data - The data for the new Todo.
 * @returns {Promise<FirebaseFirestore.DocumentReference>} A promise that resolves with a reference to the newly created document.
 * @throws {functions.https.HttpsError} If a required field is missing from `data` or if the document creation fails.
 * 
 * @description
 * This function takes a `Todo` object as a parameter and creates a new document in Firestore with this data.
 * 
 * It first checks if all required fields ('title', 'description', 'completed') are present in `data`. If a required field is missing, it throws an error with the code 'invalid-argument'.
 * 
 * If all required fields are present, it attempts to create a new document in the Firestore collection. If the document creation fails, it throws an error with the code 'internal'.
 * 
 * If the document is successfully created, it returns a promise that resolves with a reference to the newly created document.
 */
export const createTodo = async (data: Todo): Promise<FirebaseFirestore.DocumentReference> => {
  // Define required fields
  const requiredFields = ['title', 'description', 'completed'];

  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!data.hasOwnProperty(field)) {
      throw new functions.https.HttpsError('invalid-argument', `Missing required field: ${field}`);
    }
  }

  // If all required fields are present, create the Todo
   const doc = await collection.add(data);
  if (!doc) {
    throw new functions.https.HttpsError('internal', 'Failed to create Todo');
  }
  return doc;
};




/**
 * Asynchronously fetches all Todo documents from Firestore.
 * 
 * @function
 * @async
 * @returns {Promise<FirebaseFirestore.QuerySnapshot>} A promise that resolves with a QuerySnapshot of all Todo documents.
 * 
 * @description
 * This function fetches all documents from the Firestore collection.
 * 
 * It uses the `get` method on the Firestore collection reference, which retrieves a QuerySnapshot that contains all documents in the collection.
 * 
 * The function returns a promise that resolves with this QuerySnapshot.
 */

export const getTodos = async (): Promise<FirebaseFirestore.QuerySnapshot> => {
  return collection.get();
};





/**
 * Asynchronously fetches a specific Todo document from Firestore.
 * 
 * @function
 * @async
 * @param {string} id - The ID of the Todo document to fetch.
 * @returns {Promise<FirebaseFirestore.DocumentSnapshot>} A promise that resolves with a DocumentSnapshot of the requested Todo document.
 * @throws {functions.https.HttpsError} If the requested document does not exist.
 * 
 * @description
 * This function takes an ID as a parameter and fetches the corresponding document from the Firestore collection.
 * 
 * It uses the `doc` method on the Firestore collection reference to get a reference to the document with the specified ID, and then the `get` method to retrieve the document.
 * 
 * If the document does not exist, it throws an error with the code 'not-found'.
 * 
 * If the document exists, it returns a promise that resolves with a DocumentSnapshot of the document.
 */
export const getTodo = async (id: string): Promise<FirebaseFirestore.DocumentSnapshot> => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError('not-found', 'Todo not found');
  }
  return doc;
};




/**
 * Asynchronously updates a specific Todo document in Firestore.
 * 
 * @function
 * @async
 * @param {string} id - The ID of the Todo document to update.
 * @param {Partial<Todo>} data - The data to update the Todo document with.
 * @returns {Promise<FirebaseFirestore.WriteResult>} A promise that resolves with a WriteResult representing the result of the update operation.
 * @throws {functions.https.HttpsError} If the document to update does not exist.
 * 
 * @description
 * This function takes an ID and a `Partial<Todo>` object as parameters and updates the corresponding document in the Firestore collection with this data.
 * 
 * It first checks if the document exists. If the document does not exist, it throws an error with the code 'not-found'.
 * 
 * If the document exists, it updates the document with the provided data and returns a promise that resolves with a WriteResult representing the result of the update operation.
 */
export const updateTodo = async (id: string, data: Partial<Todo>): Promise<FirebaseFirestore.WriteResult> => {
  const doc = collection.doc(id);
  const docSnapshot = await doc.get();
  if (!docSnapshot.exists) {
    throw new functions.https.HttpsError('not-found', 'Todo not found');
  }
  return doc.update({
    ...data
  });
};





/**
 * Asynchronously deletes a specific Todo document from Firestore.
 * 
 * @function
 * @async
 * @param {string} id - The ID of the Todo document to delete.
 * @returns {Promise<FirebaseFirestore.WriteResult>} A promise that resolves with a WriteResult representing the result of the delete operation.
 * @throws {functions.https.HttpsError} If the document to delete does not exist.
 * 
 * @description
 * This function takes an ID as a parameter and deletes the corresponding document from the Firestore collection.
 * 
 * It first checks if the document exists. If the document does not exist, it throws an error with the code 'not-found'.
 * 
 * If the document exists, it deletes the document and returns a promise that resolves with a WriteResult representing the result of the delete operation.
 */
export const deleteTodo = async (id: string): Promise<FirebaseFirestore.WriteResult> => {
  const doc = collection.doc(id);
  const docSnapshot = await doc.get();
  if (!docSnapshot.exists) {
    throw new functions.https.HttpsError('not-found', 'Todo not found');
  }
  return doc.delete();
};
