import { create } from "zustand";
import { Account } from "../models/model";



export const useAccountStore = create((set) => ({
    account:{},
    setAccount : (data:Account) => set({account:data})
}))