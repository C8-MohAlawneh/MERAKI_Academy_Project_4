import { createContext, useState } from "react";
export const AppContext = createContext();


const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  return (
    <AppContext.Provider value={{ setToken, token, setIsLoggedIn, isLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
