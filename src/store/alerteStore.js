import { defineStore } from "pinia";
import alerteApi from "../api/alerte";

export const useAlerteStore = defineStore("alerte", {
  state: () => ({
    alertes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAlertes() {
      this.loading = true;
      this.error = null;
      try {
        const response = await alerteApi.getAll();
        this.alertes = response.data.alertes;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Fetching alertes failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateAlerte(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await alerteApi.update(id, data);
        this.alertes = this.alertes.map((alerte) =>
          alerte.id === id ? response.data.alerte : alerte
        );
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Updating alerte failed";
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
