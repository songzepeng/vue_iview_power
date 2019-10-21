import Vue from "vue";
import Router from "vue-router"; // 引入路由
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import userControl from "./components/userControl";
import actorControl from "./components/actor/actorControl";
import permissionControl from "./components/permission/permissionControl";
import a1 from "./views/a1.vue";
import a2 from "./views/a2.vue";
import request from "./service/request";
Vue.use(Router); // use

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "/home/userControl",
          component: userControl
        },
        {
          path: "/home/actorControl",
          component: actorControl
        },
        {
          path: "/home/permissionControl",
          component: permissionControl
        },
        {
          path: "a1",
          component: a1,
          meta: {
            perId: 123456789
          }
        },
        {
          path: "a2",
          component: a2,
          meta: {
            perId: 1570873025381
          }
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.perId) {
    //校验 当前登录用户是否用于权限 如果有放行 没有权限 卡掉
    //拿到当前登录用户（vuex，sessionStorage）
    //JSON.parse(sessionStorage.getItem('loginUser'))
    //假设当前登录用户是1000
    //从sessionStorage里面缓存当当前登录用户的权限数据
    let loginUserPer = JSON.parse(sessionStorage.getItem("LoginUserPer"));
    if (!loginUserPer) {
      request.getUserAllPer(1000).then(res => {
        //获取当前登录用户的所有的权限
        console.log(res.data);
        sessionStorage.setItem("LoginUserPer", JSON.stringify(res.data));
        let index = res.data.findIndex(
          per => parseInt(per.id) === parseInt(to.meta.perId)
        ); //当前登录用户没有 路由的权限
        if (index < 0) {
          next(false);
          return;
        }
        next();
      });
    } else {
      //从缓存中获取当前登录用户的所有的权限
      let index = loginUserPer.findIndex(
        per => parseInt(per.id) === parseInt(to.meta.perId)
      ); // 当前登录用户没有路由的权限
      if (index < 0) {
        next(false);
        return;
      }
      next();
    }
  } else {
    next();
  }
});
export default router;
