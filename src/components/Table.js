import React, { useContext } from 'react';
import PlanetContext, { ContextHeader, ContextProperty } from '../context/PlanetContext';

function Table() {
  const { filtered } = useContext(PlanetContext);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              ContextHeader.map((title, key) => (
                <th key={ key }>{ title }</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filtered.map((planet, key) => (
              <tr key={ key }>
                {
                  ContextProperty.map((prop, keyc) => (
                    <td key={ keyc }>
                      {
                        planet[prop]
                      }
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
