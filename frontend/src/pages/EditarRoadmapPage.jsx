import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../layouts/Footer';
import { useAuth } from '../auth/AuthContext';

const fakeRoadmaps = [
  { _id: '1',
    title: 'Como se tornar Frontend Developer',
    authorId: '2222',
    description: `
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
  { _id: '2', title: 'Desenvolvimento Mobile',  authorId: '3333', description: `
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

const EditarRoadmapPage = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roadmap = fakeRoadmaps.find((r) => r._id === roadmapId);

  const [title, setTitle] = useState(roadmap ? roadmap.title : '');
  const [description, setDescription] = useState(roadmap ? roadmap.description : '');

  if (!roadmap) {
    return <div className="max-w-3xl mx-auto p-4 text-white">Roadmap não encontrado.</div>;
  }

  const isOwner = user && roadmap.authorId === user._id;

  if (!isOwner) {
    return <div className="max-w-3xl mx-auto p-4 text-white">Você não tem permissão para editar este roadmap.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Roadmap ${roadmap._id} atualizado:`, { title, description });
    alert('Roadmap atualizado com sucesso!');
    navigate(`/roadmaps/${roadmap._id}`);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 mt-20">
        <h2 className="text-2xl font-bold mb-4 text-white">Editar Roadmap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-white">Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-transparent text-white placeholder-white"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-white">Descrição (Markdown):</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              className="w-full p-2 border border-gray-300 rounded bg-transparent text-white placeholder-white"
              required
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Salvar Alterações
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default EditarRoadmapPage;