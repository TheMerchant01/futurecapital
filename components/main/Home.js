// Add the "use client" directive at the top
'use client';

import React, { useEffect } from 'react';
import WrappedFile from "./WrappedFile";
import { ThemeProvider } from "../../contexts/themeContext";
import { FormProvider } from "../../contexts/formContext";

export default function Home() {
  useEffect(() => {
   
  }, []); // Empty dependency array ensures it runs only once when the component is mounted

  return (
    <ThemeProvider>
      <FormProvider>
        <WrappedFile />
      </FormProvider>
    </ThemeProvider>
  );
}
