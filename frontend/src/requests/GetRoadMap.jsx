

async function Get_RoadMap(id){
    try {
        const response = id == null ? await GetRoadMap() : await GetRoadMapbyId(id);
        const data = await response.json(); // se for um fetch
        return data;
    } catch (error) {
        console.error('Erro ao buscar lista:', error);
        return null;
    }
}

function GetRoadMap(){
    return fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net//api/roadmap/GetRoadMap`, {
        headers: {
          Accept: "application/json",
        },
      })
}

function GetRoadMapbyId(id){
    return fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net//api/roadmap/GetRoadMap/${id}`, {
        headers: {
          Accept: "application/json",
        },
    })
}

export default Get_RoadMap;
