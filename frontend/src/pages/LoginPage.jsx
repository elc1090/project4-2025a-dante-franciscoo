import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const { login } = useAuth(); // usar o login do contexto
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password); // Verificar api de login

    if (result.success) {
      navigate('/'); // redireciona pra home
    } else {
      alert(result.message); // mostra erro se falhar
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-4">
      <div className="bg-indigo-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-white font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-indigo-950 border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-white font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-indigo-950 border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
