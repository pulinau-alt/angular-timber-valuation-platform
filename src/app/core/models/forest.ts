export interface Forest {
    id?: string;
    division: string;
    beat: string;
    range: string;
    block: number;
    sBlock: number;
}

export interface Tree {
    id?: string;
    species: string;
}

export interface Logs {
    girthClass: string;
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
