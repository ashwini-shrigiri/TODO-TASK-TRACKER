import { useState, useEffect } from 'react';
import { Container, Title, Group } from '@mantine/core';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="lg">Task Tracker</Title>
      <TaskForm onSubmit={addTask} />
      <Group justify="flex-end" mt="md">
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      </Group>
      <TaskList 
        tasks={filteredTasks}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
    </Container>
  );
}

export default TaskManager;