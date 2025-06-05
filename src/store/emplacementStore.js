import { defineStore } from "pinia";
import emplacementApi from "../api/emplacement";

export const useEmplacementStore = defineStore("emplacement", {
  state: () => ({
    emplacements: [],
    currentEmplacement: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchEmplacements() {
      this.loading = true;
      this.error = null;
      try {
        const response = await emplacementApi.getAll();
        this.emplacements = response.data.emplacements;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching emplacements failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchEmplacement(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await emplacementApi.getById(id);
        this.currentEmplacement = response.data.emplacement;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching emplacement failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async createEmplacement(data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await emplacementApi.create(data);
        this.emplacements = [...this.emplacements, response.data.result];
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Creating emplacement failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateEmplacement(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await emplacementApi.update(id, data);
        this.emplacements = this.emplacements.map((emplacement) =>
          emplacement.id === id ? response.data.result : emplacement
        );
        if (this.currentEmplacement?.id === id) {
          this.emplacement = response.data.result;
        }
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Updating emplacement failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async deleteEmplacement(id) {
      this.loading = true;
      this.error = null;
      try {
        await emplacementApi.delete(id);
        this.emplacements = this.emplacements.filter(
          (emplacement) => emplacement.id !== id
        );
        if (this.currentEmplacement?.id === id) {
          this.currentEmplacement = null;
        }
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Deleting emplacement failed";
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
