import React from 'react';
import PropTypes from 'prop-types';

import '../styles/sidebar.css';

function Sidebar(props) {
  const { children } = props;
  return <aside className="sidebar">{children}</aside>;
}

Sidebar.propTypes = {
  children: PropTypes.any
};

export { Sidebar };
