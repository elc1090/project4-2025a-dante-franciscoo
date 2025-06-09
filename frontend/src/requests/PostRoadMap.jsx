
async function PostRoadMap(userid,name,roadmap) {
      try {
        const response = fetch(`https://roadmap-api-g3dbgweehabxczej.brazilsouth-01.azurewebsites.net//api/roadmap/PostRoadMap`, {
            headers: {
              Accept: "application/json",
            },
            body: {
                userid: userid,
                name: name,
                roadmap: roadmap,
            },
          })
        const data = await response.json(); // se for um fetch
        return data;
    } catch (error) {
        console.error('Erro ao criar roadmap', error);
        return null;
    }
}