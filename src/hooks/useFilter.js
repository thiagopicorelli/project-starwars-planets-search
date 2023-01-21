import { useState } from 'react';

function useFilter() {
  const [filtered, setFiltered] = useState([]);

  function setFilter(planets, option) {
    switch (option) {
    default:
      setFiltered(Array.from(planets.keys()));
    }
  }

  return { filtered, setFilter };
}

export default useFilter;
