import { defineStore } from "pinia";
import typeElementApi from "../api/typeElement";

export const useTypeElementStore = defineStore("typeElement", {
  state: () => ({
    typeElements: [],
    currentTypeElement: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTypeElements() {
      this.loading = true;
      this.error = null;
      try {
        const response = await typeElementApi.getAll();
        this.typeElements = response.data.results;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching element types failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchTypeElement(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await typeElementApi.getById(id);
        this.currentTypeElement = response.data.result;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching element type failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async createTypeElement(data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await typeElementApi.create(data);
        this.typeElements = [...this.typeElements, response.data.result];
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Creating type element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateTypeElement(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await typeElementApi.update(id, data);
        this.typeElements = this.typeElements.map((type) =>
          type.id === id ? response.data.result : type
        );
        if (this.currentTypeElement?.id === id) {
          this.createTypeElement = response.data.result;
        }
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Updating type element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async deleteTypeElement(id) {
      this.loading = true;
      this.error = null;
      try {
        await typeElementApi.delete(id);
        this.typeElements = this.typeElements.filter((type) => type.id !== id);
        if (this.currentTypeElement?.id === id) {
          this.currentTypeElement = null;
        }
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Deleting type element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.error = false;
      }
    },
  },
});
