import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* Sobre o site */}
        <div>
          <h4 className="text-white font-semibold mb-2">Sobre</h4>
          <p className="text-gray-400">
            MySite é uma plataforma para explorar roadmaps e aprender de forma estruturada.
          </p>
        </div>

        {/* Links úteis */}
        <div>
          <h4 className="text-white font-semibold mb-2">Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/roadmaps" className="hover:text-white">Roadmaps</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* Contato ou redes sociais */}
        <div>
          <h4 className="text-white font-semibold mb-2">Contato</h4>
          <ul className="space-y-1">
            <li>Email: contato@mysite.com</li>
            <li>Telefone: (00) 0000-0000</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} MySite. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
