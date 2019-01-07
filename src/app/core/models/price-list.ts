export interface PriceList {
    species: string;
    class: string; // Luxury, super luxury etc.
    midGirthClasses?: GirthClass[];
}

export interface GirthClass {
    minGirth: number;
    maxGirth: number;
    price: number;
}
