  export async function getIndices(
      `https://startup.bolsadesantiago.com/api/consulta/ClienteMD/getIndicesRV?access_token=E2D305388980423491A6D731ADE74402`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await result.json();
    return data.categories.items;
  }