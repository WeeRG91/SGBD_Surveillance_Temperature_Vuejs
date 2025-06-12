import { defineStore } from "pinia";
import { useToastStore } from "./toastStore";
import historiqueApi from "../api/historique";

export const useHistoriqueStore = defineStore("historique", {
  state: () => ({
    historiques: null,
    errors: null,
  }),
  actions: {
    async fetchHistoriquesByElementId(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await historiqueApi.getHistoriqueByElementId(id);
        this.historiques = response.data.historiques;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching temperatures failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
  },
});
