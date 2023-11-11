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

  delete: async (endpoint: string, data: any) => {
    const response = await axios.post(`/${endpoint}`, JSON.stringify(data));
    try {
      return JSON.parse(response.data);
    } catch (error) {
      return 'Не удалось расшифровать ответ'
    }
  },
};
