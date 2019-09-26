import React from 'react'
import { ITask } from '../InitialData'
import { Draggable } from 'react-beautiful-dnd'

export const Task = (props: {
  key: string;
  task: ITask;
  index: number;
}) => {
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided) => {
        const allowedProps = { ref: provided.innerRef }
        return (
          <div
            className="ba b--black-20 br2 pa2 mb2 bg-white"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...allowedProps}
          >
            {props.task.content}
          </div>
        )
      }}
    </Draggable>
  )
}
