import api from "./axios";

const temperatureApi = {
  getTemperaturesWithAlerteByElementId(data) {
    return api.get("/temperatures", { params: data });
  },
  create(data) {
    return api.post("/temperatures", data);
  },
};

export default temperatureApi;
