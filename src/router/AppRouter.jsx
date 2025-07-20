import React from "react";
import { Route, Routes } from "react-router-dom";
import { FrontEndTestRoutes } from "../front-end-test/routes/FrontEndTestRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<FrontEndTestRoutes />} />
    </Routes>
  );
};
