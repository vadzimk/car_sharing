import React from 'react';
import SignUp from './components/SignUp';

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
    component: dummy('Home, not implemented'),
  },
  {
    path: '/signup',
    label: 'Sign up',
    component: SignUp,
  },
  {
    path: '/listings',
    label: 'Listings',
    component: dummy('Listings, not implemented')
  },
  {
    path: '/reservations',
    label: 'Reservations',
    component: dummy('Reservations, not implemented')
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

];

export default routes;
