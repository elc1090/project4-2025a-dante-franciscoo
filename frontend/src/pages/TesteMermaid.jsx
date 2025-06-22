import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

const MermaidGraph = () => {
    const [markdown, setMarkdown] = useState('');
    const [mermaidCode, setMermaidCode] = useState('');
    const chartRef = useRef(null);

    const generateMermaid = () => {
      const data = `
      graph TD
        A[Introdução] --> B[Abordagens]
        B --> B1[Nativo]
        B --> B2[Híbrido]
        B --> B3[PWA]
        A --> C[Ferramentas]
        C --> C1[Android Studio]
        C --> C2[Xcode]
        C --> C3[Flutter]
        C --> C4[React Native CLI]
        A --> D[Recursos]
        D --> D1[Docs RN]
        D --> D2[Docs Flutter]
      `
      setMermaidCode(data);
    };

  useEffect(() => {
    if (chartRef.current && mermaidCode) {
      const renderMermaid = async () => {
        try {
          // Garante que o container esteja limpo
          chartRef.current.innerHTML = '';
          const { svg } = await mermaid.render('graphDiv', mermaidCode);
          chartRef.current.innerHTML = svg;
        } catch (err) {
          chartRef.current.innerHTML = `<pre>Erro ao renderizar o gráfico Mermaid:\n${err.message}</pre>`;
        }
      };

      renderMermaid();
    }
  }, [mermaidCode]);

  return (
    <div className="p-4">
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Cole seu markdown aqui"
        rows={10}
        className="w-full border p-2 mb-4"
      />
      <button onClick={generateMermaid} className="bg-blue-500 text-white px-4 py-2">
        Gerar Grafo
      </button>
      <div ref={chartRef} className="mt-6 border p-4 bg-white" />
    </div>
  );
}

export default MermaidGraph;