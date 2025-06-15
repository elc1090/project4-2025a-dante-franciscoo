
async function DeleteRoadMap(id) {
    try {
      await fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net/api/RoadMap/DeleteRoadMap/${id}`, {
          method: "DELETE",
        });
    } catch (error) {
        console.error('Erro ao deletar roadmap', error);
        return null;
    }
}

export default DeleteRoadMap;