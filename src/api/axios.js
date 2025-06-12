import axios from "axios";

const api = axios.create({
  baseURL: "http://sgbd_surveillance_temperature_api.test/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
