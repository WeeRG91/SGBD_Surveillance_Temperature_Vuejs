import { defineStore } from "pinia";
import temperatureApi from "../api/temperature";

export const useEtatElementStore = defineStore("etatElement", {
  state: () => ({
    message: null,
    loading: false,
    error: null,
  }),
  actions: {
    async createTemperature(data) {
      this.loading = true;
      this.error = null;
      this.message = null;
      try {
        const response = await temperatureApi.create(data);
        this.message = response.data.message;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Creating temperature failed";
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
