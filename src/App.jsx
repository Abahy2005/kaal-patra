import Home from "./pages/Home";
import React, { useEffect } from "react";
import About from "./pages/AboutUs";
import How from "./pages/how";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import CapsulePage from "./pages/CapsulesPage";
// import Technology from "./pages/technology";

const App = () => {
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (!isDesktop) {
      alert("This website is only compatible on desktop.");
    }
  }, []);
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/how" element={<How />} />
        <Route path="/capsules" element={<CapsulePage />} />
        {/* <Route path="/technology" element={<Technology />} /> */}
      </Routes>
  );
};

export default App;
