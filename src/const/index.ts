/** @format */
import { Item, GUpiaoItem } from "../types";
export const columns = [
  {
    title: "#",
    width: "60",
    dataIndex: "num",
  },
  {
    title: "名称",
    width: "200",
    dataIndex: "name",
  },
  {
    title: "年化收益",
    width: "115",
    slotName: "annualizedYield",
    filterable: {
      filters: [
        {
          text: "> 40%",
          value: 40,
        },
        {
          text: "> 50%",
          value: 50,
        },
      ],
      filter: (value: number, record: Item) => {
        console.log(record.annualizedYield, value);
        return record.annualizedYield > value;
      },
      // multiple: true,
    },

    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  {
    title: "累计收益",
    width: "110",
    slotName: "profitAndList",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  {
    title: "最大回撤",
    width: "110",
    slotName: "drawnDown",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },

  {
    title: "特点",
    width: "180",
    slotName: "tags",
  },
  {
    title: "参数",
    slotName: "query",
  },
  {
    title: "描述",
    slotName: "desc",
  },
];
export const columns1 = [
  {
    title: "重复次数",
    width: "120",
    dataIndex: "num",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
  },
  {
    title: "股票代码",
    width: "100",
    dataIndex: "code",
  },
  {
    title: "股票简称",
    width: "150",
    dataIndex: "股票简称",
  },
  {
    title: "收盘价",
    width: "100",
    sortable: {
      sortDirections: ["ascend", "descend"],
    },
    dataIndex: "收盘价",
  },
  {
    title: "涨跌幅",
    width: "100",
    dataIndex: "涨跌幅",
  },
  {
    title: "上市板块",
    width: "100",
    dataIndex: "上市板块",
  },
  {
    title: "分类",
    width: "200",
    slotName: "type",
  },
];
export const mTypes = ["资金面", "技术面", "消息面", "基本面", "大师"];
