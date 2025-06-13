import { defineStore } from "pinia";
import typeElementApi from "../api/typeElement";
import { useToastStore } from "./toastStore";

export const useTypeElementStore = defineStore("typeElement", {
  state: () => ({
    typeElements: [],
    errors: null,
  }),
  actions: {
    async fetchTypeElements() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await typeElementApi.getAll();
        this.typeElements = response.data.results;
      } catch (error) {
        if (error.response) {
          this.errors =
            error.response.data.message || "Fetching types failed";
          toast.addToast(error.response.data.message);
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
    async createTypeElement(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await typeElementApi.create(data);
        this.fetchTypeElements();
        toast.addToast("Type créé avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating type failed",
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
    async updateTypeElement(id, data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await typeElementApi.update(id, data);
        this.fetchTypeElements();
        toast.addToast("Type mis à jour avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Updating type failed",
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
    async deleteTypeElement(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await typeElementApi.delete(id);
        this.fetchTypeElements();
        toast.addToast("Type supprimé avec succès.");
      } catch (error) {
        if (error.response) {
          this.errors =
            error.response.data.message || "Deleting type failed";
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
