import { useState } from 'react';
import { TextInput, Textarea, Select, Button, Paper, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';

function TaskForm({ onSubmit, initialData }) {
  const [task, setTask] = useState(initialData || {
    title: '',
    description: '',
    dueDate: null,
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    if (!initialData) {
      setTask({
        title: '',
        description: '',
        dueDate: null,
        status: 'pending'
      });
    }
  };

  return (
    <Paper shadow="xs" p="md">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          required
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          mb="sm"
        />
        <Textarea
          label="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          mb="sm"
        />
        <Group grow mb="sm">
          <DateInput
            label="Due Date"
            value={task.dueDate}
            onChange={(date) => setTask({ ...task, dueDate: date })}
          />
          <Select
            label="Status"
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' }
            ]}
            value={task.status}
            onChange={(value) => setTask({ ...task, status: value })}
          />
        </Group>
        <Button type="submit" fullWidth>
          {initialData ? 'Update Task' : 'Add Task'}
        </Button>
      </form>
    </Paper>
  );
}

export default TaskForm;