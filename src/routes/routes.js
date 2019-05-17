import Home from "../views/Home/Home";
import Filter from "../views/Filter/Filter";
import NewUI from "../views/newUi"

const routes = [
    {
        path: '/home/signal',
        name: 'Home',
        component: Home
    },
    {
        path: '/home/filter',
        name: 'Filtro',
        component: Filter
    },
    {
        path: '/home/new',
        name: 'new',
        component: NewUI
    },
];


export default routes;

