import { create } from "zustand";
import { TaskInterface } from "../models/model";

export const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (data: TaskInterface[]) => set({ tasks: data }),
  addTask: (task: TaskInterface) =>
    set((state: any) => ({
      tasks: [...state.tasks, task],
    })),
    updateTaskStatus: (id:number, status:string) =>
      set((state:any) => ({
        tasks: state.tasks.map((task:TaskInterface) =>
          task.id === id ? { ...task, status } : task
        ),
      })),
}));
