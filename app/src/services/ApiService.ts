import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";
import type DishesInterface from "@/types/DishesInterface";

export default class DishesService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:9000/dishes/",
    });
  }

  private async axiosCall<T>(config: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance.request<T>(config);
      const { data, status, headers } = response
      return { data, status, headers };
    } catch (error) {
      return [error];
    }
  }

  async get(path?: string) {
    if (typeof path === "undefined") {
      const response = await this.axiosCall<DishesInterface>({ method: "get", url: `` });
      return response;
    }
    const response = await this.axiosCall<DishesInterface>({
      method: "get",
      url: `/${path}`,
    });
    return response;
  }

  async update(requestData: Partial<DishesInterface>) {
    const response = await this.axiosCall<DishesInterface>({
      method: "put",
      url: ``,
      data: requestData,
    });
    return response;
  }

  async delete(id: number) {
    const response = await this.axiosCall<void>({ method: "delete", url: `/${id}` });
    return response;
  }

}