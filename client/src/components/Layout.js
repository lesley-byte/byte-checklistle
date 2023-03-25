// components/Layout.js
import React from "react";
import Header from "./Header";
import NavTabs from "./NavTabs";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavTabs />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
