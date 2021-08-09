import React from 'react';
import SignUp from './components/SignUp';
import Login from  './components/Login';
import EditListing from './components/EditListing';

const dummy = (content) => {
  return function NotImplemented () {
    return <div>{content}</div>;
  };
};
/**
 * filters routes by lable
 * route.filter(byLable(arrayOfLables)
 * @return array of routes with matching lables
 * */
export const byLable = (pages)=>({label})=>pages.includes(label);

const routes = [
  {
    path: '/',
    label: 'Home',
    component: SignUp,
  },
  {
    path: '/signup',
    label: 'Sign up',
    component: SignUp,
  },
  {
    path: '/login',
    label: 'Login',
    component: Login,
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
    component: dummy('About Us, not implemented')
  },
  {
    path: '/team',
    label: 'Team',
    component: dummy('Team, not implemented')
  },
  {
    path: '/contact',
    label: 'Contact',
    component: dummy('Contact Us, not implemented')
  },
  {
    path: '/renting',
    label: 'Renting',
    component: dummy('Renting, not implemented')
  },
  {
    path: '/policies',
    label: 'Policies',
    component: dummy('Policies, not implemented')
  },
  {
    path: '/terms',
    label: 'Terms',
    component: dummy('Terms, not implemented')
  },
  {
    path: '/hosting',
    label: 'Hosting',
    component: dummy('Hosting, not implemented')
  },
  {
    path: '/list-your-car',
    label: 'List your car',
    component: dummy('List your car, not implemented')
  },
  {
    path: '/insurance',
    label: 'Insurance',
    component: dummy('Insurance, not implemented')
  },
  {
    path: '/faq',
    label: 'FAQ',
    component: dummy('FAQ, not implemented')
  },
  {
    path: '/edit-listing',
    label: 'Edit listing',
    component: EditListing
  },
  {
    path: null,
    label: '404',
    component: dummy(<>404<br/>Not found</>)
  },

];

export default routes;
