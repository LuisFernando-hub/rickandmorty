import axiosInstance from "./axiosConfig";
import { Episodes } from "../types/episodes";

export const fetchEpisodesAPI = async (): Promise<Episodes[]> => {
    const response = await axiosInstance.get('/episode');
    return response.data.results;
}
