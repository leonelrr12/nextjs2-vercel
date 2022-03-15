import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"


export const getPokemonInfo = async (item: string) => {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ item }`)

    return  {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }
}