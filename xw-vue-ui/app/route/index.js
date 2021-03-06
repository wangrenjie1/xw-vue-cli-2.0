
const routers = [
    {
        path: '/',
        name: 'login',
        component:() => import('@pages/login/login.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component:() => import('@pages/demo/Demo-v2.vue')
    },
    {
        path: '/tree',
        name: 'tree',
        component:() => import('@pages/demo/tree.vue')
    },
    {
        path: '/test',
        name: 'test',
        component:() => import('@pages/demo/test.vue')
    },
    {
        path: '/demo-test',
        name: 'demo-test',
        component:() => import('@pages/demo/Demo-test.vue')
    },
    {
        path: '/demo-ue',
        name: 'demo-ue',
        component:() => import('@pages/demo/Demo-ue.vue')
    },
    {
        path: '/drag',
        name: 'drag',
        component:() => import('@pages/demo/drag.vue')
    }
];


export default routers;
