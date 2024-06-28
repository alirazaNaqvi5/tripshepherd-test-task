import { createTodo, getTodos, updateTodo, deleteTodo } from '../../src/models/todoModel';
import { db } from '../../src/utils/firestore';

// Point Firestore to the local emulator
// if (process.env.NODE_ENV === 'test' || true) {
    db.settings({
      host: 'localhost:8080',
      ssl: false,
    });
//   }

describe('Todo Model', () => {
  beforeEach(async () => {
    const todos = await db.collection('todos').get();
    const batch = db.batch();
    todos.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }, 10000);

  it('should create a new todo', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    };
    const docRef = await createTodo(todoData);
    const doc = await docRef.get();
    expect(doc.exists).toBe(true);
    expect(doc.data()).toMatchObject(todoData);
  });

  it('should fetch all todos', async () => {
    await db.collection('todos').add({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    });
    const snapshot = await getTodos();
    expect(snapshot.empty).toBe(false);
  });

  it('should update a todo', async () => {
    const docRef = await db.collection('todos').add({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    });
    await updateTodo(docRef.id, {
      title: 'Updated Todo',
      description: 'This is an updated test todo item',
      completed: true,
    });
    const updatedDoc = await docRef.get();
    expect(updatedDoc.data()).toMatchObject({
      title: 'Updated Todo',
      description: 'This is an updated test todo item',
      completed: true,
    });
  });

  it('should delete a todo', async () => {
    const docRef = await db.collection('todos').add({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    });
    await deleteTodo(docRef.id);
    const deletedDoc = await docRef.get();
    expect(deletedDoc.exists).toBe(false);
  });
});
