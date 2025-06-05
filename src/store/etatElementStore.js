import { defineStore } from "pinia";
import etatElementApi from "../api/etatElement";

export const useEtatElementStore = defineStore("etatElement", {
  state: () => ({
    etatElements: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchEtatElements() {
      this.loading = true;
      this.error = null;
      try {
        const response = await etatElementApi.getAll();
        this.etatElements = response.data.results;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching element etats failed";
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
