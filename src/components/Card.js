import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import superTrunfoflag from '../images/superTrunfo_flag.png';
import TryunfoContext from '../context/TryunfoContext';
import '../styles/Card.css';

function Card({ info }) {
  const { deck,
    setHasTrunfo,
    setDeck,
    setDeckToRender,
    deckToRender,
    isPlaying } = useContext(TryunfoContext);

  const handleClick = () => {
    const cardsOfDeck = [...deck];
    const cardsOfDeckToRender = [...deckToRender];

    if (info.cardTrunfo) {
      setHasTrunfo(false);
    }

    const newDeck = cardsOfDeck.filter((card) => card.id !== info.id);
    const newDeckToRender = cardsOfDeckToRender.filter((card) => card.id !== info.id);

    setDeck(newDeck);
    setDeckToRender(newDeckToRender);
  };

  const image = `url(${info.cardImage})`;

  return (
    <div className="card-container">
      <div className="shadowCard  ">
        <div className="render-card-background">

          <div className="render-card-name">
            <p data-testid="name-card" className="name">{ info.cardName }</p>
          </div>
          <br />
          <div
            style={ { 'background-image': image } }
            className="render-card-image"
            data-testid="image-card"
          />

          <p
            data-testid="description-card"
            className="description"
          >
            { info.cardDescription }
          </p>

          <div className="render-attrs-container">
            <p data-testid="attr1-card" className="attr">
              {
                `Attr1  . . . . . . . . . . . . . . . . . . . . . . . . ${info.cardAttr1}`
              }
            </p>
            <p data-testid="attr2-card" className="attr">
              {
                `Attr2  . . . . . . . . . . . . . . . . . . . . . . . . ${info.cardAttr2}`
              }
            </p>
            <p data-testid="attr3-card" className="attr">
              {
                `Attr3  . . . . . . . . . . . . . . . . . . . . . . . . ${info.cardAttr3}`
              }
            </p>
          </div>

          {
            info.cardTrunfo && (
              <img src={ superTrunfoflag } alt="super Trunfo" className="flag" />
            )
          }

        </div>
      </div>
      { !isPlaying && (
        <button
          type="button"
          className="btn btn-danger size-btns"
          onClick={ handleClick }
        >
          Excluir
        </button>
      ) }
    </div>
  );
}

Card.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    cardName: PropTypes.string,
    cardImage: PropTypes.string,
    cardDescription: PropTypes.string,
    cardAttr1: PropTypes.number,
    cardAttr2: PropTypes.number,
    cardAttr3: PropTypes.number,
    cardTrunfo: PropTypes.bool,
  }).isRequired,
};

export default Card;
