import { create } from "zustand";
import { Demand_congéer, Material_Demand } from "../models/model";


export const useDemandeStore = create((set) => ({
  demands: [],
  setDemands: (data: Material_Demand[]) => set({ demands: data }),
  addDemande: (demande: Material_Demand) =>
    set((state: any) => ({
      demands: [...state.demands, demande],
    })),
  removeDemande: (demandeId: number) =>
    set((state: any) => ({
      demands: state.demands.filter(
        (demande: Material_Demand) => demande.d_id !== demandeId
      ),
    })),
}));



export const useDemandeCongéStore = create((set) => ({
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
