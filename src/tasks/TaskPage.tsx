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
    const sourceColumn = (state.columns as any)[result.source.droppableId];
    const destinationColumn = (state.columns as any)[result.destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(result.source.index, 1);
      newTaskIds.splice(result.destination.index, 0, result.draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds
      }
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      });
    } else {
      const sourceColumnTaskIds = Array.from(sourceColumn.taskIds);
      sourceColumnTaskIds.splice(result.source.index, 1);
      const newSourceColumnTaskIds = {
        ...sourceColumn,
        taskIds: sourceColumnTaskIds
      }
      const destinationColumnTaskIds = Array.from(destinationColumn.taskIds);
      destinationColumnTaskIds.splice(result.destination.index, 0, result.draggableId);
      const newDestinationColumnTaskIds = {
        ...destinationColumn,
        taskIds: destinationColumnTaskIds
      }
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newSourceColumnTaskIds.id]: newSourceColumnTaskIds,
          [newDestinationColumnTaskIds.id]: newDestinationColumnTaskIds
        }
      })
    }
  }

  return (
    <div className="pa2">
      <DragDropContext
        onDragEnd={(result) => dragEnd(result)}
      >
        <div className="flex">
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
        </div>
      </DragDropContext>
    </div>
  )
}
