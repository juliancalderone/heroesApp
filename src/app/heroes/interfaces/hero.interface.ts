export interface Hero {
    alt_img?: string;
    id: string;
    superhero: string;
    publisher: Publisher;
    alter_ego: string;
    first_appearance: string;
    characters: string;
}

export enum Publisher {
    DcComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}