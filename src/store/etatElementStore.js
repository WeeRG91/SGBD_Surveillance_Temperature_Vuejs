import { defineStore } from "pinia";
import etatElementApi from "../api/etatElement";
import { useToastStore } from "./toastStore";

export const useEtatElementStore = defineStore("etatElement", {
  state: () => ({
    etatElements: [],
    errors: null,
  }),
  actions: {
    async fetchEtatElements() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await etatElementApi.getAll();
        this.etatElements = response.data.results;
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message || "Fetching etats failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
    async createEtatElement(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await etatElementApi.create(data);
        this.fetchEtatElements();
        toast.addToast("Etat créé avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating etat failed",
            };
            toast.addToast(error.response.data.message, "error");
          }
        } else if (error instanceof Error) {
          this.errors = { message: error.message };
        } else {
          this.errors = { message: String(error) };
        }
      }
    },
    async updateEtatElement(id, data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await etatElementApi.update(id, data);
        this.fetchEtatElements();
        toast.addToast("Etat mis à jour avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Updating etat failed",
            };
            toast.addToast(error.response.data.message, "error");
          }
        } else if (error instanceof Error) {
          this.errors = { message: error.message };
        } else {
          this.errors = { message: String(error) };
        }
      }
    },
    async deleteEtatElement(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await etatElementApi.delete(id);
        this.fetchEtatElements();
        toast.addToast("Etat supprimé avec succès.");
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message || "Deleting etat failed";
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
