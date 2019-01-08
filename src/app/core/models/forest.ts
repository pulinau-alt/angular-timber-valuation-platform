import { GirthClass } from './price-list';

export interface Forest {
    id?: string;
    date: any;
    division: string;
    beat: string;
    range: string;
    block: number;
    sBlock: number;
    logs?: LogList;
    transmissionPoles?: TransmissionPoleList;
    roundPoles?: RoundPoleList;
    fencePosts?: FencePostList;
    firewood: number;
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
    mgClass: GirthClass;
    volume: number;
}

export interface TransmissionPoleList {
    [species: string]: TransmissionPole[];
}

export interface TransmissionPole {
    category: string;
    quantity: number;
}

export interface RoundPoleList {
    [species: string]: RoundPole[];
}

export interface RoundPole {
    class: string;
    quantity: number;
}

export interface FencePostList {
    [species: string]: FencePost[];
}

export interface FencePost {
    class: string;
    quantity: number;
}
