import { defineStore } from "pinia";
import temperatureApi from "../api/temperature";
import { useToastStore } from "./toastStore";

export const useTemperatureStore = defineStore("temperature", {
  state: () => ({
    temperatures: null,
    errors: null,
  }),
  actions: {
    async fetchTemperaturesWithAlerteByElementId(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await temperatureApi.getTemperaturesWithAlerteByElementId(data);
        this.temperatures = response.data.temperatures;
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Fetching temperatures with alerte failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
    async storeTemperature(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await temperatureApi.create(data);
        toast.addToast(response.data.message);
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.message || "Storing temperature failed";
          toast.addToast(error.response.data.message, "error");
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      }
    },
  },
});
