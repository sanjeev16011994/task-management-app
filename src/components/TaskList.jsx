import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import "../App.css";

const lists = ["added", "started", "completed"];

function TaskList({ tasks, setTasks }) {
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    let updatedTaskList = { ...tasks };

    updatedTaskList[source.droppableId] =
      updatedTaskList[source.droppableId] || [];
    updatedTaskList[destination.droppableId] =
      updatedTaskList[destination.droppableId] || [];

    if (destination.droppableId !== source.droppableId) {
      const sourceTaskList = [...updatedTaskList[source.droppableId]];
      const destTaskList = [...updatedTaskList[destination.droppableId]];
      const [draggableObject] = sourceTaskList.splice(source.index, 1);
      destTaskList.splice(destination.index, 0, draggableObject);
      updatedTaskList[source.droppableId] = sourceTaskList;
      updatedTaskList[destination.droppableId] = destTaskList;
    } else {
      const copiedItems = [...updatedTaskList[source.droppableId]];
      const [draggableObject] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, draggableObject);
      updatedTaskList[source.droppableId] = copiedItems;
    }

    setTasks(updatedTaskList);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
  };

  return (
    <div className="darg-drop-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list">
          {lists.map((listKey) => (
            <div className="droppable" key={listKey} >
              <div className="column-header">{listKey}({tasks[listKey].length})</div>
              <Droppable droppableId={`${listKey}`}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks[listKey]?.map((item, index) => (
                      <TaskItem key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskList;
