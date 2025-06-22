

// src/api/Get_RoadMap.js
const API_URL = "http://localhost:5259"; // Porta padrão do .NET backend

async function Get_RoadMap(id) {
    try {
        const response = id == null ? await GetRoadMap() : await GetRoadMapbyId(id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar lista:', error);
        return null;
    }
}

function GetRoadMap() {
    return fetch(`${API_URL}/api/RoadMap/GetRoadMap`, {
        headers: {
            Accept: "application/json",
        },
    });
}

function GetRoadMapbyId(id) {
    return fetch(`${API_URL}/api/RoadMap/GetRoadMap/${id}`, {
        headers: {
            Accept: "application/json",
        },
    });
}

export default Get_RoadMap;
