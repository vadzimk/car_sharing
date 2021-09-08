import React from 'react';
import SignUp from './components/SignUp';
import Login from  './components/Login';
import EditListing from './components/EditListing';
import NotFound from './components/ui/NotFound.js';

const dummy = (content) => {
  return function NotImplemented () {
    return <div>{content}</div>;
  };
};
/**
 * filters routes by label
 * route.filter(byLabel(arrayOfLables)
 * @return array of routes with matching lables
 * */
export const byLabel = (pages)=>({label})=>pages.includes(label);

const routes = [
  {
    path: '/',
    label: 'Home',
    component: SignUp,
    access: 'public'
  },
  {
    path: '/signup',
    label: 'Sign up',
    component: SignUp,
    access: 'public'
  
  },
  {
    path: '/login',
    label: 'Login',
    component: Login,
    access: 'public'
  
  },
  {
    path: '/listings',
    label: 'Listings',
    component: dummy('Listings, not implemented (ishost)'),
    access: 'ishost'
  },
  {
    path: '/reservations',
    label: 'Reservations',
    component: dummy('Reservations, not implemented (ishost)'),
    access: 'ishost'
  },
  {
    path: '/about',
    label: 'About',
    component: dummy('About Us, not implemented'),
    access: 'public'
  
  },
  {
    path: '/team',
    label: 'Team',
    component: dummy('Team, not implemented'),
    access: 'public'
  
  },
  {
    path: '/contact',
    label: 'Contact',
    component: dummy('Contact Us, not implemented'),
    access: 'public'
  
  },
  {
    path: '/renting',
    label: 'Renting',
    component: dummy('Renting, not implemented'),
    access: 'public'
  
  },
  {
    path: '/policies',
    label: 'Policies',
    component: dummy('Policies, not implemented'),
    access: 'public'
  
  },
  {
    path: '/terms',
    label: 'Terms',
    component: dummy('Terms, not implemented'),
    access: 'public'
  
  },
  {
    path: '/hosting',
    label: 'Hosting',
    component: dummy('Hosting, not implemented'),
    access: 'public'
  },
  {
    path: '/list-your-car',
    label: 'List your car',
    component: dummy(),
    access: 'public'
  },
  {
    path: '/insurance',
    label: 'Insurance',
    component: dummy('Insurance, not implemented'),
    access: 'public'
  },
  {
    path: '/faq',
    label: 'FAQ',
    component: dummy('FAQ, not implemented'),
    access: 'public'
  },
  {
    path: '/listings/create',
    label: 'Edit listing',
    component: EditListing,
    access: 'ishost'
  },
  {
    path: null,
    label: '404',
    component: NotFound,
    access: 'public'
  },

];

export default routes;
