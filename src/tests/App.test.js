import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor, within } from '@testing-library/dom';
import fetchPlanets from '../fetch/fetchPlanets';
import planets from './mocks/planets';
import App from '../App';
import { act } from 'react-dom/test-utils';

const MOCK_OBJ = {results: planets, status: 200};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_OBJ),
    })
  );
})

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('Página Inicial', () => {
   test('Testa se os elementos de input estão na tela', () => {
    render(<App />);
    const elementCheck = (testid) => {
      const filter = screen.getByTestId(testid);
      expect(filter).toBeInTheDocument();
    };
    elementCheck('name-filter');
    elementCheck('column-filter');
    elementCheck('comparison-filter');
    elementCheck('value-filter');
    elementCheck('button-filter');
    elementCheck('button-remove-filters');
    elementCheck('column-sort');
    elementCheck('column-sort-button');
  }); 
  test('Testa seleção de colunas', () => {
    render(<App />);
    const columnInput = screen.getByTestId('column-filter');
    act(() => {
      userEvent.selectOptions(columnInput, 'orbital_period');
    });
    expect(columnInput).toHaveValue('orbital_period');
  });

  test('Testa botão de filtrar e remoção de compare', async () => {
    render(<App />);

    const buttonFilter = screen.getByTestId('button-filter');
    const valueFilter = screen.getByTestId('value-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine'));

    act(() => {
      fireEvent.change(valueFilter, { target: { value: '200000' } })
      fireEvent.click(buttonFilter);
    });

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Alderaan');

    const filterList = screen.getByTestId('filter');
    expect(filterList).toBeInTheDocument();

    act(() => {
      const filterRemove = screen.getByTestId('remove-filter');
      fireEvent.click(filterRemove);
    });

    expect(filterList).not.toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    act(() => {
      userEvent.selectOptions(comparisonFilter, 'menor que');
      fireEvent.change(valueFilter, { target: { value: '364' } })
      fireEvent.click(buttonFilter);
    });
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine');

    act(() => {
      const filterRemove = screen.getByTestId('remove-filter');
      fireEvent.click(filterRemove);  
    });

    act(() => {
      userEvent.selectOptions(comparisonFilter, 'igual a');
      fireEvent.change(valueFilter, { target: { value: '1000' } })
      fireEvent.click(buttonFilter);      
    });

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Yavin IV');
  }); 

  test('Testa botão de ordenar', async () => {
    render(<App />);
    
    await waitFor(() => expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine'));
    const buttonAsc = screen.getByTestId('column-sort-input-asc');
    act(() => {
      fireEvent.click(buttonAsc);
    });

    const buttonOrder = screen.getByTestId('column-sort-button');
    act(() => {
      fireEvent.click(buttonOrder);
    });
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Yavin IV');

    const buttonDesc = screen.getByTestId('column-sort-input-desc');
    act(() => {
      fireEvent.click(buttonDesc);
      fireEvent.click(buttonOrder);
    });
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant');
  });

  test('Testa filtro por texto', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant'));
    const textFilter = screen.getByTestId('name-filter');
    
    act(() => {
      userEvent.type(textFilter, 'd');
    });

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Alderaan');
  });
});