import api from "./axios";

const emplacementApi = {
  getAll() {
    return api.get("/emplacements");
  },
  getEmplacementTree() {
    return api.get("/emplacements/emplacement-tree");
  },
  getById(id) {
    return api.get(`/emplacements/${id}`);
  },
  create(data) {
    return api.post("/emplacements", data);
  },
  update(id, data) {
    return api.put(`/emplacements/${id}`, data);
  },
  delete(id) {
    return api.delete(`/emplacements/${id}`);
  },
};

export default emplacementApi;
