import { create } from "zustand";
import { Material_Demand } from "../models/model";

// Define the store's state and actions
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
