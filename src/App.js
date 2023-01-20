import React, { useState } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContext';
import planetas from './tests/mocks/planets';
import Table from './components/Table';

function App() {
  const [planets, setPlanets] = useState(planetas);

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
