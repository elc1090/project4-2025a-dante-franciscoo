import { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fakeUser = {
    id: 1,
    email: 'teste@teste.com',
    name: 'Usuário Teste',
  };

  const login = async (email, password) => {
    // Simulação de autenticação
    if (email === 'teste@teste.com' && password === '123456') {
      setUser(fakeUser);
      return { success: true };
    } else {
      return { success: false, message: 'Email ou senha incorretos.' };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
