"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import {  store } from "@/store";


export function ThemeProviderLayout({ children }: { children: React.ReactNode }) {
  return (
  <Provider store={store}>
  {/* // <ThemeProvider>{children}</ThemeProvider> */}
    {children}
  </Provider>
  )
}

export default ThemeProviderLayout;