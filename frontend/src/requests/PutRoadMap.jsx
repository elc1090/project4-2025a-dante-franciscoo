
async function PutRoadMap(id,userid,name,roadmap) {
    try {
      await fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net/api/RoadMap/PutRoadMap/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: id,
              userid: userid,
              name: name,
              roadmap: roadmap
          }),
        });
    } catch (error) {
        console.error('Erro ao editar roadmap', error);
        return null;
    }
}

export default PutRoadMap;