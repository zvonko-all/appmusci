import Vue from "vue"
import VueRouter from "vue-router"


import recommend from "../view/recommend/Recommend.vue"
import play from "../view/play/Play.vue"
import playlist from "../view/playlist/Playlist.vue"

Vue.use(VueRouter)


const  routes=[
    {
        path:"/",
        redirect: "/recommend"
    },
    {
        path:"/AppMusic/index.html",
        redirect: "/recommend"
    },
    {
        path:"/recommend",
        component: recommend
    },
    {
        path:"/play",
        component: play
    },
    {
        path:"/playlist",
        component: playlist
    }
]


const router=new VueRouter({
    routes,
    mode:"history",
    linkActiveClass:"activity",
})


export default router