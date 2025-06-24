import { defineStore } from "pinia";
import alerteApi from "../api/alerte";
import { useToastStore } from "./toastStore";

export const useAlerteStore = defineStore("alerte", {
  state: () => ({
    alertes: [],
    errors: null,
  }),
  actions: {
    async fetchAlertes() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await alerteApi.getAll();
        this.alertes = response.data.alertes;
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message || "Fetching alertes failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
    async updateAlerte(id, data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await alerteApi.update(id, data);
        toast.addToast("Alerte traitée avec succès.");
        this.fetchAlertes();
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message || "Updating alerte failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
  },
});
