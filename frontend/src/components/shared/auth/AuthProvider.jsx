import { createContext, useContext, useLayoutEffect, useState, useRef } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (!initialized.current) {
      const fetchToken = async () => {
        try {
          const response = await api.get('/auth/refresh');
          setToken(response.data.accessToken);
        } catch (error) {
          setToken(null);
          console.error('Failed to fetch token: ', error);
        } finally {
          setLoading(false);
        }
      };

      fetchToken();
      initialized.current = true;
    }
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && error.response.data.message === 'Unauthorized') {
          try {
            const response = await api.get('/auth/refreshToken');
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            setToken(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);


  const logout = async () => {
    try {
      await api.post('/user/logout');

      setToken(null);

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};
