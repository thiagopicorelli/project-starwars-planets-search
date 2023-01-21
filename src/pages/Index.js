import React, { useContext } from 'react';
import Table from '../components/Table';
import PlanetContext from '../context/PlanetContext';

function Index() {
  const { planets, filter, setFilter } = useContext(PlanetContext);

  function setFilterText(e) {
    setFilter(planets, 'text', e.target.value);
  }

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ filter.text }
        onChange={ setFilterText }
      />
      <Table />
    </div>
  );
}

export default Index;
