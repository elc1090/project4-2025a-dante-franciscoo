import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCollapse } from 'react-collapsed';

// Parseia markdown simples em estrutura árvore H1 -> H2 -> H3
function parseMarkdownToTree(markdown) {
  markdown = markdown.trimStart();  // Remove espaços no começo

  const lines = markdown.split('\n');
  const tree = [];
  let currentH1 = null;
  let currentH2 = null;

  lines.forEach(line => {
    line = line.trim();

    if (!line) return;  // Ignora linhas vazias

    if (line.startsWith('# ')) {
      currentH1 = { title: line.slice(2).trim(), level: 1, content: [], children: [] };
      tree.push(currentH1);
      currentH2 = null;
    } else if (line.startsWith('## ')) {
      if (!currentH1) {
        // Se não houver H1, cria um temporário.
        currentH1 = { title: 'Sem título principal', level: 1, content: [], children: [] };
        tree.push(currentH1);
      }
      currentH2 = { title: line.slice(3).trim(), level: 2, content: [], children: [] };
      currentH1.children.push(currentH2);
    } else if (line.startsWith('### ')) {
      if (!currentH2) {
        if (!currentH1) {
          currentH1 = { title: 'Sem título principal', level: 1, content: [], children: [] };
          tree.push(currentH1);
        }
        currentH2 = { title: 'Sem subtítulo', level: 2, content: [], children: [] };
        currentH1.children.push(currentH2);
      }
      const h3 = { title: line.slice(4).trim(), level: 3, content: [], children: [] };
      currentH2.children.push(h3);
    } else {
      if (currentH2 && currentH2.children.length > 0) {
        const lastH3 = currentH2.children[currentH2.children.length - 1];
        if (lastH3) {
          lastH3.content.push(line);
          return;
        }
      }
      if (currentH2) {
        currentH2.content.push(line);
        return;
      }
      if (currentH1) {
        currentH1.content.push(line);
        return;
      }
      // Se não houver H1, mas tem conteúdo, **não cria** automaticamente "Sem título principal"
      // Apenas ignora ou pode armazenar num bloco extra (aqui vamos ignorar).
    }
  });

  return tree;
}

function CollapsibleSection({ node }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const contentString = node.content.join('\n').trim();

  const paddingLeft = node.level === 1 ? '0' : node.level === 2 ? '1.5rem' : '3rem';
  const bgColors = ['bg-indigo-900', 'bg-indigo-800', 'bg-indigo-700'];
  const fontSizes = ['text-4xl', 'text-3xl', 'text-2xl'];

  return (
    <div
      className={`mb-4 rounded-2xl ${bgColors[node.level - 1]} shadow-lg border border-indigo-600`}
      style={{ paddingLeft }}
    >
      <button
        {...getToggleProps()}
        className={`w-full text-left text-white font-semibold px-6 py-4 select-none ${fontSizes[node.level - 1]} rounded-t-2xl hover:bg-indigo-600 transition`}
      >
        {node.title} {isExpanded ? '▲' : '▼'}
      </button>

      <section {...getCollapseProps()} className="px-6 py-4 text-gray-100">
        {contentString && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              code: ({ node, inline, className, children, ...props }) => (
                <code
                  className={`bg-gray-800 text-green-400 px-2 rounded ${
                    inline ? '' : 'block p-3 my-3'
                  }`}
                  {...props}
                >
                  {children}
                </code>
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-indigo-400 pl-4 italic text-gray-400 my-3"
                  {...props}
                />
              ),
            }}
          >
            {contentString}
          </ReactMarkdown>
        )}

        {node.children &&
          node.children.map((child, i) => <CollapsibleSection key={i} node={child} />)}
      </section>
    </div>
  );
}

const MarkdownAccordion = ({ content }) => {
  const tree = parseMarkdownToTree(content);

  return (
    <div className="max-w-6xl mx-auto p-8 rounded-3xl shadow-2xl">
      {tree.map((section, i) => (
        <CollapsibleSection key={i} node={section} />
      ))}
    </div>
  );
};

export default MarkdownAccordion;
