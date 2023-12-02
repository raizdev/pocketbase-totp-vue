import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HomeView from "@/views/HomeView.vue";
import Registration from "@/views/Registration.vue";
import Signin from "@/views/Signin.vue";
import Add from "@/views/Authenticator/Add.vue";
import Remove from "@/views/Authenticator/Remove.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/authenticator",
      children: [
        { path: "add", component: Add },
        { path: "remove", component: Remove },
      ]
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: Signin,
    },
    {
      path: "/logout",
      name: "logout",
      async beforeEnter(to, from) {
        const auth = useAuthStore();
        auth.logout();

        return { name: 'sign-in' };
    },
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
    }
    ],
});

router.beforeEach(async (to) => {

  const publicPages = ['/sign-in', '/registration'];
  const authRequired = !publicPages.includes(to.path);

  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      return '/sign-in';
  }
});

export default router;
