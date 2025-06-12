import api from "./axios";

const historiqueApi = {
  getHistoriqueByElementId(id) {
    return api.get(`/historiques/${id}`);
  },
};

export default historiqueApi;
