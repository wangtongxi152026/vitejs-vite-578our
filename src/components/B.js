let arr2 = [
  { code: "abc", num: 2 },
  { code: "123", num: 1 },
];

let arr = [
  { code: "abc", type: "小猫" },
  { code: "123", type: "数字" },
  { code: "abc", type: "小狗" },
];

quchong = (arr) => {
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
    hash.push(arr[i]);
  }

  // 第二步，统计重复个数
  hash.forEach((item) => {
    arr.forEach((dd) => {
      if (item.code === dd.code) {
        item.num = item.num + 1;
        if (!item.type.includes(dd.type)) {
          item.type = item.type + "--" + dd.type;
        }
      }
    });
  });
  return hash;
};

quchong(arr);


quchong = (arr) => {
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
      hash.push(arr[i]);
    }
  
    // 第二步，统计重复个数
    hash.forEach((item) => {
      arr.forEach((dd) => {
        if (item.code === dd.code) {
          item.num = item.num + 1;
          if (!item.type.includes(dd.type)) {
            item.type = item.type + "--" + dd.type;
          }
        }
      });
    });
    return hash;
  };