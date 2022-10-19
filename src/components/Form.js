import React, { useContext, useEffect } from 'react';
import TryunfoContext from '../context/TryunfoContext';
import '../styles/Form.css';

const MAX_ATTR_SUM = 210;
const ATT_LIMIT = 90;

function Form() {
  const {
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
    setDeckToRender,
  } = useContext(TryunfoContext);

  const resetInputs = () => {
    const setInputs = [setCardName, setCardDescription, setCardImage, setCardAttr1,
      setCardAttr2, setCardAttr3, setCardRare, setCardTrunfo];

    const setValues = {
      0: '',
      1: '',
      2: '',
      3: 0,
      4: 0,
      5: 0,
      6: 'normal',
      7: false,
    };

    setInputs.forEach((func, i) => {
      func(setValues[i]);
    });
  };

  useEffect(() => {
    resetInputs();
  }, [deck]);

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const inputs = {
      name: setCardName,
      description: setCardDescription,
      attr1: setCardAttr1,
      attr2: setCardAttr2,
      attr3: setCardAttr3,
      image: setCardImage,
      rarity: setCardRare,
      trunfo: setCardTrunfo,
    };

    inputs[target.id](value);
  };

  const handleClick = () => {
    const cardInfo = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      id: `${deck.length}-${cardName}`,
    };

    if (cardTrunfo) {
      setHasTrunfo(true);
    }

    setDeck((prev) => [...prev, cardInfo]);
    setDeckToRender((prev) => [...prev, cardInfo]);
  };

  const attrs = [cardAttr1, cardAttr2, cardAttr3];
  const textInputs = [cardName, cardDescription, cardImage, cardRare];

  const attrSum = attrs.reduce((acc, attr) => Number(acc) + Number(attr), 0);

  const checkAttrSum = attrSum > MAX_ATTR_SUM;
  const checkAttrLmit = attrs.some((attr) => attr > ATT_LIMIT);
  const checkAttIsPositive = attrs.some((attr) => attr < 0);
  const checkTextLengths = textInputs.some((input) => input.length === 0);

  const isSaveBtnDisabled = checkAttrSum || checkAttrLmit || checkAttIsPositive
    || checkTextLengths;

  return (
    <form className="make-card-form">
      <h1 className="title">ADICIONE NOVA CARTA</h1>

      <label htmlFor="name" className="form-floating mb-2 labels-sizes">
        Nome
        <input
          type="text"
          id="name"
          className="form-control inputs-size"
          data-testid="name-input"
          value={ cardName }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="description" className="form-floating mb-2 labels-sizes">
        Descrição
        <textarea
          id="description"
          className="form-control"
          cols="30"
          rows="10"
          data-testid="description-input"
          value={ cardDescription }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="attr1" className="form-floating mb-2 labels-sizes">
        Attr1
        <input
          type="number"
          id="attr1"
          className="form-control"
          data-testid="attr1-input"
          value={ cardAttr1 }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="attr2" className="form-floating mb-2 labels-sizes">
        Attr2
        <input
          type="number"
          id="attr2"
          className="form-control"
          data-testid="attr2-input"
          value={ cardAttr2 }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="attr3" className="form-floating mb-2 labels-sizes">
        Attr3
        <input
          type="number"
          id="attr3"
          className="form-control"
          data-testid="attr3-input"
          value={ cardAttr3 }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="name" className="form-floating mb-2 labels-sizes">
        Imagem
        <input
          type="text"
          id="image"
          className="form-control"
          data-testid="image-input"
          value={ cardImage }
          onChange={ handleChange }
        />
      </label>

      <select
        id="rarity"
        className="form-select labels-sizes"
        data-testid="rare-input"
        value={ cardRare }
        onChange={ handleChange }
      >
        <option value="normal">Normal</option>
        <option value="raro">Raro</option>
        <option value="muito raro">MuitoRaro</option>
      </select>

      {
        hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
          <label htmlFor="trunfo">
            Super Trybe Trunfo
            <input
              type="checkbox"
              id="trunfo"
              className="trunfo"
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              onChange={ handleChange }
            />
          </label>
        )
      }

      <button
        type="button"
        id="saveButton"
        className="btn btn-success"
        data-testid="save-button"
        disabled={ isSaveBtnDisabled }
        onClick={ handleClick }
      >
        Salvar
      </button>

    </form>
  );
}

export default Form;
