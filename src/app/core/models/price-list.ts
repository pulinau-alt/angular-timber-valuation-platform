export interface PriceList {
  id?: string;
  species: string;
  class: string;
  midGirthClasses?: GirthClass[];
}

export interface GirthClass {
  minGirth: number;
  maxGirth: number;
  price: number;
  otherCost: string;
  overHeadCost: string;
  stumpageVal: string;
  profit: string;
  stumpage: string;

}

export interface Clas {
  id?: string;
  name: string;
}
