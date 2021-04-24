import * as React from "react";

export const Context = React.createContext({
  seed: 0,
});

export const useContext = () => React.useContext(Context);
