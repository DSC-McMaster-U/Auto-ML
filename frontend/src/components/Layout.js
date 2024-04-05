import React from "react";
import NavigationBar from "./NavigationBar";
import HorizontalStepper from "./HorizontalStepper";

const Layout = ({ children, showStepper }) => {
  return (
    <>
      <NavigationBar />
      {showStepper && <HorizontalStepper />}
      {children}
    </>
  );
};
export default Layout;
