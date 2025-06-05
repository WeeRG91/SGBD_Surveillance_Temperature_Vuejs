import { defineStore } from "pinia";
import elementApi from "../api/element";

export const useElementStore = defineStore("element", {
  state: () => ({
    elements: [],
    currentElement: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchElements() {
      this.error = null;
      this.loading = true;
      try {
        const response = await elementApi.getAll();
        this.elements = response.data.elements;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching elements failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchElement(id) {
      this.error = null;
      this.loading = true;
      try {
        const response = await elementApi.getById(id);
        this.currentElement = response.data.element;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Fetching element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async createElement(data) {
      this.error = null;
      this.loading = true;
      try {
        const response = await elementApi.create(data);
        this.elements = [...this.elements, response.data.element];
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Creating element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateElement(id, data) {
      this.error = null;
      this.loading = true;
      try {
        const response = await elementApi.update(id, data);
        this.elements = this.elements.map((element) =>
          element.id === id ? response.data.element : element
        );
        if (this.currentElement?.id === id) {
          this.currentElement = response.data.element;
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Updating element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async deleteElement(id) {
      this.error = null;
      this.loading = true;
      try {
        await elementApi.delete(id);
        this.elements = this.elements.filter((element) => element.id !== id);
        if (this.currentElement?.id === id) {
          this.currentElement = null;
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Deleting element failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
