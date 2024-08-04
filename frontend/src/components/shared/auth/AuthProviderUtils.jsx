import { useContext, createContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
  };
  