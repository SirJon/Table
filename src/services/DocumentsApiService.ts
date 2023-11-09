import { Axios } from "axios";
import { SERVER_HOST } from "../constants/api_endpoints";
import { IData } from "../types/data";

const axios = new Axios({
  baseURL: SERVER_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const DocumentsApiService = {
  find: async (endpoint: string) => {
    const response = await axios.get(`/${endpoint}`);
    return JSON.parse(response.data) as IData[];
  },

  findOne: async (endpoint: string, id: string) => {
    const response = await axios.get(`/${endpoint}/${id}`);
    return JSON.parse(response.data) as IData;
  },

  create: async (endpoint: string, data: any) => {
    const response = await axios.post(`/${endpoint}`, JSON.stringify(data));
    return JSON.parse(response.data) as IData;
  },

  update: async (endpoint: string, data: any) => {
    const { id } = data;
    const response = await axios.put(
      `/${endpoint}/${id}`,
      JSON.stringify(data)
    );
    return JSON.parse(response.data) as IData;
  },

  delete: async (endpoint: string, id: string) => {
    const response = await axios.delete(`/${endpoint}/${id}`);
    return JSON.parse(response.data); //?
  },
};
