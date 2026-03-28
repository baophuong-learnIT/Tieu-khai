export type SalesUser = {
  r: string;
  a: string;
  u: string;
  p: string;
  s: number;
};

export type PrizeDefinition = {
  name: string;
  color: string;
  text: string;
  desc: string;
  icon: string;
  weight: number;
};

export type HistoryRecord = {
  prize: string;
  desc: string;
  time: string;
  won: boolean;
};
