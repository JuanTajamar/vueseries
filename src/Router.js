import { createWebHistory, createRouter } from "vue-router";
import HomeComponent from './components/HomeComponent.vue'
import CreatePersonaje from './components/createPersonajes.vue'
import UpdatePersonajes from './components/updatePersonajes.vue'
import DetailsSerie from './components/detailsSerie.vue'
import DetailsPersonajes from './components/detailsPersonajes.vue'

const myRoutes = [
    { path: "/",  component: HomeComponent },
    { path: "/create", component: CreatePersonaje },
    { path: "/update", component: UpdatePersonajes },
    { path: "/details/:id", component: DetailsSerie },
    { path: "/personajes/:id", component: DetailsPersonajes }
]

const router = createRouter({
    history: createWebHistory(),
    routes: myRoutes,
    linkActiveClass: 'active'
})

export  default router