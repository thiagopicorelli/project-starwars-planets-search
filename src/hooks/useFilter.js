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

  function makeFilter(planets, newFilter) {
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

    return newFiltered;
  }

  function sortFunction(a, b, result) {
    const inv = -1;
    if (a === 'unknown') {
      return result;
    }
    if (b === 'unknown') {
      return inv * result;
    }
    return a - b;
  }

  function setSort(val) {
    const inv = -1;
    if (val.order === 'ASC') {
      return filtered.sort((a, b) => sortFunction(a[val.col], b[val.col], 1));
    }
    if (val.order === 'DESC') {
      return filtered.sort((a, b) => inv * sortFunction(a[val.col], b[val.col], inv));
    }
    return filtered;
  }

  function setFilter(planets, att, val) {
    if (att === undefined) {
      setFiltered(planets);
      return;
    }

    const newFilter = { ...filter };
    switch (att) {
    case 'text':
      newFilter[att] = val;
      break;
    case 'comp':
      if (newFilter[att] === undefined) {
        newFilter[att] = [];
      }
      newFilter[att].push(val);
      break;
    case 'rem_comp':
      newFilter.comp.splice(val, 1);
      break;
    case 'sort':
      break;
    default:
      setFiltered(planets);
      return;
    }

    let newFiltered = [];
    if (att !== 'sort') {
      setFilterObj(newFilter);
      newFiltered = makeFilter(planets, newFilter);
    } else {
      newFiltered = setSort(val);
    }
    setFiltered(newFiltered);
  }

  return { filtered, filter, setFilter };
}

export default useFilter;
