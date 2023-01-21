import { useState } from 'react';

function useFilter() {
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilterObj] = useState({
    text: '',
  });

  function setFilter(planets, att, value) {
    if (att === undefined) {
      setFiltered(planets);
      return;
    }
    const newFilter = { ...filter };
    newFilter[att] = value;
    setFilterObj(newFilter);

    let newFiltered = [...planets];
    Object.keys(newFilter).forEach((prop) => {
      switch (prop) {
      case 'text':
        newFiltered = newFiltered.filter(
          (planet) => planet.name.toLowerCase().includes(value.toLowerCase().trim()),
        );
        break;
      default:
      }
    });
    setFiltered(newFiltered);
  }

  return { filtered, filter, setFilter };
}

export default useFilter;
