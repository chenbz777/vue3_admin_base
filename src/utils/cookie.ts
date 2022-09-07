// 存储cookie
const set = (cname: string, cvalue: string, time?: number): void => {
  if (time) {
    let d = new Date();
    d.setTime(d.getTime() + time * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  } else {
    document.cookie = cname + "=" + cvalue;
  }
};

const setJSON = (cname: string, oldCvalue: object, time?: number): void => {

  const cvalue = JSON.stringify(oldCvalue);

  set(cname, cvalue, time);
};

// 获取cookie
const get = (cname: string) => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return null;
};

// 获取cookieJSON格式
const getJSON = (cname: string) => {

  let result = null;

  const value = get(cname);

  if (value) {
    result = JSON.parse(value);
  }

  return result;
};

// 删除cookie
const del = (cname: string) => {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = get(cname);
  if (cval !== "") {
    if (cval) {
      document.cookie = cname + "=" + cval + ";expires=" + exp.toUTCString();
    }
  }
};


export default {
  set,
  setJSON,
  get,
  getJSON,
  del
};
