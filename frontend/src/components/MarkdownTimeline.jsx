import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function TimelineItem({ title, content, level }) {
  const fontSizes = ['text-2xl', 'text-xl', 'text-lg'];
  const bulletColors = ['bg-indigo-500', 'bg-indigo-400', 'bg-indigo-300'];

  return (
    <div className="relative pl-10 mb-10">
      <div
        className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-indigo-300 ${bulletColors[level - 1]}`}
      ></div>

      <h3 className={`font-semibold text-white ${fontSizes[level - 1]} mb-2`}>
        {title}
      </h3>

      <div className="text-gray-200 prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function TimelineTree({ nodeList }) {
  return nodeList.map((node, i) => (
    <div key={i}>
      <TimelineItem
        title={node.title}
        content={node.content.join('\n')}
        level={node.level}
      />
      {node.children && <TimelineTree nodeList={node.children} />}
    </div>
  ));
}

function parseMarkdownToTree(markdown) {
  const lines = markdown.trimStart().split('\n');
  const tree = [];
  let currentH1 = null;
  let currentH2 = null;

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    if (line.startsWith('# ')) {
      currentH1 = { title: line.slice(2), level: 1, content: [], children: [] };
      tree.push(currentH1);
      currentH2 = null;
    } else if (line.startsWith('## ')) {
      if (!currentH1) {
        currentH1 = { title: 'Sem Título Principal', level: 1, content: [], children: [] };
        tree.push(currentH1);
      }
      currentH2 = { title: line.slice(3), level: 2, content: [], children: [] };
      currentH1.children.push(currentH2);
    } else if (line.startsWith('### ')) {
      if (!currentH2) {
        if (!currentH1) {
          currentH1 = { title: 'Sem Título Principal', level: 1, content: [], children: [] };
          tree.push(currentH1);
        }
        currentH2 = { title: 'Sem Subtítulo', level: 2, content: [], children: [] };
        currentH1.children.push(currentH2);
      }
      const h3 = { title: line.slice(4), level: 3, content: [], children: [] };
      currentH2.children.push(h3);
    } else {
      if (currentH2 && currentH2.children.length > 0) {
        const lastH3 = currentH2.children[currentH2.children.length - 1];
        lastH3.content.push(line);
      } else if (currentH2) {
        currentH2.content.push(line);
      } else if (currentH1) {
        currentH1.content.push(line);
      }
    }
  });

  return tree;
}

const MarkdownTimeline = ({ content }) => {
  const tree = parseMarkdownToTree(content);

  return (
    <div className="relative border-l-2 border-indigo-500 pl-6 mt-8">
      <TimelineTree nodeList={tree} />
    </div>
  );
};

export default MarkdownTimeline;
