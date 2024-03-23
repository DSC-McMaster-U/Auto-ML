import React from "react";
import NavigationBar from "./NavigationBar";
import HorizontalStepper from "./HorizontalStepper";

const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <HorizontalStepper />
      {children}
    </>
  );
};
export default Layout;
