import { useState } from 'react';

function useFilter() {
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilterObj] = useState({
    text: '',
  });

  function setFilter(planets, att, val) {
    if (att === undefined) {
      setFiltered(planets);
      return;
    }

    const newFilter = { ...filter };
    newFilter[att] = val;
    setFilterObj(newFilter);

    let newFiltered = [...planets];
    Object.keys(newFilter).forEach((prop) => {
      const value = newFilter[prop];
      switch (prop) {
      case 'text':
        newFiltered = newFiltered.filter(
          (planet) => planet.name.toLowerCase().includes(value.toLowerCase().trim()),
        );
        break;
      case 'comp':
        if (value.comparator === 'maior que') {
          newFiltered = newFiltered.filter(
            (planet) => +(planet[value.column]) > +(value.value),
          );
        } else if (value.comparator === 'menor que') {
          newFiltered = newFiltered.filter(
            (planet) => +(planet[value.column]) < +(value.value),
          );
        } else {
          newFiltered = newFiltered.filter(
            (planet) => +(planet[value.column]) === +(value.value),
          );
        }
        break;
      default:
      }
    });
    setFiltered(newFiltered);
  }

  return { filtered, filter, setFilter };
}

export default useFilter;
