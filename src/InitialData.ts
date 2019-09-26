export interface ITask {
  id: string;
  content: string
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[]
}

export const InitialData = {
  tasks: {
    '1': { id: '1', content: 'Take out the garbage'},
    '2': { id: '2', content: 'Watch my favorite show'},
    '3': { id: '3', content: 'Change my phone'},
    '4': { id: '4', content: 'Cook dinner'}
  },
  columns: {
    '1': {
      id: '1',
      title: 'To-do',
      taskIds: ['1', '2', '3', '4']
    },
    '2': {
      id: '2',
      title: 'In progress',
      taskIds: []
    },
    '3': {
      id: '3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['1', '2', '3']
}