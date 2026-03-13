import axios from "axios";

const host =
  typeof window !== "undefined" ? window.location.hostname : "localhost";

const userApi = axios.create({
  baseURL: `http://${host}:4001`,
});

const vehicleApi = axios.create({
  baseURL: `http://${host}:4002`,
});

export { userApi, vehicleApi };
