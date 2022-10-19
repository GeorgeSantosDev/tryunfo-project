import React, { useState, useContext } from 'react';
import TryunfoContext from '../context/TryunfoContext';
import '../styles/Filters.css';

function Filters() {
  const { setDeckToRender, deckToRender, deck } = useContext(TryunfoContext);

  const [isSuperTrunfoFilterChecked, setIsSuperTrunfoFilterChecked] = useState(false);
  const [restoredDeck, setRestoredDeck] = useState([...deck]);
  const [filterByRarity, setFilterByRarity] = useState('todas');
  const [filterByName, setFilterByName] = useState('');

  const handleSearchByName = ({ target: { value } }) => {
    setFilterByName(value);
    const cardsOfDeck = [...deck];
    const newDeckToRender = cardsOfDeck.filter((card) => {
      if (filterByRarity === 'todas') {
        return card.cardName.includes(value);
      }
      return card.cardName.includes(value) && card.cardRare === filterByRarity;
    });

    setDeckToRender(newDeckToRender);
  };

  const handleSearchByRarity = ({ target: { value } }) => {
    setFilterByRarity(value);
    const cardsOfDeck = [...deck];

    if (value !== 'todas') {
      const newDeckToRender = cardsOfDeck
        .filter((card) => card.cardRare === value && card.cardName
          .includes(filterByName));

      setDeckToRender(newDeckToRender);
    } else {
      const newDeckToRender = cardsOfDeck
        .filter((card) => card.cardName.includes(filterByName));

      setDeckToRender(newDeckToRender);
    }
  };

  const handleSearchBySuperTrunfo = () => {
    const cardsOfDeck = [...deck];

    if (isSuperTrunfoFilterChecked) {
      setDeckToRender(restoredDeck);
      setIsSuperTrunfoFilterChecked((prev) => !prev);
    } else {
      setRestoredDeck(deckToRender);
      setIsSuperTrunfoFilterChecked((prev) => !prev);

      const newDeckToRender = cardsOfDeck.filter((card) => card.cardTrunfo === true);
      setDeckToRender(newDeckToRender);
    }
  };

  return (
    <form className="filters-container">
      <span className="filters-title">
        TODAS AS CARTAS
      </span>

      <div className="filters-inputs-container">
        <label htmlFor="filterByName" className="form-floating mb-2">
          Buscar por nome
          <input
            data-testid="name-filter"
            type="text"
            id="filterByName"
            className="form-control"
            onChange={ handleSearchByName }
            disabled={ isSuperTrunfoFilterChecked }
          />
        </label>

        <select
          data-testid="rare-filter"
          id="filterRarity"
          className="form-select rarity-filter-size"
          onChange={ handleSearchByRarity }
          disabled={ isSuperTrunfoFilterChecked }
        >
          <option value="todas">todas</option>
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>

        <label htmlFor="filterTrunfo" className="super-trunfo-container">
          Super Trunfo
          <input
            type="checkbox"
            id="filterTrunfo"
            className="trunfo"
            data-testid="trunfo-filter"
            checked={ isSuperTrunfoFilterChecked }
            onChange={ handleSearchBySuperTrunfo }
          />
        </label>
      </div>
    </form>
  );
}

export default Filters;
