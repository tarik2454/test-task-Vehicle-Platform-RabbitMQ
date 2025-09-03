import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:4001", // user-service
});

const vehicleApi = axios.create({
  baseURL: "http://localhost:4002", // vehicle-service
});

export { userApi, vehicleApi };
