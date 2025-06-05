import api from "./axios";

const alerteApi = {
  getAll() {
    return api.get("/alertes");
  },
  update(id, data) {
    return api.put(`/alertes/${id}`, data);
  },
};

export default alerteApi;

