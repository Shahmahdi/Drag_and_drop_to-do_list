import React, { useState } from 'react'
import { InitialData, IColumn, ITask } from '../InitialData'
import { Column } from './Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const TaskPage = () => {

  const [state, setState] = useState(InitialData)

  function dragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.source.droppableId === result.destination.droppableId 
      && result.source.index === result.destination.index) {
        return;
    }
    const column = (state.columns as any)[result.source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(result.source.index, 1);
    newTaskIds.splice(result.destination.index, 0, result.draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }
    setState({
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    })
  }

  return (
    <div className="pa2">
      <DragDropContext
        onDragEnd={(result) => dragEnd(result)}
      >
      {state.columnOrder.map(columnId => {
        const column: IColumn = (state.columns as any)[columnId];
        const tasks: ITask[] = column.taskIds.map((taskId: string) => 
          (state.tasks as any)[taskId]);
        
        return (
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
          />
        )
      })}
      </DragDropContext>
    </div>
  )
}
