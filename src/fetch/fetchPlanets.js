async function fetchPlanets(page) {
  const data = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const response = await data.json();
  return response.results;
}

export default fetchPlanets;
