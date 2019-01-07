export interface PriceList{
    id?: string;
    species: string;
    class: string;
    midGirthClasses?: Girthclass[];
}

export interface Girthclass{
    minGirth: number;
    maxGirth: number;
    price: number;

}

export interface Clas {
    id?: string;
    name: string;
}


