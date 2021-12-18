/* eslint-disable import/prefer-default-export */
import React from 'react';

const Routes = [
  {
    path: '/',
    component: React.lazy(() => import('../pages/Home')),
    exact: true,
  },
  {
    path: '/login',
    component: React.lazy(() => import('../pages/Login')),
    exact: true,
  },
  {
    path: '/product/:id',
    component: React.lazy(() => import('../pages/ProductDetail')),
    exact: true,
  },
  {
    path: '/cart',
    component: React.lazy(() => import('../pages/Cart')),
    exact: true,
  },
  {
    path: '/admin',
    component: React.lazy(() => import('../pages/Admin')),
    exact: true,
  },
  {
    path: '/rekap',
    component: React.lazy(() => import('../pages/RekapPenjualan')),
    exact: true,
  },
];

export { Routes };
