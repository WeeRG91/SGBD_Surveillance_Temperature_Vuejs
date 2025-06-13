import { defineStore } from "pinia";
import usageApi from "../api/usage";
import { useToastStore } from "./toastStore";

export const useUsageStore = defineStore("usage", {
  state: () => ({
    usages: [],
    errors: null,
  }),
  actions: {
    async fetchUsages() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await usageApi.getAll();
        this.usages = response.data.results;
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message || "Fetching usages failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
    async createUsage(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await usageApi.create(data);
        this.fetchUsages();
        toast.addToast("Usage créé avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating usage failed",
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
    async updateUsage(id, data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await usageApi.update(id, data);
        this.fetchUsages();
        toast.addToast("Usage mis à jour avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Updating usage failed",
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
    async deleteUsage(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await usageApi.delete(id);
        this.fetchUsages();
        toast.addToast("Usage supprimé avec succès.");
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message || "Deleting usage failed";
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
