export interface Characters {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: object;
    image: string;
    episode: any[];
    url: string;
    created: string;
}