import Home from "../views/Home/Home";
import Repository from "../views/Repository/Repository";
import Tutorial from "../views/Tutorial/Tutorial";

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
    ,
    {
        path: '/home/help',
        name: 'Tutorial',
        component: Tutorial
    }
    
];


export default routes;

