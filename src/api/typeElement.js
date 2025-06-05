import api from "./axios";

const typeElementApi = {
  getAll() {
    return api.get("/types");
  },
  getById(id) {
    return api.get(`/types/${id}`);
  },
  create(data) {
    return api.post("/types", data);
  },
  update(id, data) {
    return api.put(`/types/${id}`, data);
  },
  delete(id) {
    return api.delete(`/types/${id}`);
  },
};

export default typeElementApi;
