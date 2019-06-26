import Home from "../views/Home/Home";
import Par from "../views/Par/Par";

const routes = [
    {
        path: '/home/signal',
        name: 'Home',
        component: Home
    },
    {
        path: '/home/par',
        name: 'Par',
        component: Par
    },
];


export default routes;

