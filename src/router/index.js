import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/pages/Home.vue'
import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'
import Middlewares from "../middlewares/";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
                meta: {
                    middleware: [Middlewares.guest]
                }
            },
            {
                path: 'register',
                name: 'register',
                component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue'),
                meta: {
                    middleware: [Middlewares.guest]
                }
            },
            {
                path: '/forgot-password',
                name: 'forgotPassword',
                component: () => import(/* webpackChunkName: "forgotPassword" */ '../views/auth/ForgotPassword.vue'),
                meta: {
                    middleware: [Middlewares.guest]
                }
            },
            {
                path: '/reset-password',
                name: 'resetPassword',
                component: () => import(/* webpackChunkName: "resetPassword" */ '../views/auth/ResetPassword.vue'),
                meta: {
                    middleware: [Middlewares.guest]
                }
            }
        ]
    },
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/pages/Dashboard.vue'),
                meta: {
                    middleware: [Middlewares.auth]
                }
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import(/* webpackChunkName: "profile" */ '../views/pages/Profile.vue'),
                meta: {
                    middleware: [Middlewares.auth]
                }
            }
        ]
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index];

    if (!nextMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMidd = nextCheck(context, middleware, index + 1);

        nextMiddleware({...context, next: nextMidd});
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

        const ctx = {
            from,
            next,
            router,
            to
        };

        const nextMiddleware = nextCheck(ctx, middleware, 1);

        return middleware[0]({...ctx, next: nextMiddleware});
    }

    return next();
});

export default router
