import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fakeUser = {
    _id: '2222',
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

    // Quando tiver backend, descomente abaixo:
    /*
    try {
      const response = await fetch('https://sua-api.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: 'Erro ao conectar com o servidor.' };
    }
    */
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
