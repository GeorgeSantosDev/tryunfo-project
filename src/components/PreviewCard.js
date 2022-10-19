import React, { useContext } from 'react';
import TryunfoContext from '../context/TryunfoContext';
import superTrunfoflag from '../images/superTrunfo_flag.png';
import '../styles/PreviewCard.css';

function PreviewCard() {
  const { cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardTrunfo,
  } = useContext(TryunfoContext);

  const image = cardImage ? `url(${cardImage})` : `url(${'https://www.ebrink.com.br/media/catalog/category/super-trunfo-logo.jpg'})`;

  return (
    <section className="preview-container">
      <h1 className="title">PRÉ-VISUALIZAÇÂO</h1>
      <div className="box-shadow">
        <div className="card-background">
          <div className="name-card container-flex-center">
            <p data-testid="name-card" className="name">{ cardName }</p>
          </div>

          <div
            style={ { 'background-image': image } }
            className="card-image container-flex-center"
            data-testid="image-card"
          />

          <p
            data-testid="description-card"
            className="description"
          >
            { cardDescription }
          </p>

          <div className="attrs-container">
            <p data-testid="attr1-card" className="attr">
              { `Attr1  . . . . . . . . . . . . . . . . . . . . . . . . . ${cardAttr1}` }
            </p>
            <p data-testid="attr2-card" className="attr">
              { `Attr2  . . . . . . . . . . . . . . . . . . . . . . . . . ${cardAttr2}` }
            </p>
            <p data-testid="attr3-card" className="attr">
              { `Attr3  . . . . . . . . . . . . . . . . . . . . . . . . . ${cardAttr3}` }
            </p>
          </div>

          {
            cardTrunfo && (
              <img src={ superTrunfoflag } className="flag" alt="super Trunfo" />
            )
          }
        </div>
      </div>
    </section>
  );
}

export default PreviewCard;
