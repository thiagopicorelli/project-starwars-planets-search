import React, { useEffect, useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './fetch/fetchPlanets';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filtered, setFilter] = useState([]);

  useEffect(() => {
    async function setFetchPlanets() {
      const data = await fetchPlanets(1);
      setPlanets(data);
    }

    if (planets !== []) {
      setFetchPlanets();
    }
  });

  return (
    <PlanetContext.Provider value={ { planets, setPlanets } }>
      <div>
        <span>Hello, App!</span>
        <Table />
      </div>
    </PlanetContext.Provider>
  );
}

export default App;
