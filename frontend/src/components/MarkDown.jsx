import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Markdown = () => {
  const [markdown, setMarkdown] = useState('# Digite seu Markdown aqui');

  const handleSubmit = () => {
    alert('Markdown enviado ao backend com sucesso!');
    // Aqui você pode adicionar a lógica real de envio usando fetch ou axios
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Editor de texto */}
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full h-72 p-4 border border-indigo-500 bg-indigo-950 text-white placeholder-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="# Digite seu Markdown aqui"
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Enviar
        </button>
      </div>

      {/* Visualização do Markdown */}
      <div className="bg-indigo-900 p-4 rounded-lg border border-indigo-700 text-white overflow-auto">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Markdown;
