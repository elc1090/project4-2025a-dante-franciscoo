import React from 'react';
import Markdown from '../components/MarkDown';
import Footer from '../layouts/Footer';
import InstructionsRoadMap from '../layouts/InstructionsRoadMap';
import { useState } from 'react';

const MarkDownPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [roadmapName, setRoadmapName] = useState('');
  const categories = [
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Full Stack Developer',
  'QA Engineer',
  'Data Scientist',
  'Mobile Developer',
  'Cybersecurity Specialist',
  'Cloud Engineer',
  'Game Developer',
  'Product Manager',
  'IOS Developer',
];

  return (
    <>
      <InstructionsRoadMap />

      <div className="my-10 w-full flex justify-center">
          <div className="w-full h-1 bg-gray-400 shadow-[0_12px_30px_rgba(255,255,255,0.4),0_-12px_30px_rgba(255,255,255,0.4)] rounded-full" />
      </div>


      {/* Área de seleção de categoria e nome do roadmap */}
      <section className="container mx-auto px-6 py-8 space-y-6 max-w-md text-center">
        {/* Nome do Roadmap */}
        <div>
          <label
            htmlFor="roadmap-name"
            className="block text-base font-semibold text-white mb-2"
          >
            Nome do Roadmap:
          </label>
          <input
            id="roadmap-name"
            type="text"
            value={roadmapName}
            onChange={(e) => setRoadmapName(e.target.value)}
            placeholder="Ex: Roadmap Front-end 2025"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
          />
        </div>

        {/* Seleção de Categoria */}
        <div>
          <p className="text-base font-semibold text-white mb-3">Categoria:</p>
          <div className="grid grid-cols-3 gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition
                  ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Markdown */}
      <div className="container mx-auto p-6 max-w-4xl">
        <Markdown />
      </div>

      <Footer />
    </>
  );
};

export default MarkDownPage;
