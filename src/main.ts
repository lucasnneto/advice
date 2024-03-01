import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import pine from "pine-btree";

const app = createApp(App);
app.use(pine);
app.mount("#app");
