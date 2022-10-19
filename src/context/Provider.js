import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TryunfoContext from './TryunfoContext';

function Provider({ children }) {
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardAttr1, setCardAttr1] = useState(0);
  const [cardAttr2, setCardAttr2] = useState(0);
  const [cardAttr3, setCardAttr3] = useState(0);
  const [cardImage, setCardImage] = useState('');
  const [cardRare, setCardRare] = useState('normal');
  const [cardTrunfo, setCardTrunfo] = useState(false);
  const [hasTrunfo, setHasTrunfo] = useState(false);
  const [deck, setDeck] = useState([]);
  const [deckToRender, setDeckToRender] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const contextValues = {
    cardName,
    setCardName,
    cardDescription,
    setCardDescription,
    cardAttr1,
    setCardAttr1,
    cardAttr2,
    setCardAttr2,
    cardAttr3,
    setCardAttr3,
    cardImage,
    setCardImage,
    cardRare,
    setCardRare,
    cardTrunfo,
    setCardTrunfo,
    hasTrunfo,
    setHasTrunfo,
    deck,
    setDeck,
    deckToRender,
    setDeckToRender,
    isPlaying,
    setIsPlaying,
  };

  return (
    <TryunfoContext.Provider value={ contextValues }>
      { children }
    </TryunfoContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
