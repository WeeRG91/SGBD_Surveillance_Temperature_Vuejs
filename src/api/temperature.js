import api from "./axios";

const temperatureApi = {
  create(data) {
    return api.post("/temperatures", data);
  },
};

export default temperatureApi;
