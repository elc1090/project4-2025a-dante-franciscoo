import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
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

        <p className="text-center text-white mt-6">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-indigo-300 hover:underline">
            Crie uma agora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
