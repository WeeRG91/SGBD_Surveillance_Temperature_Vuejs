import { defineStore } from "pinia";
import emplacementApi from "../api/emplacement";
import { useToastStore } from "./toastStore";

export const useEmplacementStore = defineStore("emplacement", {
  state: () => ({
    emplacements: [],
    emplacementTree: [],
    currentEmplacement: null,
    errors: null,
  }),
  actions: {
    async fetchEmplacements() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await emplacementApi.getAll();
        this.emplacements = response.data.emplacements;
      } catch (error) {
        if (error.response) {
          this.errors =
            error.response.data.message || "Fetching emplacements failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
    async fetchEmplacementTree() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await emplacementApi.getEmplacementTree();
        this.emplacementTree = response.data.emplacements;
      } catch (error) {
        if (error.response) {
          this.errors =
            error.response.data.message || "Fetching emplacement tree failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
    async createEmplacement(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await emplacementApi.create(data);
        this.fetchEmplacements();
        this.fetchEmplacementTree();
        toast.addToast("Emplacement créé avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating emplacement failed",
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
    async updateEmplacement(id, data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await emplacementApi.update(id, data);
        this.fetchEmplacements();
        this.fetchEmplacementTree();
        toast.addToast("Emplacement modifié avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating emplacement failed",
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
    async deleteEmplacement(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await emplacementApi.delete(id);
        this.fetchEmplacements();
        this.fetchEmplacementTree();
        toast.addToast("Emplacement supprimé avec succès.");
      } catch (error) {
        if (error.response) {
          this.errors =
            error.response.data.message || "Deleting emplacement failed";
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
