// react / next
import { useState } from "react";

// next ui
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from "canvas-confetti";

// by me
import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, SetIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  // console.log(pokemon.name)

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    SetIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      
      zIndex: 999,
      particleCount: 2000,
      spread: 1200,
      angle: -200,
      origin:{
        x:1,
        y:0
      }
    });
  };

  return (
    <Layout title={pokemon.name.toUpperCase()}>
      <h1>
        <Grid.Container css={{ marginTop: "5px" }}>
          <Grid xs={12} sm={4}>
            <Card hoverable css={{ padding: "10px" }}>
              <Card.Body css={{ display: "flex", justifyContent: "center" }}>
                <Card.Image
                  src={
                    pokemon.sprites.other?.dream_world.front_default ||
                    "/no-image.png"
                  }
                  alt={pokemon.name}
                  width="100%"
                  height={150}
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header
                css={{ display: "flex", justifyContent: "space-between" }}
              >
                <Text h1 transform="capitalize">
                  {pokemon.name}
                </Text>
                <Button
                  onClick={onToggleFavorite}
                  color="gradient"
                  ghost={!isInFavorites}
                >
                  {isInFavorites ? "En favoritos" : "Guardar a fav"}
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction="row" display="flex">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name )
//   console.log({ pokekomns151 });

  return {
    paths: pokemonNames.map( name => ({
      params: { name }
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/ID.svg

  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    },
  };
};

export default PokemonByNamePage;
