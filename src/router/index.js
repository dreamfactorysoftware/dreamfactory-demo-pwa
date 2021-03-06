import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "../views/LoginPage";
import DepartmentEmployeesPage from "../views/DepartmentEmployeesPage";
import EmployeePage from "../views/EmployeePage";
import CustomerPage from "../views/CustomerPage";
import Departments from "../views/Departments";
import Employees from "../views/Employees";
import Customers from "../views/Customers";
import MapPage from "../views/MapPage";
import SupportPage from "../views/SupportPage";
import PageNotFound from "../views/PageNotFound";
import SomethingWentWrongPage from "../views/SomethingWentWrongPage";
import HomePage from "../views/HomePage";

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/departments',
    name: 'departments',
    component: Departments,
  },

  {
    path: '/departments/:id/',
    name: 'department',
    component: DepartmentEmployeesPage,
  },
  {
    path: '/departments/:id/employees/:eid',
    name: 'deptEmployee',
    component: EmployeePage,
  },
  {
    path: '/employees/:eid',
    name: 'employee',
    component: EmployeePage
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees
  },
  {
    path: '/customers/:id',
    name: 'customer',
    component: CustomerPage
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  },
  {
    path: '/map',
    name: 'map',
    component: MapPage
  },
  {
    path: '/support',
    name: 'support',
    component: SupportPage
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: PageNotFound
  },
  {
    path: '/500',
    name: 'somethingWentWrongPage',
    component: SomethingWentWrongPage
  },
  {
    path: '*/*',
    redirect: '/404',
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate cunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
