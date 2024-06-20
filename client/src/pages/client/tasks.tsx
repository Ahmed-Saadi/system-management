import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskInterface, Team } from "../../models/model";
import { AddTask } from "../../component/client/addTask";
import { useTaskStore } from "../../store/TaskStore";
import api from "../../api/api";
import { ShowTaskRow } from "../../component/client/showtaskrow";
import { ShowTeam } from "../../component/client/ShowTeam";

interface TaskProps {
  task: TaskInterface;
  moveTask: (id: number, status: string) => void;
}

interface ColumnProps {
  status: string;
  tasks: TaskInterface[];
  moveTask: (id: number, status: string) => void;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTask: React.Dispatch<React.SetStateAction<TaskInterface | null>>;
}

export const Tasks: React.FC = () => {
  const { tasks, setTasks, updateTaskStatus } = useTaskStore((state: any) => ({
    tasks: state.tasks,
    setTasks: state.setTasks,
    updateTaskStatus: state.updateTaskStatus,
  }));
  const [add, setAdd] = useState<boolean>(false);
  const [showTask, setShowTask] = useState<TaskInterface | null>(null);
  const [team,setTeam] = useState<Team | null >(null)

  useEffect(() => {
    api.get("/task/get").then((response) => setTasks(response.data));
  }, []);

  const moveTask = (id: number, status: string) => {
    api
      .post("/task/updateState", { id, status })
      .then((response) => {
        updateTaskStatus(id, status);
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };

  const tasksByStatus = (status: string) =>
    tasks.filter((task: TaskInterface) => task.status === status);

  function showTeam() {
    api.get("/team/getuserTeam").then((response) => {
      setTeam(response.data)}
    ).catch((error ) => console.log('error : ',error))
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col justify-start bg-gray-100 h-full">
          <div className="h-16 w-full bg-white text-black flex  items-center justify-center shadow-md">
            <p className="text-2xl font-semibold flex-grow text-center ">Task Management</p>
           <button onClick={showTeam} className="self-center p-2 mx-12  bg-blue-500 rounded-md text-white">Team</button>
          </div>

          <div className="flex flex-grow mx-4 my-2">
            <Column
              status="To Do"
              tasks={tasksByStatus("To Do")}
              moveTask={moveTask}
              setAdd={setAdd}
              setShowTask={setShowTask}
            />
            <Column
              status="In Progress"
              tasks={tasksByStatus("In Progress")}
              moveTask={moveTask}
              setAdd={setAdd}
              setShowTask={setShowTask}
            />
            <Column
              status="Done"
              tasks={tasksByStatus("Done")}
              moveTask={moveTask}
              setAdd={setAdd}
              setShowTask={setShowTask}
            />
          </div>
        </div>
      </DndProvider>
      {add && <AddTask setAdd={setAdd} />}
      {showTask && (
        <ShowTaskRow showTask={showTask} setShowTask={setShowTask} />
      )}
      {team && <ShowTeam  setTeam={setTeam} team={team}/>

      }
    </>
  );
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "Task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded bg-white text-black shadow-sm ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.description}
    </div>
  );
};

const Column: React.FC<ColumnProps> = ({
  status,
  tasks,
  moveTask,
  setAdd,
  setShowTask,
}) => {
  const [, drop] = useDrop({
    accept: "Task",
    drop: (item: { id: number }) => moveTask(item.id, status),
  });

  const handleAddClick = (add: boolean) => {
    setAdd(add);
  };

  return (
    <div
      ref={drop}
      className="flex flex-col w-1/3 p-4 bg-gray-200 border border-gray-300 mx-2 rounded-md shadow-lg"
    >
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold text-black">{status}</h2>
        {status === "To Do" && (
          <button
            className="bg-blue-500 w-20 rounded-lg font-bold text-white hover:bg-blue-600"
            onClick={() => handleAddClick(true)}
          >
            Add
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => setShowTask(task)}
            className="cursor-pointer hover:bg-gray-300"
          >
            <Task task={task} moveTask={moveTask} />
          </div>
        ))}
      </div>
    </div>
  );
};
