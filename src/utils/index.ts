import { Item } from "../types";
export const bubbleSort = (arr: Item[], key: keyof Item, type: string) => {
  const len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (type === "ascend") {
        if (arr[j][key] > arr[j + 1][key]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      } else if (type === "descend") {
        if (arr[j][key] > arr[j + 1][key]) {
          [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        }
      }
    }
  }
  return arr;
};
export const getData = (data: any) => {
  const 年收益率大于0 = data.datas.filter(
    (item: any) => parseFloat(item.annualizedYield) > 5 && parseFloat(item.profitAndList) > 5
  );
  return 年收益率大于0.map((item: any, index: any) => {
    return {
      key: index + 1,
      name: item.name,
      annualizedYield: parseFloat(item.annualizedYield),
      profitAndList: parseFloat(item.profitAndList),
      drawnDown: parseFloat(item.drawnDown),
      labels2: item.labels2,
      labels1: item.labels1,
      desc: item.desc,
      query: item.query,
    };
  });
};
// 定义一个深拷贝函数  接收目标target参数
export const deepClone = (target: any): any => {
  // 定义一个变量
  let result: any;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
};

export const quchong = (arr: any) => {
  //  第一步，去重
  let hash = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i].code === arr[j].code) {
        ++i;
        j = i;
      }
    }
    arr[i].num = 0;
    hash.push(deepClone(arr[i]));
  }

  hash.forEach((item) => {
    item.type = [item.type];
    arr.forEach((ele: any) => {
      if (item.code === ele.code) {
        item.num = item.num + 1;
        // console.log(item.type);
        if (!item.type.includes(ele.type)) {
          item.type.push(ele.type);
        }
      }
    });
  });

  return hash;
};
export const methodstypes = ["资金面", "技术面", "消息面", "基本面", "大师策略"];