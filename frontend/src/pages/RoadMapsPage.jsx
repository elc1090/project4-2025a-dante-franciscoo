import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layouts/Footer';
import Pagination from '../components/Pagination';
import Get_RoadMap from '../requests/GetRoadMap'

const fakeRoadmaps = [
  { id: '1', name: 'Como se tornar Frontend Developer', roadmap: '...' },
  { id: '2', name: 'Desenvolvimento Mobile', roadmap: '...' },
  { id: '3', name: 'DevOps Essentials', roadmap: '...' },
  { id: '4', name: 'Backend Developer', roadmap: '...' },
  { id: '5', name: 'Fullstack Developer', roadmap: '...' },
  { id: '6', name: 'Data Science', roadmap: '...' },
  { id: '7', name: 'Machine Learning', roadmap: '...' },
  { id: '8', name: 'IA Generativa', roadmap: '...' },
  { id: '9', name: 'Cibersegurança', roadmap: '...' },
  { id: '10', name: 'Blockchain', roadmap: '...' },
  { id: '11', name: 'Game Development', roadmap: '...' },
  { id: '12', name: 'Cloud Computing', roadmap: '...' },
];

const RoadMapsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [RoadMapList, setRoadMapList] = useState(fakeRoadmaps);
  const [activePage,setActivePage] = useState(1);

  const totalPages = (Math.ceil(Object.keys(RoadMapList).length/40));
  const filteredRoadmaps = RoadMapList.filter((roadmap) =>
    roadmap.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function getData(){
      const data = await Get_RoadMap();
      if(data){
        setRoadMapList(data);
      }
    }
    getData();
  },[]);

  useEffect(() => {
    setActivePage(1);
  },[searchTerm,RoadMapList]);

  const handleActivePage = (pag) => {
    setActivePage(pag);
  }

  return (
    <>
      {/* Campo de busca */}
      <div className="max-w-3xl mx-auto px-4 mt-20">
        <input
          type="text"
          placeholder="Buscar roadmap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      {/* Lista de roadmaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
        {filteredRoadmaps.slice(((activePage-1)*40),((activePage*40)-1)).map((roadmap) => (
          <Link
            key={roadmap.id}
            to={`/roadmaps/${roadmap.id}`}
            className="bg-gray-800 hover:bg-indigo-600 text-white text-base font-semibold py-6 px-4 rounded-xl shadow-md transition duration-300 cursor-pointer text-center"
          >
            {roadmap.name}
          </Link>
        ))}
      </div>
      <Pagination totalPages={totalPages} setActivePage={handleActivePage} activePage={activePage}></Pagination>
        
      <Footer />
    </>
  );
};

export default RoadMapsPage;
