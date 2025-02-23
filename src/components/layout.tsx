"use client";

// ** React imports
import React from "react";

// ** Store
import { Provider } from "react-redux";
import { store } from "@/store";

// ** Loader Import
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

import { ThemeProvider } from "@material-tailwind/react";

export function ThemeProviderLayout({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <ProgressProvider
       color="#060723"
       options={{ showSpinner: false }}
       shallowRouting
       >
        {/* // <ThemeProvider>{children}</ThemeProvider> */}
        {children}
      </ProgressProvider>
    </Provider>
  );
}

export default ThemeProviderLayout;
