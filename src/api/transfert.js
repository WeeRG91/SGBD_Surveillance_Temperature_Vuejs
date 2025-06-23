import api from "./axios";

const transfertApi = {
  getTransfertsByElementId(id) {
    return api.get(`/transferts/${id}`);
  },
  transfer(data) {
    return api.post("/transferts", data);
  },
};

export default transfertApi;