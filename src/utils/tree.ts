import object from "./object";

interface ISetKey {
  [key: string]: any;
}

function init(data: ISetKey[]) {
  let item = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent_id === 0) {
      item.push(object.copy(data[i]));
    }
  }

  for (let i = 0; i < item.length; i++) {
    start(item[i]);
  }

  function start(data2: ISetKey) {
    if (!data2.is_end) {
      for (let i = 0; i < data.length; i++) {
        if (data2._id === data[i].parent_id) {
          if (!data2.children) {
            data2.children = [];
          }
          data2.children.push(object.copy(data[i]));
        }
      }

      // 递归
      for (let i = 0; i < data2?.children?.length; i++) {
        start(data2.children[i]);
      }
    }
  }

  return item;
}

export default {
  init
};
