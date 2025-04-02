import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [tabs, setTabs] = useState([]); 

  return (
    <AppContext.Provider value={{ user, setUser, tabs, setTabs }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
