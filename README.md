
# Todo List Application

This is a simple Todo List application for test task given by Tripshepherd company, built with Firebase Cloud Functions and Firestore using TypeScript. The API supports creating, reading, updating, and deleting todo items.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Firebase Configuration](#firebase-configuration)
- [Running the Emulator](#running-the-emulator)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features

- Create Todo Item
- Read Todo Items
- Update Todo Item
- Delete Todo Item

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- Firebase CLI
- A Firebase project

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app/functions
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Firebase CLI:**

   ```bash
   npm install -g firebase-tools
   ```

4. **Login to Firebase:**

   ```bash
   firebase login
   ```

5. **Initialize Firebase project:**

   ```bash
   firebase init
   ```

   Select the following options during initialization:
   - Firestore: Configure Firestore in your project.
   - Functions: Configure Functions (for your backend logic).
   - Use an existing project or create a new one in the Firebase Console.

## Project Structure

```
functions/
├── src/
│   ├── controllers/
│   │   ├── todoController.ts
│   ├── models/
│   │   ├── todoModel.ts
│   ├── routes/
│   │   ├── todoRoutes.ts
│   ├── utils/
│   │   ├── firestore.ts
│   ├── index.ts
│   ├── config.ts
│   ├── types.ts
├── tests/
│   ├── controllers/
│   │   ├── todoController.test.ts
│   ├── models/
│   │   ├── todoModel.test.ts
│   ├── routes/
│   │   ├── todoRoutes.test.ts
│   ├── utils/
│   │   ├── firestore.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
```

## Firebase Configuration

1. **Configure Firestore Rules:**

   Ensure your Firestore rules allow read and write access during development. In production, you'll want more restrictive rules, but for testing, you can use:

   ```plaintext
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   Deploy these rules to your Firestore emulator:

   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Ensure Firestore is Properly Initialized:**

   `firestore.ts`

   ```typescript
   import * as admin from 'firebase-admin';

   admin.initializeApp();

   export const db = admin.firestore();
   export const FieldValue = admin.firestore.FieldValue;
   ```

## Running the Emulator

1. **Start Firebase Emulators:**

   ```bash
   firebase emulators:start
   ```

   This will start the emulators for Firestore and Functions.

2. **Access Emulator UI:**

   Visit [http://localhost:4000](http://localhost:4000) to access the Emulator UI.

## API Endpoints

- **Create Todo Item**

  - **Method**: POST
  - **Endpoint**: `/api/todos`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "description": "string",
      "completed": false
    }
    ```
  - **Response**: `201 Created` with the created todo item.

- **Get Todo Items**

  - **Method**: GET
  - **Endpoint**: `/api/todos`
  - **Response**: `200 OK` with a list of all todo items.

- **Update Todo Item**

  - **Method**: PUT
  - **Endpoint**: `/api/todos/:id`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "description": "string",
      "completed": false
    }
    ```
  - **Response**: `200 OK` with the updated todo item.

- **Delete Todo Item**

  - **Method**: DELETE
  - **Endpoint**: `/api/todos/:id`
  - **Response**: `204 No Content`

## Testing

1. **Run Tests:**

   Ensure you have the following script in your `package.json`:

   ```json
   "scripts": {
     "test": "jest"
   }
   ```

   Also make sure you have set google cloud project id through this command:

   ```bash
   export GCLOUD_PROJECT=your-project-id
   ```
   replace `your-project-id` with your project id.

   Run the tests using:

   ```bash
   npm run test
   ```

