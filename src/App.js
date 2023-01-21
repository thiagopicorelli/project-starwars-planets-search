import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './fetch/fetchPlanets';
import useFilter from './hooks/useFilter';
import Index from './pages/Index';

function App() {
  const [planets, setPlanets] = useState([]);
  const { filtered, filter, setFilter } = useFilter();
  const [page] = useState(1);

  useEffect(() => {
    async function setFetchPlanets() {
      const data = await fetchPlanets(page);
      setPlanets(data);
    }
    if (planets.length === 0) {
      setFetchPlanets();
    } else {
      setFilter(planets, undefined);
    }
  }, [planets, page]);

  return (
    <PlanetContext.Provider
      value={ { planets, filtered, filter, setFilter } }
    >
      <Index />
    </PlanetContext.Provider>
  );
}

export default App;
