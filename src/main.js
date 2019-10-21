import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import axios from "axios";
import "./plugins/element.js";
Vue.use(ViewUI);

axios.defaults.headers["Authorization"] = "3333";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
