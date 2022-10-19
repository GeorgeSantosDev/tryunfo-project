import React, { useContext, useState } from 'react';
import TryunfoContext from './context/TryunfoContext';
import Form from './components/Form';
import PreviewCard from './components/PreviewCard';
import Card from './components/Card';
import Filters from './components/Filters';
import logoTryunfo from './images/logo_tryunfo.png';
import verso from './images/verso.png';
import './styles/App.css';

function App() {
  const { deckToRender, deck, isPlaying, setIsPlaying } = useContext(TryunfoContext);

  const [deckToPlay, setDeckToPlay] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0);

  const shuffleDeck = () => {
    const randomNumberLimit = 0.5;
    const randomDeck = deck.sort(() => Math.random() - randomNumberLimit);

    setDeckIndex(0);
    setDeckToPlay(randomDeck);
    setIsPlaying(false);
  };

  const handleClickStartGame = () => {
    shuffleDeck();
    setIsPlaying(true);
  };

  const handleClickNextCard = () => {
    setDeckIndex((prev) => prev + 1);
  };

  const displayButton = deckIndex === deckToPlay.length - 1 ? 'none' : 'block';

  return (
    <main>
      <header>
        <img src={ logoTryunfo } alt="Logo Tryunfo" />
      </header>

      <section className="stage-to-make-cards">
        <Form />
        <PreviewCard />
      </section>

      <section className="stage-to-show-cards">
        <Filters />
        <div className="deck-container">
          {
            deckToRender.map((card) => <Card info={ card } key={ card.cardName } />)
          }
        </div>
      </section>

      <section className="stage-to-play">
        <div className="show-card">
          {
            isPlaying && (
              <div>
                <Card info={ deckToPlay[deckIndex] } />
              </div>
            )
          }

          { isPlaying && <img src={ verso } alt="verso da carta" className="verso" /> }
        </div>

        {
          isPlaying && (
            <p
              className="btn btn-primary size-btns"
            >
              { `Restam: ${deckToPlay.length - (deckIndex + 1)} cartas` }
            </p>
          )
        }

        {
          isPlaying ? (
            <div className="btns-game-container">
              <button
                type="button"
                onClick={ shuffleDeck }
                className="btn btn-light size-btns"
              >
                Embaralhar Cartas
              </button>

              <button
                type="button"
                onClick={ handleClickNextCard }
                style={ { display: displayButton } }
                className="btn btn-secondary size-btns"
              >
                Próxima Carta
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={ handleClickStartGame }
              className="btn btn-primary size-btns"
            >
              Jogar
            </button>
          )
        }
      </section>
    </main>
  );
}

export default App;
