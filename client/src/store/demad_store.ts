import { create } from "zustand";
import { Demand_conger, Material_Demand } from "../models/model";

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
  setDemands: (data: Demand_conger[]) => set({ demands: data }),
  addDemande: (demande: Demand_conger) =>
    set((state: any) => ({
      demands: [...state.demands, demande],
    })),
  removeDemande: (demandeId: number) =>
    set((state: any) => ({
      demands: state.demands.filter(
        (demande: Demand_conger) => demande.dc_id !== demandeId
      ),
    })),
}));
