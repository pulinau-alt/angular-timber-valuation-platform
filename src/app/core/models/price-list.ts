export interface PriceList {
  id?: string;
  species: string;
  class: string;
  midGirthClasses?: GirthClass[];
}

export interface GirthClass {
  minGirth: string;
  maxGirth: string;
  price: string;
  otherCost: string;
  operationCost: string;
  overHeadCost: string;
  stumpageVal: string;
  profit: string;
  stumpage: string;

}

export interface Clas {
  id?: string;
  name: string;
}
