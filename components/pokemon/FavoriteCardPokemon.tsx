import { Card, Grid } from "@nextui-org/react"
import { Router, useRouter } from 'next/router';
import { FC } from "react"

interface Props {
    pokemonId: number
}

const URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world'

export const FavoriteCardPokemon:FC<Props> = ({ pokemonId }) => {

    const router = useRouter()

    return (
        <Grid xs={ 6} sm={ 3 } md={ 2 } xl={ 1 } onClick={() => router.push(`/pokemon/${pokemonId}`) }>
            <Card css={{ padding: 10 }} clickable>
                <Card.Image 
                    src={ `${URL}/${pokemonId}.svg` || '/no-image.png'}
                    width="100%"
                    height={ 140 }
                />
            </Card>
        </Grid>
    )
}
