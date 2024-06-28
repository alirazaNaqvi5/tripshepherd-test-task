import request from 'supertest';
import { app } from '../../src/index'; // Make sure your index.ts exports app for testing
import { db } from '../../src/utils/firestore';


// if (process.env.NODE_ENV === 'test' || true) {
  db.settings({
    host: 'localhost:8080',
    ssl: false,
  });
// }


describe('Todo Controller', () => {
  beforeEach(async () => {
    const todos = await db.collection('todos').get();
    const batch = db.batch();
    todos.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }, 10000);

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({
        title: 'Test Todo',
        description: 'This is a test todo item',
        completed: false,
      });
    expect(response.status).toBe(201);
    expect(response.body._path).toHaveProperty('segments');
  });

  it('should fetch all todos', async () => {
    await db.collection('todos').add({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    });
    const response = await request(app).get('/todos');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a todo', async () => {
    const docRef = await db.collection('todos').add({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    });
    const response = await request(app)
      .put(`/todos/${docRef.id}`)
      .send({
        title: 'Updated Todo',
        description: 'This is an updated test todo item',
        completed: true,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_writeTime');
  });

  it('should delete a todo', async () => {
    const docRef = await db.collection('todos').add({
      title: 'Test Todo',
      description: 'This is a test todo item',
      completed: false,
    });
    const response = await request(app).delete(`/todos/${docRef.id}`);
    expect(response.status).toBe(204);
  });
});
