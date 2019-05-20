import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui';
import md5 from 'js-md5'
import router from '../router/index'
//axios.defaults.baseURL = process.env.HTTP_URL;
//axios.defaults.baseURL = '/api';
import cryptoJS from 'crypto-js'
var GetDomainName = function () {//获取域名后缀
    var url = window.location.host;
    url = url.substring(url.lastIndexOf('.'));
    return url;
};

if(GetDomainName()==".com"){
    axios.defaults.baseURL = 'http://www.myyunmima.com'
}else{
   // axios.defaults.baseURL = 'http://zhangdj.yxsoft.net'
    axios.defaults.baseURL = '/api'
}

function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}

function getKey(jsonObject1){
                 var keys1 = [];
             for (var p1 in jsonObject1) {
                 if (jsonObject1.hasOwnProperty(p1))
                     keys1.push(p1+jsonObject1[p1]);
             }
             return keys1;
}

function mapParam(arr){
    var param = "";
    arr.forEach(element => {
        param+=element
    });
    return param;
}

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers['is-wap'] = 1;

axios.interceptors.request.use(
    // Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    //   }),
    config => {
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        Indicator.close();
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    break;
            }
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    }
);



export const getAjax = (url, param) => {
   
    return new Promise((resolve, reject) => {
        axios.get(url, {params:param},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'device-os':'wap',
                    'access-token':localStorage.getItem('token')
                }
            }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const postAjax = (url, param) => {
    
    var sort = objKeySort(param);
    var map = getKey(sort);
    var check = mapParam(map);
    var cheParam = 'yxsoft'+check+'device-oswap'+'yxsoft'
   // //console.log(cheParam)
    var md5param = md5(cheParam);
    ////console.log(md5param)
    var key = cryptoJS.SHA256('lPwIYiE*ZO^V%1%x').toString();
   // //console.log(key)
    var sign = cryptoJS.AES.encrypt(md5param,key,{
        iv:'00000000000000000000000000000000'
    })
   var signature = sign.ciphertext.toString();
 // //console.log(signature)
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(param),{
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                 'device-os':'wap',
                 'access-token':localStorage.getItem('access_token'),
                'signature':'123456'
            }
        }).then((res) => {
           
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const postFileUp = (url, param) => {
    return new Promise((resolve, reject) => {
        axios.post(url,param, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'access-token':localStorage.getItem('access_token'),
                'signature':'123456'
            }
        }).then((res) => {
            resolve(res.data);
        }).then((err) => {
            reject(err);
        })
    })
}




