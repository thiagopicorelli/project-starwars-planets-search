import React, { useState, useContext } from 'react';
import Table from '../components/Table';
import PlanetContext from '../context/PlanetContext';

function Index() {
  const { planets, filter, setFilter } = useContext(PlanetContext);
  const [columnCompare, setColumnCompare] = useState('population');
  const [comparator, setComparator] = useState('maior que');
  const [valueCompare, setValueCompare] = useState(0);

  const columnSelect = (testid, columnValue, setColumn) => (
    <select
      data-testid={ testid }
      value={ columnValue }
      onChange={ (e) => setColumn(e.target.value) }
    >
      <option value="population">population</option>
      <option value="orbital_period">orbital_period</option>
      <option value="diameter">diameter</option>
      <option value="rotation_period">rotation_period</option>
      <option value="surface_water">surface_water</option>
    </select>
  );

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ filter.text }
        onChange={ (e) => setFilter(planets, 'text', e.target.value) }
      />
      <div>
        { columnSelect('column-filter', columnCompare, setColumnCompare) }
        <select
          data-testid="comparison-filter"
          value={ comparator }
          onChange={ (e) => setComparator(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ valueCompare }
          onChange={ (e) => setValueCompare(e.target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => setFilter(planets, 'comp', {
            column: columnCompare,
            comparator,
            value: valueCompare,
          }) }
        >
          Filtrar
        </button>
      </div>
      <Table />
    </div>
  );
}

export default Index;
