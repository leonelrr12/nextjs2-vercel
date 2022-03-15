import { useState, useEffect } from 'react';

import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui";
import { localFavorites } from '../../utils';
import { FavoritesPokemons } from '../../components/pokemon';


export const Favorites = () => {

  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    setFavorites(localFavorites.favorites())
  }, [])
  

  return (
    <Layout title='Pokemons - Favoritos'>
      { !favorites.length ? (
          <NoFavorites />
        ) : (
          <FavoritesPokemons pokemons={favorites} />
        ) 
      }
    </Layout>
  )
}

export default Favorites;