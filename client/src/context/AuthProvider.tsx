import { createContext, useContext, useState } from 'react';

type User = {
  id: number;
  email: string;
  profpic: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>;
};
