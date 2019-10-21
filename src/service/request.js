//  服务层
import axios from "axios";
let axiosIns = axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    let loginToken = sessionStorage.getItem("login_token");
    if (loginToken) {
      // console.log("tokensss", loginToken);
      // config.headers.Authorization = `Bearer ${loginToken}`;
      config.headers.Authorization = `${loginToken}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
export const login = data => {
  return axios.post("/api/userlogin", data);
};
export const loginOut = () => {
  //退出登录时调用，销毁掉请求拦截器
  axios.interceptors.request.eject(axiosIns);
};

// 以上为登录请求  ------------------------

export const getData = params => {
  return axios.get("http://localhost:8888/per/user", { params });
};
export const getActorData = params => {
  return axios.get("http://localhost:8888/per/role", { params });
};
export const getpermissionData = params => {
  return axios.get("http://localhost:8888/per/permission", { params });
};
export const delData = id => {
  return axios.delete("http://localhost:8888/per/user/${userId}", { id });
};
export const loadUserRole = userId => {
  return axios.get(`http://localhost:8888/per/user_role?userId=${userId}`);
};
export const addUserRole = userRole => {
  return axios.post("http://localhost:8888/per/user_role", userRole);
};
export const deleteUserRole = userRoleId => {
  return axios.delete(`/per/user_role/${userRoleId}`);
};
export const getPermissionUserData = userId => {
  return axios.get(
    `http://localhost:8888/per/user_permission?userId=${userId}`
  );
};
export const addUserPower = userPower => {
  return axios.post("http://localhost:8888/per/user_permission", userPower);
};
export const deleteUserPower = userpermissionId => {
  return axios.delete(
    `http://localhost:8888/per/user_permission/${userpermissionId}`
  );
};
export const getPermissionRoleData = userId => {
  return axios.get(
    `http://localhost:8888/per/role_permission?userId=${userId}`
  );
};
export const addRolePower = userPower => {
  return axios.post("http://localhost:8888/per/role_permission", userPower);
};
export const deleteRolePower = userpermissionId => {
  return axios.delete(
    `http://localhost:8888/per/role_permission/${userpermissionId}`
  );
};
//  处理谷歌浏览器缓存老报错重复的
export const getpermissionData2 = params => {
  return axios.get("http://localhost:8888/per/permission", { params });
};

// 在加载页面前获取哪个用户所拥有的权限
export const getUserAllPer = userId => {
  return axios.get(`http://localhost:8888/per/getUserPer/${userId}`);
};

// 创建前后台返回动态角色名

export default {
  getData,
  delData,
  getActorData,
  getpermissionData,
  loadUserRole,
  addUserRole,
  deleteUserRole,
  getPermissionUserData,
  addUserPower,
  deleteUserPower,
  getPermissionRoleData,
  addRolePower,
  deleteRolePower,
  getpermissionData2,
  login,
  loginOut,
  getUserAllPer
};
