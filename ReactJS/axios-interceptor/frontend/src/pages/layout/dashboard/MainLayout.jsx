import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
