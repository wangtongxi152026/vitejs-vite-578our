export interface Item {
  num: number;
  name: string;
  annualizedYield: number;
  profitAndList: number;
  drawnDown: number;
  labels2: string;
  labels1: string;
  desc: string;
  query: string;
}
export interface GUpiaoItem {
  code: string;
  股票简称: string;
  收盘价: string;
  涨跌幅: string;
  上市板块: string;
  type: string[];
}
