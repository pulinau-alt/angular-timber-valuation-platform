export interface Forest {
    id?: string;
    division: string;
    beat: string;
    range: string;
    block: number;
    sBlock: number;
    logs?: LogList;
    tps?: TransmissionPoleList;
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

export interface TransmissionPoleList {
    [species: string]: TransmissionPole[];
}

export interface TransmissionPole {
    category: string;
    quantity: number;
}

export interface RoundPole {
    category: string;
    quantity: number;
}

export interface FencePost {
    class: string;
    quantity: number;
}
