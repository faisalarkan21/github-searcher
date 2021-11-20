import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

export const RootRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};
