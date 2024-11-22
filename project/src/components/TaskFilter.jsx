import { SegmentedControl } from '@mantine/core';

function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <SegmentedControl
      value={currentFilter}
      onChange={onFilterChange}
      data={[
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' }
      ]}
    />
  );
}

export default TaskFilter;