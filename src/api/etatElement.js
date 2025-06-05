import api from "./axios";

const etatElementApi = {
  getAll() {
    return api.get("/etats");
  },
};

export default etatElementApi;
