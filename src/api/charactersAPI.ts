import axiosInstance from "./axiosConfig";
import { Characters } from "../types/characters";

export const fetchCharactersAPI = async (): Promise<Characters[]> => {
    const response = await axiosInstance.get('/character');
    return response.data.results;
}

export const fetchCharacterByIdAPI = async (id: number): Promise<Characters> => {
    const response = await axiosInstance.get(`/character/${id}`);
    return response.data;
}