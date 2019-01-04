export interface Forest {
    id?: string;
    division: string;
    beat: string;
    range: string;
    block: number;
    sBlock: number;
    trees?: LogList;
}

export interface Tree {
    id?: string;
    species: string;
    logs?: Log[];
}

export interface LogList {
    [species: string]: Log[];
}

export interface Log {
    mgClass: string;
    volume: number;
}

export interface TransmissionPoles {
    category: string;
    quantity: number;
}

export interface RoundPoles {
    interface: string;
    quantity: number;
}

export interface FencePosts {
    class: string;
    quantity: number;
}
