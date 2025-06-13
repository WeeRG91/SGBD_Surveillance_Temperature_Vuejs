import api from "./axios";

const etatElementApi = {
  getAll() {
    return api.get("/etats");
  },
  create(data) {
    return api.post("/etats", data);
  },
  update(id, data) {
    return api.put(`/etats/${id}`, data);
  },
  delete(id) {
    return api.delete(`/etats/${id}`);
  },
};

export default etatElementApi;
