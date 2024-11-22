import { Paper, Text, Group, ActionIcon, Modal, Badge } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import TaskForm from './TaskForm';

function TaskList({ tasks, onDelete, onUpdate }) {
  const [editingTask, setEditingTask] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'in-progress': return 'blue';
      case 'completed': return 'green';
      default: return 'gray';
    }
  };

  return (
    <>
      {tasks.map(task => (
        <Paper key={task.id} shadow="xs" p="md" mb="sm">
          <Group justify="space-between">
            <div style={{ flex: 1 }}>
              <Text size="lg" fw={500}>{task.title}</Text>
              <Text c="dimmed" size="sm">{task.description}</Text>
              <Group mt="xs">
                <Badge color={getStatusColor(task.status)}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
                {task.dueDate && (
                  <Text size="sm" c="dimmed">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Text>
                )}
              </Group>
            </div>
            <Group>
              <ActionIcon 
                variant="subtle" 
                color="blue"
                onClick={() => setEditingTask(task)}
              >
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon 
                variant="subtle" 
                color="red"
                onClick={() => onDelete(task.id)}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>
      ))}

      <Modal
        opened={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <TaskForm
            initialData={editingTask}
            onSubmit={(updatedTask) => {
              onUpdate({ ...updatedTask, id: editingTask.id });
              setEditingTask(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}

export default TaskList;