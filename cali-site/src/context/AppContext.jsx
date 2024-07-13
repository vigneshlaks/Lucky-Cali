import { createContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state
  const [tabs, setTabs] = useState([]); // Example state for tabs

  return (
    <AppContext.Provider value={{ user, setUser, tabs, setTabs }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
