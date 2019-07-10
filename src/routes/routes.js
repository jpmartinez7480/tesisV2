import Home from "../views/Home/Home";
import Repository from "../views/Repository/Repository";

const routes = [
    {
        path: '/home/signal',
        name: 'Home',
        component: Home
    },
    {
        path: '/home/repository',
        name: 'Repository',
        component: Repository
    }
    
];


export default routes;

