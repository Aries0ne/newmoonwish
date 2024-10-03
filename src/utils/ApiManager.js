import axios from "axios";
import { API_URL } from "../config";
import { generatePopup } from "./popup";

class ApiManager {
  constructor() {
    this.baseURL = `${API_URL}`;
  }

  async request(method, endpoint, data = {}, config = {}) {
    const url = this.baseURL + endpoint;
    const token = localStorage.getItem("token");
    if (token) {
      config = {
        ...config,
        headers: config.headers ? { ...config.headers } : {},
      };
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return axios({
      url,
      method,
      data,
      ...config,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        generatePopup(
          "error",
          err?.response?.data?.message || "Something went wrong"
        );
        return err;
      });
  }

  async get(endpoint) {
    return await this.request("GET", endpoint);
  }

  async post(endpoint, data, config) {
    return await this.request("POST", endpoint, data, config);
  }

  async put(endpoint, data, config) {
    return await this.request("PUT", endpoint, data, config);
  }

  async patch(endpoint, data, config) {
    return await this.request("PATCH", endpoint, data, config);
  }

  async delete(endpoint, data, config) {
    return await this.request("DELETE", endpoint, data, config);
  }

  // You can also add custom methods for specific API endpoints or tasks
}

export const apiManager = new ApiManager();
