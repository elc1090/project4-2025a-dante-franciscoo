
async function PostRoadMap(userid,name,roadmap) {
      try {
        const response = await fetch(`http://localhost:5259/api/RoadMap/PostRoadMap`, {
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