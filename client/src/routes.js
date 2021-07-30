import React from 'react';
import SignUp from './components/SignUp';

const routes = [
  {
    path: '/',
    label: 'Home',
    component: function NotImplemented () {
      return <div>Home</div>;
    },
  },
  {
    path: '/signup',
    label: 'Sign up',
    component: SignUp
  },
  {
    path: '/listings',
    label: 'Listings',
    component: function NotImplemented () {
      return <div>Listings</div>;
    },
  },
  {
    path: '/reservations',
    label: 'Reservations',
    component: function NotImplemented () {
      return <div>Reservations</div>;
    },
  },

];

export default routes;