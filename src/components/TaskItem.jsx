import { Draggable } from "react-beautiful-dnd";
import React from "react";
import "../App.css"

const TaskItem = ({ item, index }) => {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="drag-item"
          >
            <div className="card-header">{item.title}</div>
            <div className="card-footer">
              <span>{item.description}</span>
              <div className={`author ${item.priority === 'low' ? 'low' : item.priority === 'medium' ? 'medium' : 'high'}`}>
                {item.priority}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskItem;
