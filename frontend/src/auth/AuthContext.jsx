import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = "https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net"; // Porta padrão do .NET backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const login = async (email, password) => {
  const name = "";
  try {
    const response = await fetch(`${API_URL}/api/User/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      return { success: false, message: 'Email ou senha incorretos.' };
    }

    const token = await response.text(); 

    localStorage.setItem('token', token);

    const payload = JSON.parse(atob(token.split('.')[1]));

    setUser({
      email: payload.email,
      name: payload.name || 'Usuário',
      id: payload.sub,
      role: payload.role || 'user'
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: 'Erro ao processar o token.' };
  }
};
  
const register = async (email, password, name) => {
  try {
    const response = await fetch(`${API_URL}/api/User/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, message: error };
    }

    const token = await response.text(); // ✅ Corrigido aqui

    localStorage.setItem('token', token);

    // Decodifica o payload do token
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({
      email: payload.email,
      id: payload.sub,
      name: payload.name || 'Usuário',
      role: payload.role || 'user'
    });

    return { success: true };

  } catch (error) {
    return { success: false, message: "Erro ao processar token." };
  }
};

  // Função de logout
  // Limpa o usuário e remove o token do localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const now = Date.now() / 1000; // em segundos
      if (payload.exp && payload.exp < now) {
        // Token expirado
        logout();
        return;
      }

      setUser({
        email: payload.email,
        name: payload.name,
        id: payload.sub,
        role: payload.role || 'user'
      });
    } catch {
      logout();
    }
  }
}, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
