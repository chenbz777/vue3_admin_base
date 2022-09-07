/**
 * @description: object对象封装，处理赋值和清空操作
 * @author: chenbz
 * @date: 2021/4/24
 */

interface ISetKey {
  [key: string]: any;
}


// 通用获取对象的属性
const getType = (obj: ISetKey): object => {
  let obj2 = [];
  for (let objB in obj) {
    if (typeof obj[objB] === "object") {
      getType(obj[objB]);
    }

    let data = {
      key: objB,
      type: typeof obj[objB]
    };
    obj2.push(data);
  }

  return obj2;
};

// obj1: 目标赋值对象，obj2: 赋值对象
const set = (obj1: ISetKey, obj2: ISetKey): void => {
  for (let objB in obj1) {
    obj1[objB] = obj2[objB];
  }
};

// 拓展对象
const extend = (obj1: ISetKey, obj2: ISetKey): void => {
  for (let objB in obj2) {
    obj1[objB] = obj2[objB];
  }
};

// 通用重置对象
const clear = (obj: ISetKey): void => {
  for (let objB in obj) {
    switch (typeof obj[objB]) {
      case "string":
        obj[objB] = "";
        break;
      case "number":
        obj[objB] = 0;
        break;
      case "boolean":
        obj[objB] = false;
        break;
      case "object":
        clear(obj[objB]);
        break;
      default:
        obj[objB] = "";
    }
  }
};

// 复制一个对象
const copy = (obj: ISetKey): object => {
  let data: ISetKey = {};
  for (let objB in obj) {
    data[objB] = obj[objB];
  }
  return data;
};

export default {
  getType,
  set,
  clear,
  copy,
  extend
};
