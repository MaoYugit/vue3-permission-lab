import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import pinia from "./stores/index.js";

// 引入 Element Plus 样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
