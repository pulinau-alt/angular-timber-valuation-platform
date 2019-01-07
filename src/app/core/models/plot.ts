export interface Plots {
  id?: string;
  division: string;
  beat: string;
  range: string;
  block: string;
  sBlock: string;
  plot: number;
  plotSize: number;
  mainSP: number;
  minorSP: number;
  pYear: string;
  nStanding: number;
  nRemoved: number;
  slope: number;
  slopePos: string;
  aspect: number;
  date: string;
  groundVeg: number;
  underStr: number;
  soilDp: string;
  soilTxt: string;
  humus: string;
  pData: Array<PlotData>;
}

export interface PlotData {
  tree: number;
  species: number;
  dbh: number;
  dh: string;
  boForm: string;
  dmg: string;
  blA: number;
  slA: number;
  bsA: number;
  tpA: number;
  blB: number;
  slB: number;
  bsB: number;
  tpB: number;

}
