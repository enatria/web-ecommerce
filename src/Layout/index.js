import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components/molecules';

const Layout = function ({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
