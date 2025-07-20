import React from "react";
import { AppRouter } from "./router/AppRouter";
import { FrontEndTestProvider } from "./front-end-test/context/FrontEndTestContext";

export const FrontEndTestApp = () => {
  return (
    <FrontEndTestProvider>
      <AppRouter />
    </FrontEndTestProvider>
  );
};
