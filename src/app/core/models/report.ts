import { Forest } from './forest';

export interface Report {
    name?: string;
    startDate: any;
    endDate: any;
    region: string;
    forests: ForestReport[];
    totals: {
        noOfTP: number;
        stumpageTP: number;
        noOfRPFP: number;
        firewood: number;
        stumpageRPFPFW: number;
        totalStumpage: number;
    };
}

export interface ForestReport {
    forest: Forest;
    felledTimberVolume: number;
    stumpageTimber: number;
    noOfTP: number;
    stumpageTP: number;
    noOfRPFP: number;
    firewood: number;
    stumpageRPFPFW: number;
    totalStumpage: number;
}
