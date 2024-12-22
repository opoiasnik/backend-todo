import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: string;
}

const tasks: Task[] = [];

export const resolvers = {
  Query: {
    tasks: (
      _: any,
      { completed, startDueDate, endDueDate, limit, offset }: { completed?: boolean; startDueDate?: string; endDueDate?: string; limit?: number; offset?: number }
    ) => {
      let result = tasks;

      // Filter by completion status
      if (completed !== undefined) {
        result = result.filter(task => task.completed === completed);
      }

      // Filter by due date range
      if (startDueDate || endDueDate) {
        result = result.filter(task => {
          const dueDate = new Date(task.dueDate).getTime();
          const start = startDueDate ? new Date(startDueDate).getTime() : -Infinity;
          const end = endDueDate ? new Date(endDueDate).getTime() : Infinity;
          return dueDate >= start && dueDate <= end;
        });
      }

      // Apply pagination
      if (offset !== undefined) {
        result = result.slice(offset);
      }

      if (limit !== undefined) {
        result = result.slice(0, limit);
      }

      return result;
    },
    task: (_: any, { id }: { id: string }) => {
      return tasks.find(task => task.id === id) || null;
    },
  },

  Mutation: {
    createTask: (_: any, { input }: { input: Task }) => {
      if (!input.title || input.title.length > 100) {
        throw new Error('Title is required and must not exceed 100 characters.');
      }

      if (input.description && input.description.length > 500) {
        throw new Error('Description must not exceed 500 characters.');
      }

      if (isNaN(new Date(input.dueDate).getTime())) {
        throw new Error('Invalid due date format.');
      }

      const newTask: Task = {
        id: uuidv4(),
        title: input.title,
        description: input.description,
        completed: input.completed ?? false,
        dueDate: input.dueDate,
      };

      tasks.push(newTask);
      return newTask;
    },
    updateTask: (_: any, { id, input }: { id: string; input: Task }) => {
      const taskIndex = tasks.findIndex(task => task.id === id);

      if (taskIndex === -1) {
        throw new Error('Task not found.');
      }

      const existingTask = tasks[taskIndex];
      const updatedTask = {
        ...existingTask,
        ...input,
        id: existingTask.id,
      };

      tasks[taskIndex] = updatedTask;
      return updatedTask;
    },
    deleteTask: (_: any, { id }: { id: string }) => {
      const taskIndex = tasks.findIndex(task => task.id === id);

      if (taskIndex === -1) {
        throw new Error('Task not found.');
      }

      tasks.splice(taskIndex, 1);
      return true;
    },
    markAllTasksAsCompleted: () => {
      // Iterate over all tasks and mark them as completed
      tasks.forEach(task => (task.completed = true));
      return tasks;
    },
  },
};