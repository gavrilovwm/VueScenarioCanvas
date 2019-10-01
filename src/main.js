import Vue from "vue";
import App from "./App";

import VueKonva from "vue-konva";
import axios from "axios";

Vue.use(VueKonva);
Vue.use(axios);

new Vue({
  el: "#app",
  components: { App },
  template: '<App :_scenarioCount="4" :_blocksMaxCount="10"/>'
});
