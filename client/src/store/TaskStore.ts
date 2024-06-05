import { create } from "zustand";
import { Demand_congéer, TaskInterface } from "../models/model";


const useDemandeCongéStore = create((set) => ({
    demands: [],
    setDemands: (data: Demand_congéer[]) => set({ demands: data }),
    addDemande: (demande: Demand_congéer) =>
      set((state: any) => ({
        demands: [...state.demands, demande],
      })),
    removeDemande: (demandeId: number) =>
      set((state: any) => ({
        demands: state.demands.filter(
          (demande: Demand_congéer) => demande.dc_id !== demandeId
        ),
      })),
  }));
  
  export const useTaskStore = create((set) =>({
    tasks:[],
    setTasks:(data:TaskInterface[]) => set({tasks:data}),
    addTask:(task: TaskInterface) =>
      set((state: any) => ({
        tasks: [...state.tasks, task],
      })),
  }))