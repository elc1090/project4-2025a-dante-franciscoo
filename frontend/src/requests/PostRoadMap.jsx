
async function PostRoadMap(userid,name,roadmap) {
      try {
        const response = await fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net/api/RoadMap/PostRoadMap`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userid,
                name: name,
                roadmap: roadmap
            }),
          });
        const data = await response.json(); // se for um fetch
        return data;
    } catch (error) {
        console.error('Erro ao criar roadmap', error);
        return null;
    }
}

export default PostRoadMap;