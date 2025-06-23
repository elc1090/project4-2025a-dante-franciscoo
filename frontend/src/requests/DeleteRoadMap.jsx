
async function DeleteRoadMap(id) {
    try {
      await fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net/api/RoadMap/DeleteRoadMap/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
    } catch (error) {
        console.error('Erro ao deletar roadmap', error);
        return null;
    }
}

export default DeleteRoadMap;