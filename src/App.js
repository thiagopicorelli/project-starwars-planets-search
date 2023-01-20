import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './fetch/fetchPlanets';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFilter] = useState([]);
  const [page] = useState(1);

  useEffect(() => {
    async function setFetchPlanets() {
      const data = await fetchPlanets(page);
      setPlanets(data);
    }

    if (planets.length === 0) {
      setFetchPlanets();
    } else {
      setFilter(Array.from(planets.keys()));
    }
  }, [planets, page]);

  return (
    <PlanetContext.Provider value={ { planets, filtered } }>
      <div>
        <span>Hello, App!</span>
        <Table />
      </div>
    </PlanetContext.Provider>
  );
}

export default App;
