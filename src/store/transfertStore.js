import { defineStore } from "pinia";
import { useToastStore } from "./toastStore";
import transfertApi from "../api/transfert";

export const useTransfertStore = defineStore("transfert", {
  state: () => ({
    transferts: [],
    errors: null,
  }),
  actions: {
    async fetchTransfertsByElementId(id) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await transfertApi.getTransfertsByElementId(id);
        this.transferts = response.data.transferts;
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            this.errors = error.response.data.message || "Fetching transferts failed";
            toast.addToast(error.response.data.message, "error");
          }
        } else if (error instanceof Error) {
          this.errors = { message: error.message };
        } else {
          this.errors = { message: String(error) };
        }
      }
    },
    async transferElement(data) {
      const toast = useToastStore();
      this.errors = null;
      try {
        const response = await transfertApi.transfer(data);
        toast.addToast(response.data.message);
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            this.errors = error.response.data.message || "Transfering contenu failed";
            toast.addToast(error.response.data.message, "error");
          }
        } else if (error instanceof Error) {
          this.errors = { message: error.message };
        } else {
          this.errors = { message: String(error) };
        }
      }
    },
  },
});
