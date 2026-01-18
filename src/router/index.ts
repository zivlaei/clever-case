import { createRouter, createWebHistory } from "vue-router"
import LogInView from "../views/LogInView.vue"
import DashboardHomeView from "../views/DashboardHomeView.vue"
import { Identity } from "@/identity-service/entities/identity";

export const routeLocations = {
  logInView: {
    name: "login",
    path: "/login"
  },
  dashboardHomeView: {
    name: "dashboard-home",
    path: "/"
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routeLocations.logInView.path,
      name: routeLocations.logInView.name,
      component: LogInView,
    },
    {
      path: routeLocations.dashboardHomeView.path,
      name: routeLocations.dashboardHomeView.name,
      component: DashboardHomeView,
    },
  ],
})

router.beforeEach(
  (to, from, next) => {
    const identity = new Identity();
    if (identity.authenticated || to.name === routeLocations.logInView.name){
      next();
    }
    else {
      next({ name: "login" });
    }
  }
);

export default router
