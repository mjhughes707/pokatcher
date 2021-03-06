import React, { Fragment, useState, useEffect } from "react";
import { getRandomPokemons } from "../services/fetchData";
import { isObjEmpty } from "../utils/util";
import Thumbnail from "../components/Thumbnail";
import LoadingImages from "../components/LoadingImages";
import NameModal from "../components/NameModal";
import Button from "../components/Button";

const mapIdxToColor = {
  0: "#bf0449",
  1: "#03a6a6",
  2: "#f2d98d",
};

const Catch = () => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setErrors] = useState(false);
  const [caughtPokemon, setCaughtPokemon] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  if (error) alert(`${error.message}. Please try again later.`);

  const my_collection = localStorage.getItem("my_collection")
    ? JSON.parse(localStorage.getItem("my_collection"))
    : [];

  useEffect(() => {
    getRandomPokemons(setPokemons, setErrors);
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const focusOnConfirm = () => {
    document.getElementById("confirm-catch").focus();
  };

  const isPokemonsLoaded = pokemons.length !== 0 && pokemons;

  return (
    <article>
      <header>
        {isPokemonsLoaded && (
          <Fragment>
            <h1 className="catch__title">
              We've stumbled upon ten Pokemon in the wild!
            </h1>
            <h2 className="catch__subtitle">
              Quick! Click on one to catch it before they disappear!
            </h2>
          </Fragment>
        )}
      </header>

      <section className="catch__pokemons">
        {isPokemonsLoaded ? (
          pokemons.map((pokemon, idx) => {
            return (
              <Thumbnail
                key={`pokemon_thumbnail_${idx}`}
                selected={caughtPokemon.name === pokemon.name}
                pokemon={pokemon}
                setCaughtPokemon={setCaughtPokemon}
                focusOnConfirm={focusOnConfirm}
                color={mapIdxToColor[idx % 3]}
              />
            );
          })
        ) : (
          <LoadingImages />
        )}
      </section>

      <section>
        {isPokemonsLoaded && (
          <span style={{ cursor: "not-allowed" }}>
            <Button
              id="confirm-catch"
              onClick={handleModalOpen}
              disabled={isObjEmpty(caughtPokemon)}
              label="CONFIRM CATCH"
              to="#"
            />
          </span>
        )}

        <NameModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          my_collection={my_collection}
          caughtPokemon={caughtPokemon}
        />
      </section>
    </article>
  );
};

export default Catch;
