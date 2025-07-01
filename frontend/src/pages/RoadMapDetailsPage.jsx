import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Footer from '../layouts/Footer';
import MarkdownAccordion from '../components/MarkdownAccordion';
import { useAuth } from '../auth/AuthContext';
import Get_RoadMap from '../requests/GetRoadMap';
import DeleteRoadMap from '../requests/DeleteRoadMap';
import mermaid from 'mermaid';
import MarkdownTimeline from '../components/MarkdownTimeline';
import DeleteRoadMap from '../requests/DeleteRoadMap';

const fakeRoadmaps = [
  { id: '1',
    name: 'Como se tornar Frontend Developer',
    userid: '2222',
    roadmap: `
    # Como se tornar Frontend Developer

Este roadmap abrange uma jornada completa para quem deseja atuar como desenvolvedor frontend. A seguir estão os principais tópicos:

- **HTML**: Estruturação de páginas, semântica, acessibilidade.
- **CSS**: Estilização, Flexbox, Grid, animações, preprocessadores como SASS.
- **JavaScript**: Fundamentos da linguagem, manipulação do DOM, eventos.
- **Frameworks**: React.js, Vue.js ou Angular — escolha pelo menos um.
- **Controle de versão**: Git e GitHub.
- **Ferramentas modernas**: Webpack, Babel, ESLint.
- **Testes**: Jest, Testing Library.
- **Boas práticas**: Clean Code, responsividade, performance.

Ao final deste roadmap, você será capaz de construir aplicações frontend profissionais, com foco em usabilidade, estética e performance.
`
  },
  { id: '2', name: 'Desenvolvimento Mobile',  userid: '3333', roadmap: `
# Introdução ao Desenvolvimento Mobile

O desenvolvimento mobile envolve a criação de aplicativos para dispositivos móveis, como smartphones e tablets. Existem diversas abordagens e ferramentas disponíveis.

## Principais Abordagens

1. **Desenvolvimento Nativo**: Criar apps específicos para cada sistema operacional, como Android (Java/Kotlin) e iOS (Swift).
2. **Desenvolvimento Híbrido**: Utilizar frameworks como React Native ou Flutter para criar apps multiplataforma.
3. **Progressive Web Apps (PWA)**: Aplicativos web que funcionam como apps nativos.

## Ferramentas Essenciais

- Android Studio
- Xcode
- React Native CLI
- Flutter SDK

## Exemplos de Código

### Exemplo de função simples em Kotlin:

\`\`\`kotlin
fun sayHello() {
    println("Hello, Mobile Developer!")
}
\`\`\`

## Recursos Recomendados

- [Documentação oficial do React Native](https://reactnative.dev/)
- [Guia Flutter](https://flutter.dev/docs)

> "A simplicidade é a sofisticação máxima." — Leonardo da Vinci

Com dedicação e prática, você poderá criar aplicações móveis incríveis e impactantes!
`
},
  { _id: '3', title: 'DevOps Essentials', authorId: '4444', description: `
    #Introdução a CI/CD, Docker, Kubernetes e práticas DevOps.

    ## teste 1
    ### teste 1.1
    ### teste 1.2
    ### teste 1.3

    ## teste 2
    ### teste 2.1
    ### teste 2.2
    ### teste 2.3

    ## teste 3
    ### teste 3.1
    ### teste 3.2
    ### teste 3.3

    ` },
];


const RoadMapDetailsPage = () => {
  const [roadmap, setRoadMap] = useState(null);
  const [isowner, setIsOwner] = useState(false);
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [renderError, setRenderError] = useState('');
  const [viewMode, setViewMode] = useState('accordion'); // 👈 modo de visualização
  const mermaidRef = useRef(null);

  useEffect(() => {
    async function getData() {
      const data = await Get_RoadMap(roadmapId);
      if (data) {
        setRoadMap(data);
        setIsOwner(data.isOwner);
      }

    }
    getData();
  }, [roadmapId]);

  useEffect(() => {
    if (!mermaidRef.current) return;
    mermaidRef.current.innerHTML = '';
    setRenderError('');

    if (aiOutput) {
      mermaid.initialize({ startOnLoad: false, theme: "dark" });

      const mermaidCode = aiOutput
        .replace(/```mermaid/g, "")
        .replace(/```/g, "")
        .trim();

      const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      mermaid
        .render(uniqueId, mermaidCode)
        .then(({ svg }) => {
          mermaidRef.current.innerHTML = svg;
        })
        .catch(err => {
          setRenderError(`Erro ao renderizar Mermaid: ${err.message}`);
        });
    }

    return () => {
      if (mermaidRef.current) mermaidRef.current.innerHTML = '';
    };
  }, [aiOutput]);

  const isOwner = user && roadmap?.userid === user.id;

  const handleDelete = async () => {
    await DeleteRoadMap(roadmap.id);

    alert('Roadmap excluído!');
  };

  const handleEdit = () => {
    navigate(`/editar-roadmap/${roadmap?.id}`);
  };

  const gerarDiagrama = async () => {
    setLoading(true);
    setAiOutput('');
    setRenderError('');
    try {
      const res = await fetch('https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net/api/AIApi/SendPrompt', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          prompt: `Retorne somente um diagrama flowchart mermaid para este roadmap em markdown:\n\n${roadmap.roadmap}`,
        }),
      });
      const data = await res.json();
      const mermaidCode = data.response; // já está em string, não precisa de JSON.parse
      setAiOutput(mermaidCode);
    } catch (err) {
      setAiOutput('');
      setRenderError('Erro ao chamar a API.');
      console.error(err);
    }
    setLoading(false);
  };

  if (!roadmap) {
    return <div className="max-w-3xl mx-auto p-4">Roadmap não encontrado.</div>;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 mt-20">

        {/* 🔄 Botão de alternância de visualização */}
        <div className="mb-8">
          <button
            onClick={() => setViewMode(viewMode === 'accordion' ? 'timeline' : 'accordion')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Alternar para {viewMode === 'accordion' ? 'Timeline' : 'Accordion'}
          </button>
        </div>

        {/* 🧩 Renderiza o componente certo */}
        {viewMode === 'accordion' ? (
          <MarkdownAccordion content={roadmap.roadmap} />
        ) : (
          <MarkdownTimeline content={roadmap.roadmap} />
        )}

        {isowner && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Editar Roadmap
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Apagar Roadmap
            </button>
          </div>
        )}

        {/* 🤖 Diagrama Mermaid com IA */}
        <div className="mt-6">
          <button
            onClick={gerarDiagrama}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Gerando diagrama...' : 'Gerar Diagrama com IA'}
          </button>

          <div className="mt-4 bg-gray-900 p-4 rounded">
            <div ref={mermaidRef} />
            {renderError && (
              <pre className="text-red-400 whitespace-pre-wrap mt-2">
                {renderError}
              </pre>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RoadMapDetailsPage;