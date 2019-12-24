import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from "../views/LoginPage";
import DepartmentEmployeesPage from "../views/DepartmentEmployeesPage";
import EmployeePage from "../views/EmployeePage";
import Departments from "../views/Departments";
import Employees from "../views/Employees";
import MapPage from "../views/MapPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'home',
    component: Home,
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
    path: '/departments/:id/employee/:eid',
    name: 'deptEmployee',
    component: EmployeePage,
  },
  {
    path: '/employee/:eid',
    name: 'employee',
    component: EmployeePage
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees
  },
  {
    path: '/map',
    name: 'map',
    component: MapPage
  },
  {
    path: '*/*',
    redirect: '/'
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate cunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
