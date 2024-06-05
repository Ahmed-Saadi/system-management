import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskInterface } from "../../models/model";
import { AddTask } from "../../component/client/addTask";

interface TaskProps {
  task: TaskInterface;
  moveTask: (id: number, status: string) => void;
}

interface ColumnProps {
  status: string;
  tasks: TaskInterface[];
  moveTask: (id: number, status: string) => void;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [add, setAdd] = useState<boolean>(false);

  const moveTask = (id: number, status: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const tasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen bg-first-color">
          <div className="h-16 w-full bg-black text-white flex items-center justify-center">
            <p>Task Management</p>
          </div>

          <div className="flex flex-grow">
            <Column
              status="To Do"
              tasks={tasksByStatus("To Do")}
              moveTask={moveTask}
              setAdd={setAdd}
            />
            <Column
              status="In Progress"
              tasks={tasksByStatus("In Progress")}
              moveTask={moveTask}
              setAdd={setAdd}
            />
            <Column
              status="Done"
              tasks={tasksByStatus("Done")}
              moveTask={moveTask}
              setAdd={setAdd}
            />
          </div>
        </div>
      </DndProvider>
      {add && ( <AddTask  setAdd={setAdd} />
        
      )}
    </>
  );
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "Task",
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded bg-white ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.description}
    </div>
  );
};

const Column: React.FC<ColumnProps> = ({ status, tasks, moveTask, setAdd }) => {
  const [, drop] = useDrop({
    accept: "Task",
    drop: (item: { id: number }) => moveTask(item.id, status),
  });

  const handleAddClick = (add: boolean) => {
    setAdd(add);
     };

  return (
    <div ref={drop} className="w-1/3 p-4 bg-gray-200 border">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{status}</h2>
        {status === "To Do" && (
          <button
            className="bg-green-500 p-2 w-20 mx-20 rounded-lg font-bold text-white"
            onClick={() => handleAddClick(true)}
          >
            add
          </button>
        )}
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} moveTask={moveTask} />
      ))}
    </div>
  );
};
