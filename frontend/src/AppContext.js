import { createContext, useState } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  return (
    <AppContext.Provider
      value={{
        setToken,
        token,
        setIsLoggedIn,
        isLoggedIn,
        image,
        setImage,
        url,
        setUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
