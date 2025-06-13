import { defineStore } from "pinia";
import elementApi from "../api/element";
import { useToastStore } from "./toastStore";

export const useElementStore = defineStore("element", {
  state: () => ({
    elements: [],
    currentElement: null,
    errors: null,
  }),
  actions: {
    async fetchElements() {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await elementApi.getAll();
        this.elements = response.data.elements;
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            this.errors = error.response.data.message;
            toast.addToast(error.response.data.message, "error");
          }
        } else if (error instanceof Error) {
          this.errors = { message: error.message };
        } else {
          this.errors = { message: String(error) };
        }
      }
    },
    async fetchElement(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await elementApi.getById(id);
        this.currentElement = response.data.element;
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            this.errors = error.response.data.message;
            toast.addToast(error.response.data.message, "error");
          }
        } else if (error instanceof Error) {
          this.errors = { message: error.message };
        } else {
          this.errors = { message: String(error) };
        }
      }
    },
    async createElement(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await elementApi.create(data);
        this.elements.unshift(response.data.element);
        toast.addToast("Element frigorifique crée avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating element failed",
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
    async updateElement(id, data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await elementApi.update(id, data);
        this.fetchElements();
        this.fetchElement(id);
        toast.addToast("Element frigorifique mis à jour avec succès.");
      } catch (error) {
        if (error.response) {
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
            toast.addToast("Information invalide", "error");
          } else {
            this.errors = {
              message: error.response.data.message || "Creating element failed",
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
    async deleteElement(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        await elementApi.delete(id);
        this.elements = this.elements.filter((element) => element.id !== id);
        if (this.currentElement?.id === id) {
          this.currentElement = null;
        }
        toast.addToast("Element supprimé avec succès.");
      } catch (error) {
        if (error.response) {
          this.errors =
            error.response.data.message || "Deleting element failed";
          toast.addToast(error.response.data.message, error);
        } else if (error instanceof Error) {
          this.errors = error.message;
        } else {
          this.errors = String(error);
        }
      }
    },
  },
});
