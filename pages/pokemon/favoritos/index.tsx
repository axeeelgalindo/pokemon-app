import { Layout } from "@/components/layouts";
import { FavoritesPokemons, NoFavorites } from "@/components/ui";
import { useEffect, useState } from "react";
import { localFavorites } from '@/utils';
import { Grid, Card } from "@nextui-org/react";

const FavoritesPage = () => {

    const [favoritePokemons,setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons());
    }, []);

  return (
    <Layout title="Favoritos">
        {
            favoritePokemons.length === 0 
            ? 
            <NoFavorites/>
            :
            <FavoritesPokemons pokemons={favoritePokemons}/>
        }
        
    </Layout>
  );
};

export default FavoritesPage