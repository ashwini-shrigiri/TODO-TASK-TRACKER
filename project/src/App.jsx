import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import TaskManager from './components/TaskManager';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <TaskManager />
    </MantineProvider>
  );
}

export default App;