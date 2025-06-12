import api from "./axios";

const elementApi = {
  getAll() {
    return api.get("/elements");
  },
  getById(id) {
    return api.get(`/elements/${id}`);
  },
  create(data) {
    return api.post("/elements", data);
  },
  update(id, data) {
    return api.put(`/elements/${id}`, data);
  },
  delete(id) {
    return api.delete(`/elements/${id}`);
  },
  getTransferOptions(data) {
    return api.get("/elements/transfer-options", { params: data });
  },
};

export default elementApi;
