import { defineStore } from "pinia";
import usageApi from "../api/usage";

export const useUsageStore = defineStore("usage", {
  state: () => ({
    usages: [],
    currentUsage: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUsages() {
      this.loading = true;
      this.error = null;
      try {
        const response = await usageApi.getAll();
        this.usages = response.data.results;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Fetching usages failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchUsage(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await usageApi.getById(id);
        this.currentUsage = response.data.result;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Fetching usage failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async createUsage(data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await usageApi.create(data);
        this.usages = [...this.usages, response.data.result];
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Creating usage failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async updateUsage(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await usageApi.update(id, data);
        this.usages = this.usages.map((usage) =>
          usage.id === id ? response.data.result : usage
        );
        if (this.currentUsage?.id === id) {
          this.currentUsage === response.data.result;
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Updating usage failed";
        } else if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async deleteUsage(id) {
      this.loading = true;
      this.error = null;
      try {
        await usageApi.delete(id);
        this.usages = this.usages.filter((usage) => usage.id !== id);
        if (this.currentUsage?.id === id) {
          this.currentUsage = null;
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message || "Deleting usage failed";
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
