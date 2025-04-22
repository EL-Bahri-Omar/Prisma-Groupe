import React from 'react';
import './App.css';

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><a id="page-link1" href="#page1">One and Two</a></li>
        <li><a id="page-link2" href="#page3">Three and Four</a></li>
        <li><a id="page-link3" href="#page5">Five and Six</a></li>
      </ul>
    </nav>
  );
};

export default Nav;