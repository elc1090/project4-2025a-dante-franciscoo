import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("clicado");

    const result = await register(email, password, username);

    if (result.success) {
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center px-4">
      <div className="bg-indigo-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label htmlFor="username" className="block mb-2 text-white font-medium">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-indigo-950 border border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="nome de usuário"
            />
          </div>

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
            Registrar
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-indigo-300 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
