import React, { useEffect } from "react";
import { fetchPokemons } from "../services/fetchData";
import Button from "../components/Button";
import Thumbnail from "../components/Thumbnail";
import Loading from "../components/Loading";

const mapIdxToColorTable = {
  0: "#bf0449",
  1: "#03a6a6",
  2: "#f2d98d",
};

const Pokemon = () => {
  useEffect(() => {
    fetchPokemons();
  }, []);

  const pokemons = localStorage.getItem("pokemons")
    ? JSON.parse(localStorage.getItem("pokemons"))
    : [];

  return (
    <article>
      <header>
        <h1 className="catch__title">
          We've stumbled upon ten Pokemon in the wild!
        </h1>
        <h2 className="catch__subtitle">
          Quick! Click on one to catch it before they disappear!
        </h2>
      </header>

      <section className="catch__pokemons">
        {pokemons ? (
          pokemons.map((pokemon, idx) => {
            return (
              <Thumbnail
                key={`pokemon_${idx}`}
                url={pokemon.url}
                color={mapIdxToColorTable[idx % 3]}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </section>

      <section>
        <Button to="/pokemon/1" label="SUBMIT" />
      </section>
    </article>
  );
};

export default Pokemon;
