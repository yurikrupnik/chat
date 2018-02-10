import React from 'react'
import ChatRoom from '../ChatRoom';
import Register from '../register';
import NoMatch from '../NoMatch';
import Root from '../Root';

const routes = [
    {
        path: '/',
        component: Root
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/chat',
        component: ChatRoom
    },
    {
        path: '*',
        component: NoMatch
    }
];

export default routes;