import api from "./axios";

const usageApi = {
  getAll() {
    return api.get("/usages");
  },
  getById(id) {
    return api.get(`/usages/${id}`);
  },
  create(data) {
    return api.post("/usages", data);
  },
  update(id, data) {
    return api.put(`/usages/${id}`, data);
  },
  delete(id) {
    return api.delete(`/usages/${id}`);
  },
};

export default usageApi;
