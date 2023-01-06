import axios from 'axios';
// import qs from 'qs';
import { ElMessage, ElLoading } from 'element-plus';
import cookie from "./cookie";

interface IBaseRequest {
  url: string;
  method: string;
  data?: any;
}

interface IRes {
  code?: number;
  msg?: string;
  data?: any;
}

axios.defaults.timeout = 6 * 1000; // 设置请求超时 6s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 根据不同环境更改不同 baseUrl
if (process.env.NODE_ENV === "development") {
  // 开发环境
  axios.defaults.baseURL = "http://localhost:7001";
} else if (process.env.NODE_ENV === "production") {
  // 生产环境
  axios.defaults.baseURL = "http://localhost:7001";
};

// 添加请求拦截器
axios.interceptors.request.use(
  function (config: any) {

    config.headers.Authorization = cookie.get('token');

    // 在发送请求之前做些什么
    return config;
  },
  function (error) {


    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {

    // 对响应数据做点什么
    return response;
  },
  function (error) {

    // 对响应错误做点什么

    return Promise.reject(error);
  }
);

const baseRequest = ({ url, method, data }: IBaseRequest) => {

  let params = {};

  if (method === 'get') {
    params = data;
  }

  // 启动 loading
  const loading = ElLoading.service({
    lock: true,
    text: '永远相信, 美好的事情即将发生.',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      params,
    })
      .then(response => {

        const res: IRes = response.data;

        if (res.code === 200) {

          resolve(res.data);
        } else {
          ElMessage({
            message: res.msg,
            type: 'warning',
          });

          reject(res.msg);
        }
      })
      .catch((error) => {

        const err = error.response.data || error.response

        console.log('error', err);

        reject(err);
      })
      .finally(() => {
        // 关闭 loading
        loading.close();
      });
  });
};


const get = (url: string, data: any) => {
  const method = 'get';

  return baseRequest({ url, method, data });
}

const post = (url: string, data: any) => {
  const method = 'post';

  return baseRequest({ url, method, data });
}

const destroy = (url: string, data: any) => {
  const method = 'delete';

  return baseRequest({ url, method, data });
}

const put = (url: string, data: any) => {
  const method = 'put';

  return baseRequest({ url, method, data });
}


export default {
  get,
  post,
  destroy,
  put,
};
