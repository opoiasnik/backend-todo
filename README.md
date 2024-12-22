# Mini To-Do Backend Project

This project is a simple GraphQL backend for managing a to-do list. It is built using TypeScript, Apollo Server, and Jest for testing.

## Features

- **GraphQL API**
  - Create, update, delete, and fetch tasks.
  - Filter tasks by status and due date.
  - Mark all tasks as completed.
  - Pagination support for task queries.
- **In-memory Storage**
  - Tasks are stored in memory for simplicity.
- **Testing**
  - Unit tests using Jest.

## Requirements

- Node.js (>=16.x)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/opoiasnik/backend-todo.git
   cd backend-todo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

1. Start the development server:
   ```bash
   npm start
   ```

2. The server will start at `http://localhost:4000`. You can access the GraphQL Playground at this URL.

## Testing

1. Run the test suite:
   ```bash
   npm test
   ```

## Usage

### Example GraphQL Queries and Mutations

#### Fetch All Tasks
```graphql
query {
  tasks {
    id
    title
    description
    completed
    dueDate
  }
}
```

#### Create a Task
```graphql
mutation {
  createTask(input: {
    title: "Learn GraphQL",
    description: "Understand how to build APIs with Apollo Server",
    dueDate: "2024-12-31"
  }) {
    id
    title
    completed
  }
}
```

#### Mark All Tasks as Completed
```graphql
mutation {
  markAllTasksAsCompleted {
    id
    title
    completed
  }
}
```

## Project Structure

- `src/` - Contains the application source code:
  - `schema.ts` - GraphQL schema definitions.
  - `resolvers.ts` - Resolvers for handling GraphQL operations.
  - `server.ts` - Entry point for starting the server.
- `tests/` - Contains Jest test cases for resolvers.


