import { useState } from 'react';

function useFilter() {
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilterObj] = useState({
    text: '',
  });

  function setComparator(newFiltered, opt) {
    if (opt.comparator === 'maior que') {
      newFiltered = newFiltered.filter(
        (planet) => +(planet[opt.column]) > +(opt.value),
      );
    } else if (opt.comparator === 'menor que') {
      newFiltered = newFiltered.filter(
        (planet) => +(planet[opt.column]) < +(opt.value),
      );
    } else {
      newFiltered = newFiltered.filter(
        (planet) => +(planet[opt.column]) === +(opt.value),
      );
    }
    return newFiltered;
  }

  function setFilter(planets, att, val) {
    if (att === undefined) {
      setFiltered(planets);
      return;
    }

    const newFilter = { ...filter };
    if (att === 'text') {
      newFilter[att] = val;
    } else {
      if (newFilter[att] === undefined) {
        newFilter[att] = [];
      }
      newFilter[att].push(val);
    }
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
        value.forEach((opt) => {
          newFiltered = setComparator(newFiltered, opt);
        });
        break;
      default:
      }
    });
    setFiltered(newFiltered);
  }

  return { filtered, filter, setFilter };
}

export default useFilter;
