import { resolvers } from '../src/resolvers';
import { v4 as uuidv4 } from 'uuid';

describe('Resolvers', () => {
  it('should fetch all tasks initially as an empty list', () => {
    const result = resolvers.Query.tasks(null, {});
    expect(result).toEqual([]);
  });

  

  it('should mark all tasks as completed', () => {
    const input = {
      id: uuidv4(),
      title: 'Incomplete Task',
      description: 'Another Task',
      completed: false,
      dueDate: '2024-12-20',
    };

    resolvers.Mutation.createTask(null, { input });

    const result = resolvers.Mutation.markAllTasksAsCompleted();
    result.forEach(task => {
      expect(task.completed).toBe(true);
    });
  });

  it('should fetch tasks with filtering by completion status', () => {
    const result = resolvers.Query.tasks(null, { completed: true });
    result.forEach(task => {
      expect(task.completed).toBe(true);
    });
  });
});
