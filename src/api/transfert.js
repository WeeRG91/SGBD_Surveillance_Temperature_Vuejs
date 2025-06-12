import api from "./axios";

const transfertApi = {
  getAll() {
    return api.get("/transferts");
  },
  transfer(data) {
    return api.post("/transferts", data);
  },
};

export default transfertApi;