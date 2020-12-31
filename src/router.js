import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

import Store from "./store/store.js"

import MainHome from "@/components/UserPage/Home/MainHome";
import Login from "@/components/Login/Login";
import Layout from "@/components/UserPage/Layout";
import MainWrite from "@/components/UserPage/Write/MainWrite";


Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
    mode: "history",
    routes: [
        {path: '/', component: Login},
        {path: '/user/:id', component: Layout,
            meta: {requiresAuth: true},
            children: [
                {path: '', component: MainHome},
                {path: 'write', component: MainWrite}
            ]
        },
    ],
})

router.beforeEach((to, from, next) => {
    console.log(Store.state.userName);
    if (to.matched.some(record => record.meta.requiresAuth) && Store.state.userName === ""){
        next({path: '/',})
    }
    else {
        next();
    }
})

export default router
