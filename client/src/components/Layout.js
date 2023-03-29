// components/Layout.js
import React from "react";
import Header from "./Header";
import NavTabs from "./NavTabs";
import Footer from "./Footer";
import "./Layout.css"; // Import the CSS file

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavTabs />
      <div className="Layout"> {/* Add a wrapper div with the class name "Layout" */}
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;

