import React, { createContext } from "react";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const colorBlue = {
    lightblue: "lightblue",
    darkblue: "darkblue",
    ancientblue: "ancientblue",
    greenishblue: "greenishblue",
    tblue: "tblue",
  };

  const colorRed = {
    lightred: "lightred",
    darkred: "darkred",
    crimson: "crimson",
    maroon: "maroon",
    tred: "tred",
  };

  const colorGreen = {
    lightgreen: "lightgreen",
    darkgreen: "darkgreen",
    lime: "lime",
    teal: "teal",
    tgreen: "tgreen",
  };

  return (
    <ColorContext.Provider value={[colorBlue, colorRed, colorGreen]}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext, ColorProvider };
