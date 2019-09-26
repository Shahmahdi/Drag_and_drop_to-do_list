import React from 'react'
import { IColumn, ITask } from '../InitialData'
import { Task } from './Task'
import { Droppable } from 'react-beautiful-dnd'

export const Column = (props: {
  key: string;
  column: IColumn;
  tasks: ITask[];
}) => {
  return (
    <div className="ma2 ba b--black-40 br2 w-third flex flex-column">
      <h3 className="pa2 ma0">{props.column.title}</h3>
      <Droppable
        droppableId={props.column.id}
      >
        {(provided, snapshot) => {

          const allowedProps = { ref: provided.innerRef }
          return (
            <div
              className={`pa2 flex-grow-1 ${snapshot.isDraggingOver ? 'bg-lightest-blue' : 'bg-white'}`}
              style={{ transition: 'background-color 0.2s ease', minHeight: '100px' }}
              {...provided.droppableProps}
              {...allowedProps}
            >
              {props.tasks.map((task, index) =>
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                />
              )}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}
