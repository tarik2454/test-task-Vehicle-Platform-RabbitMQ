import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:4001",
});

const vehicleApi = axios.create({
  baseURL: "http://localhost:4002",
});

export { userApi, vehicleApi };
