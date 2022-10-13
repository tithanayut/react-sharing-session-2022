import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { CredentialDto, ErrorDto } from '../types/dto';
import { API_BASE_URL } from '../env';

interface IAuthContext {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const token = localStorage.getItem('token');

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isLoggedIn, setLoggedIn] = useState(!!token);

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post<CredentialDto>(
        `${API_BASE_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      localStorage.setItem('token', res.data.accessToken);
      setLoggedIn(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error('Unknown error');
    }
  };

  const logout = () => {
    toast.success('Log out successfully');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
