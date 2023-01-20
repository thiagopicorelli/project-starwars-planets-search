async function fetchPlanets(page) {
  const data = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    .then((response) => response.json());
  return data.results;
}

export default fetchPlanets;
