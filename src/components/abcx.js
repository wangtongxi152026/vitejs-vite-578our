export let arr = [
  {
    name: "abc",
    type: "哈哈",
  },
  {
    name: "abc",
    type: "嘿嘿",
  },
  {
    name: "qwe",
    type: "嘿嘿",
  },
  {
    name: "qwe",
    type: "ooo",
  },
  {
    name: "abc",
    type: "666",
  },
];
let fun = () => {};
fun();
// console.log(newObj);

/* let obj = [
    {name:'abc',
    type:'哈哈~嘿嘿',
    num:2},
{
    name:'qwe',
    type:'嘿嘿',
    num:1
}
] */
let array = [];
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  if (element.name === item.name) {
    array[index].num++;
  } else {
    item.num = 1;
    array.push({ ...item });
  }
}
