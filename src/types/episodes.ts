import { Characters } from "./characters";

export interface Episodes {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: any[];
    url: string;
    created: string;
}