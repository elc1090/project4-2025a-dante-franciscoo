import './App.css'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import RoadMapsPage from './pages/RoadMapsPage'
import LoginPage from './pages/LoginPage'
import MarkDownPage from './pages/MarkDownPage'
import Header from './layouts/Header'
import RoadMapDetailsPage from './pages/RoadMapDetailsPage'
import EditarRoadmapPage from './pages/EditarRoadmapPage'
import TestePage from './pages/TestePage'
import RegisterPage from './pages/RegisterPage'


function App() {
  return (
    <>
    <Header />
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/roadmaps" element={<RoadMapsPage />} />
        <Route path="/roadmaps/:roadmapId" element={<RoadMapDetailsPage />} />
        <Route path="/editar-roadmap/:roadmapId" element={<EditarRoadmapPage />} />
        <Route path="/criar-mark" element={<MarkDownPage />} />
        <Route path="/teste" element={<TestePage />} /> 
      </Routes>
    </>
  );
}

export default App;