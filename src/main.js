import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
pinia.use(({ store }) => { store.router = markRaw(router) });

const app = createApp(App);

app.use(pinia);

const auth = useAuthStore();
auth.initialize().then(() => {
    app.use(router).mount("#app");
})
